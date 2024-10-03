import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 64,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique : true
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
