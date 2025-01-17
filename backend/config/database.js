const { Sequelize } = require('sequelize');

// Replace 'username' and 'password' with your actual MySQL username and password
const sequelize = new Sequelize('kutuphane', 'root', 'Adanamerkez9', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306, // Default MySQL port
});

module.exports = sequelize;