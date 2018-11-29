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
      // required: true,
      lowercase: true
    },
    subtitle: {
      type: String
      // required: true,
      // lowercase: true
    },
    subject: {
      type: String,
      // required: true,
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
    call: {
      type: String
    },
    imageUrl: {
      type: String
    },
    inStock: {
      type: Boolean,
      default: true
    },
    edited_book: []
  },
  { timestamps: true }
);

// Define Indexes check wesbos node course for details... its working with arabic and english text if request comes from UTF-8 means browser and not from postman.
BookSchema.index(
  {
    title: 'text',
    classification: 'text',
    'author.name': 'text',
    tags: 'text'
  },
  { background: true }
);
// to avoid the deprication warning in console about the indexes ...
mongoose.set('useCreateIndex', true);

// Static Aggregation function to find all the keywords..  wesbos node course
BookSchema.statics.getKeywordsList = function() {
  return this.aggregate([
    { $unwind: '$keywords' },
    { $group: { _id: '$keywords', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);
};
// Static Aggregation func to find author contributed in how many books.....
BookSchema.statics.getAuthorsList = function() {
  return this.aggregate([
    { $unwind: '$author' },
    { $group: { _id: '$author.name', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);
};

// define Pagination here
BookSchema.plugin(BookPaginate);

const Book = mongoose.model('books', BookSchema);
module.exports = Book;
