import Book from "../db/models/books.mjs";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const saveBooks = async (req, res) => {
  const { books } = req.body;

  const { last_book_id } = req.query;
  let lastId = parseInt(last_book_id);

  try {
    // Save theses books
    if (books && books.length !== 0) {
      const savedBooks = await Book.create(books);
    }
    // Take the last books that are not synced on the current apparatus
    // and send them back
    let unSyncedBooks = [];

    if (!isNaN(lastId)) {
      unSyncedBooks = await Book.find(
        { __id: { $gt: lastId - 5 }, owner: req.user._id },
        {},
        { lean: true }
      );

      console.log(unSyncedBooks);
    }

    res.status(201).json(unSyncedBooks);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find(
      {},
      { resume: 0 },
      { populate: "owner collection", limit: 100 }
    );
    res.json(books);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

export const deleteBook = async (req, res) => {
  try {
    let { id } = req.params;

    await Book.findByIdAndDelete(id);

    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

export const getBook = async (req, res) => {
  try {
    let { id } = req.params;
    const book = await Book.findById(id, {}, { populate: "owner collection" });
    res.json(book);
  } catch (e) {
    res.sendStatus(400);
  }
};
