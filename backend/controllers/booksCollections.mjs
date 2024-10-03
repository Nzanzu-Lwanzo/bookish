import BooksCollection from "../db/models/collections.mjs";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const saveBooksCollections = async (req, res) => {
  const { collections } = req.body;

  const { last_collection_id } = req.query;
  let lastId = parseInt(last_collection_id);

  try {
    // Save theses collections
    const booksCollections = await BooksCollection.create(collections);

    // Take the last collections that are not synced on the current apparatus
    let unSyncedCollections = [];

    if (!isNaN(lastId)) {
      unSyncedCollections = await BooksCollection.find(
        {
          __id: { $gt: lastId },
        },
        {},
        { lean: true }
      );
    }

    res.status(201).json(unSyncedCollections);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};
