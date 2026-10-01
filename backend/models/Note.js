const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: [60, "Title can be at most 60 characters"],
      default: "",
    },
    content: {
      type: String,
      required: [true, "Note content is required"],
      trim: true,
      maxlength: [250, "Note content can be at most 250 characters"],
    },
  },
  { timestamps: true } // gives us createdAt / updatedAt automatically
);

module.exports = mongoose.model("Note", noteSchema);
