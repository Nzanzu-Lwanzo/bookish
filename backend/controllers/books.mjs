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
        { __id: { $gt: lastId } },
        {},
        { lean: true }
      );
    }

    res.status(201).json(unSyncedBooks);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};
