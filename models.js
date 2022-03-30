//Require mongoose
const mongoose = require('mongoose');

//Create a schema
const Schema = mongoose.Schema;

const bookSchema = new Schema ({
  title: {type: String, required: true},
  commentcount: {type: Number, required: true},
  comments: [String]
});

const Book = mongoose.model('Book', bookSchema);

exports.Book = Book;