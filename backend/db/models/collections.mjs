import mongoose from "mongoose";

const BooksCollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 64,
  },

  description: {
    type: String,
    maxLength: 26,
  },

  books_id: [Number],

  created_at: Date,
  updated_at: Date,

  __id: {
    type: Number,
    unique: true,
  },

  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },

  synced: {
    type: Boolean,
    default: true,
  },
});

BooksCollectionSchema.pre("save", async function (next, options) {
  try {
    let __id = this.__id;
    const deletedCollection = await mongoose.model("BooksCollection").findOneAndDelete({ __id });

    next();
  } catch (e) {
    next(e);
  }
});

const BooksCollection = mongoose.model(
  "BooksCollection",
  BooksCollectionSchema
);

export default BooksCollection;
