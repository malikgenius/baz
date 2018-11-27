// aggregation for sorting fields .. check maximillion mongodb

db.books
  .aggregate([
    { $match: { title: 'الإمامة الإباضية في عمان' } },
    { $group: { _id: { author: 'author.name' }, totalPersons: { $sum: 1 } } }
  ])
  .pretty();
// will bring back the values as well ..
db.books
  .aggregate([
    { $match: { title: 'الإمامة الإباضية في عمان' } },
    { $group: { _id: { author: '$author.name' }, totalPersons: { $sum: 1 } } }
  ])
  .pretty();
