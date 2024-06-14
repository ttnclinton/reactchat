const mongoose = require("mongoose");
const User = require("./user");

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: mongoose.ObjectId,
      required: true,
      ref: User,
    },
    description: {
      type: String,
      required: true,
    },
    addedUsers: {
      type: Array,
      minlength: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("room", RoomSchema);
