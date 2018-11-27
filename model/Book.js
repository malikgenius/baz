const mongoose = require('mongoose');
const BookPaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  email: String,
  website: String,
  gender: String
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
        lend: { type: Schema.Types.ObjectId, ref: 'lend' }
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

// Define Indexes check wesbos node course for details...
BookSchema.index(
  {
    title: 'text',
    classification: 'text',
    'author.name': 'text',
    keywords: 'text'
  },
  { background: true }
);

// Text Index does not work on mixed Arabic and english ... lets try normal index.
// BookSchema.index({
//   title: 1,
//   classification: 1,
//   'author.name': 1,
//   keywords: 1
// });
// to avoid the deprication warning in console about the indexes ...
mongoose.set('useCreateIndex', true);

// define Pagination here
BookSchema.plugin(BookPaginate);

module.exports = Book = mongoose.model('book', BookSchema);
