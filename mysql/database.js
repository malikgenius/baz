// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', 'thunder', {
//   dialect: 'mysql',
//   host: 'localhost',
//   operatorsAliases: false
// });

// module.exports = sequelize;

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'thunder', {
  dialect: 'mysql',
  host: 'localhost',
  operatorsAliases: false
});

module.exports = sequelize;
