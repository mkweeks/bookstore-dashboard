const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a book name"],
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Please enter a description for this book"]
  },
  category: {
    type: String,
    required: [true, "Please enter the category"],
  },
});

const Book = mongoose.model("Book", BookSchema)

module.exports = Book