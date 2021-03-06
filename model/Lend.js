const mongoose = require('mongoose');
const LendPaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const LendSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'book'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    requestDate: {
      type: Date,
      default: Date.now
    },
    returnDate: {
      type: Date
    }
  },
  { timestamps: true }
);

LendSchema.plugin(LendPaginate);

module.exports = Book = mongoose.model('lend', LendSchema);
