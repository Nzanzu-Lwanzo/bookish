import mongoose, { deleteModel } from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 256,
      trim: true,
      required: true,
    },

    author: {
      type: String,
      maxLength: 128,
      trim: true,
    },

    resume: String,

    __id: {
      type: Number,
      unique: true,
    },

    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },

    created_at: Date,
    updated_at: Date,

    cid: {
      type: Number,
      ref: "Collection", // MUST REFERENCE THE COLLECTION MODEL
    },
    synced: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

BookSchema.virtual("collection", {
  ref: "BooksCollection",
  localField: "cid",
  foreignField: "__id",
  justOne : true
});

BookSchema.pre("save", async function (next, options) {
  try {
    let __id = this.__id;
    await mongoose.model("Book").findOneAndDelete({ __id });
    next();
  } catch (e) {
    next(e);
  }
});

const Book = mongoose.model("Book", BookSchema);

export default Book;
