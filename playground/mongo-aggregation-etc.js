// aggregation for sorting fields .. check maximillion mongodb

db.books.aggregate([{ $match: { title: 'الإمامة الإباضية في عمان' } },{ $group: { _id: { author: 'author.name' }, totalPersons: { $sum: 1 } } }  ])  .pretty();
// will bring back the values as well .. 
db.books.aggregate([{ $match: { title: 'عمان عبر التاريخ' } },{ $group: { _id: { author: '$author.name' }, totalPersons: { $sum: 1 } } }  ])  .pretty();


// keywords or tags should be sent like below, at the backend i am slicing it on ',' and adding it in array .. 

{
    "title": "Tags search",
    "tags": "mountains, wadis, schools",
    "author": [{
        "name": "afroz",
        "email": "afroz@zeenah.com"
    },
     {
        "name": "Rashid",
        "email": "rashid@zeenah.com"
    }]
}

// best way to add authors, now we have to handle how many authers in frontend only.. 
// {
//     "title": "عمان عبر التاريخ",
//     "classification": "testing aggregation",
//     "author": [{
//         "name": "afroz",
//         "email": "afroz@zeenah.com"
//     },
//      {
//         "name": "Rashid",
//         "email": "rashid@zeenah.com"
//     }]
// }