import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
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

  __id : {
    type : Number,
    unique : true
  },

  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },

  created_at: Date,
  updated_at: Date,

  cid: Number,
  synced: {
    type: Boolean,
    default: true,
  },
});

const Book = mongoose.model("Book", BookSchema);

export default Book;