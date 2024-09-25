import { enqueueSnackbar } from "notistack";

export default class BookishDb {
  #dbV;
  #dbName;

  /**@type {BookishDb} */
  static #instance;

  constructor() {
    if (BookishDb.#instance) {
      return BookishDb.#instance;
    }

    BookishDb.#instance = this;
    this.#dbV = 2;
    this.#dbName = "bookish";

    /**@type {IDBDatabase} */
    this.database = null;
  }

  static async init() {
    if (!BookishDb.#instance) {
      const singleton = new BookishDb();
      await singleton.#openDb();
    }

    return BookishDb.#instance;
  }

  async #openDb() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.#dbName, this.#dbV);

      request.onblocked = (event) => {
        enqueueSnackbar(`Ensuite relancez l'application !`)
        enqueueSnackbar(`Fermez tous les onglets Bookish`);
        enqueueSnackbar(`Version ${this.#dbV} de ${this.#dbName} installée !`);
      }

      request.onupgradeneeded = function (event) {
        const db = this.result;

        if (!db.objectStoreNames.contains("collections")) {
          const collections = db.createObjectStore("collections", {
            keyPath: "_id",
            autoIncrement: true,
          });

          collections.createIndex("name", "name", {
            unique: true,
          });
        }

        if (!db.objectStoreNames.contains("books")) {
          const books = db.createObjectStore("books", {
            keyPath: "_id",
            autoIncrement: true,
          });

          books.createIndex("title", "title");
        }
      };

