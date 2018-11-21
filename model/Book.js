const mongoose = require('mongoose');
const BookPaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  email: String,
  website: String
});

// const Auther = mongoose.model('auther', authorSchema)

const BookSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    lend: [
      {
        type: Schema.Types.ObjectId,
        ref: 'lend'
      }
    ],
    author: [authorSchema],
    isbn: {
      type: String
      // required: true
    },
    classification: {
      type: String
      // required: true
    },
    title: {
      type: String,
      required: true,
      lowercase: true
    },

    edition: {
      type: String
    },
    volume: {
      type: String
    },
    type: {
      type: String
    },
    publisher: {
      type: String
    },
    published_date: {
      type: Date
    },
    published_place: {
      type: String
    },
    pages: {
      type: Number
    },
    status: {
      type: String
    },
    keywords: {
      type: [String],
      lowercase: true
    },
    edited_book: [],
    inStock: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

BookSchema.plugin(BookPaginate);

module.exports = Book = mongoose.model('book', BookSchema);