      request.onsuccess = (event) => {
        this.database = request.result;
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  async getDb() {
    return this.database || (await this.#openDb());
  }

  async createCollection(collection) {
    const database = await this.getDb();
    const crudHandler = database
      .transaction("collections", "readwrite")
      .objectStore("collections");

    return new Promise((resolve, reject) => {
      if (!"name" in collection) {
        reject(new Error("INVALID_DATA_ERROR"));
      }

      const buildCollection = Object.assign(
        collection,
        { books_id: [], synced: false },
        this.timestamps
      );

      const request = crudHandler.add(buildCollection);

      request.onsuccess = (event) => {
        resolve({ _id: request.result, ...buildCollection });
      };

      request.onerror = (event) => reject(event.target);
    });
  }

  async getCollections() {
    const database = await this.getDb();
    const crudHandler = database
      .transaction("collections", "readonly")
      .objectStore("collections");

    return new Promise((resolve, reject) => {
      const request = crudHandler.getAll();

      request.onerror = (event) => reject(event.target);

      request.onsuccess = (event) => resolve(request.result);
    });
  }

  async getCollection(cid) {
    if (!cid) return;

    const database = await this.getDb();
    const crudHandler = database
      .transaction("collections", "readonly")
      .objectStore("collections");

    return new Promise((resolve, reject) => {
      const request = crudHandler.get(cid);

      request.onerror = (event) => {
        reject(event.target);
      };

      request.onsuccess = (event) => {
        resolve(request.result);
      };
    });
  }

  async getCollectionBooks(cid) {
    if (!cid) return;

    const database = await this.getDb();
    const crudHandler = database
      .transaction("collections", "readonly")
      .objectStore("collections");

    return new Promise((resolve, reject) => {
      const request = crudHandler.get(cid);

      request.onerror = (event) => reject(event.target);

      request.onsuccess = async (event) => {
        /**@type {number[]} */
        const books_id = request.result?.books_id || [];

        if (!books_id || books_id.length === 0) {
          return resolve({
            collection: request.result,
            books: [],
          });
        }

        const books = await Promise.all(
          books_id.map(async (id) => await this.getBook(id))
        );

        const filteredBooks = books.filter((book) => book !== undefined);

        resolve({
          collection: request.result,
          books: filteredBooks,
        });
      };
    });
  }

  async addBookToCollection(cid, bid) {
    const database = await this.getDb();
    const crudHandler = database
      .transaction("collections", "readwrite")
      .objectStore("collections");

    return new Promise((resolve, reject) => {
      const requestCollection = crudHandler.get(cid);

      requestCollection.onerror = (event) => reject(event.target);

      requestCollection.onsuccess = (event) => {
        const collection = requestCollection.result;
        const booksList = collection?.books_id || [];
        if (booksList?.includes(bid) || !bid) {
          return resolve({ id: requestCollection.result, ...collection });
        }

        booksList.push(bid);
        collection.books_id = booksList;

        const requestPutCollection = crudHandler.put(collection);

        requestPutCollection.onerror = (event) => reject(event.target);

        requestPutCollection.onsuccess = (event) => {
          resolve({ _id: requestCollection.result, ...collection });
        };
      };
    });
  }

  async removeBookFromCollection(cid, bid) {
    const database = await this.getDb();
    const crudHandler = database
      .transaction("collections", "readwrite")
      .objectStore("collections");

    return new Promise((resolve, reject) => {
      const requestCollection = crudHandler.get(cid);

      requestCollection.onerror = (event) => reject(event.target);

      requestCollection.onsuccess = (event) => {
        const collection = requestCollection.result;

        let keepElements = [];

        if (bid) {
          /**@type {number[]} */
          const booksListOfIds = collection?.books_id || [];
          keepElements = booksListOfIds.filter((id) => id !== bid);
        }

        collection.books_id = keepElements;

        const requestPutCollection = crudHandler.put(collection);

        requestPutCollection.onerror = (event) => reject(event.target);

        requestPutCollection.onsuccess = (event) => {
          resolve({ _id: requestCollection.result, ...collection });
        };
      };
    });
  }

  async deleteCollection(cid) {
    const database = await this.getDb();
    const crudHandler = database
      .transaction("collections", "readwrite")
      .objectStore("collections");

    return new Promise((resolve, reject) => {
      const request = crudHandler.delete(cid);

      request.onerror = (event) => reject(event.target);

      request.onsuccess = (event) => resolve(cid);
    });
  }

  async deleteAllCollections(cascade = true) {
    const database = await this.getDb();
    const crudHandler = database.transaction(
      ["collections", "books"],
      "readwrite"
    );

    return new Promise((resolve, reject) => {
      const requestCollections = crudHandler.objectStore("collections").clear();

      requestCollections.onerror = (event) => {
        reject(event.target);
      };

      requestCollections.onsuccess = (event) => {
        if (cascade) {
          crudHandler.objectStore("books").clear();
        }

        resolve(true);
      };
    });
  }

  async createBook(book, cid) {
    const database = await this.getDb();
    const crudHandler = database
      .transaction("books", "readwrite")
      .objectStore("books");

    return new Promise(async (resolve, reject) => {
      if (!"title" in book) {
        reject(new InvalidDataError("Book must contain a title."));
      }

      const buildBook = Object.assign(book, this.timestamps, { cid });

      const request = crudHandler.add(buildBook);

      request.onsuccess = async (event) => {
        if (cid) {
          this.addBookToCollection(cid, request.result);
        }

        resolve({ _id: request.result, ...buildBook });
      };

      request.onerror = (event) => {
        reject(event.target);
      };
    });
  }

  async getAllBooks() {
    const database = await this.getDb();
    const crudHandler = database
      .transaction("books", "readonly")
      .objectStore("books");

    return new Promise((resolve, reject) => {
      const request = crudHandler.getAll();

      request.onerror = (event) => reject(event.target);

      request.onsuccess = (event) => resolve(request.result);
    });
  }

  async getBook(bid) {
    if (!bid) return;

    const database = await this.getDb();
    const crudHandler = database
      .transaction("books", "readonly")
      .objectStore("books");

    return new Promise((resolve, reject) => {
      const request = crudHandler.get(bid);

      request.onerror = (event) => reject(event.target);

      request.onsuccess = (event) => {
        resolve(request.result);
      };
    });
  }

  async deleteBook(bid) {
    const database = await this.getDb();
    const crudHandler = database
      .transaction("books", "readwrite")
      .objectStore("books");

    return new Promise((resolve, reject) => {
      const request = crudHandler.delete(bid);

      request.onerror = (event) => reject(event.target);

      request.onsuccess = (event) => resolve(bid);
    });
  }

  async updateCollection(cid, data) {
    const database = await this.getDb();
    const crudHandler = database
      .transaction("collections", "readwrite")
      .objectStore("collections");

    return new Promise((resolve, reject) => {
      const requestGetCollection = crudHandler.get(cid);

      requestGetCollection.onerror = (event) => reject(event.target);

      requestGetCollection.onsuccess = (event) => {
        const collection = requestGetCollection.result;

        if (!collection) return resolve(null);

        const updatedCollection = Object.assign(collection, data, {
          updated_at: new Date(),
        });

        const requestPutCollection = crudHandler.put(updatedCollection);

        requestPutCollection.onerror = (event) => reject(event.target);

        requestPutCollection.onsuccess = (event) => resolve(updatedCollection);
      };
    });
  }

  async updateBook(bid, data) {
    if (!bid) return;

    const database = await this.getDb();
    const crudHandler = database
      .transaction("books", "readwrite")
      .objectStore("books");

    return new Promise((resolve, reject) => {
      const requestGetBook = crudHandler.get(bid);

      requestGetBook.onerror = (event) => reject(event.target);

      requestGetBook.onsuccess = (event) => {
        const book = requestGetBook.result;

        if (!book) return resolve(null);

        const updatedBook = Object.assign(book, data, {
          updated_at: new Date(),
        });

        const requestPutBook = crudHandler.put(updatedBook);

        requestPutBook.onerror = (event) => reject(event.target);

        requestPutBook.onsuccess = (event) => resolve(updatedBook);
      };
    });
  }

  async getUnSyncedCollections() {
    const database = await this.getDb();
    const crudHandler = database
      .transaction("collections", "readonly")
      .objectStore("collections");

    return new Promise((resolve, reject) => {
      const request = crudHandler.getAll();

      request.onerror = (event) => reject(event.target);

      request.onsuccess = (event) => {
        const allCollections = request.result;

        const unSyncedCollections = allCollections.filter(
          (collection) => !collection.synced
        );

        resolve(unSyncedCollections);
      };
    });
  }

  async markAllCollectionsAsSynced() {
    const database = await this.getDb();
    const crudHandler = database
      .transaction("collections", "readwrite")
      .objectStore("collections");

    return new Promise(async (resolve, reject) => {
      try {
        /**@type { Array } */
        const collections = await this.getUnSyncedCollections();
        const allUpdatedCollections = [];

        for (let collection of collections) {
          const updatedCollection = await this.updateCollection(
            collection?._id,
            { synced: true }
          );
          allUpdatedCollections.push(updatedCollection);
        }

        resolve(allUpdatedCollections);
      } catch (e) {
        reject(e);
      }
    });
  }

  get timestamps() {
    return {
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
