const { Sequelize } = require('sequelize');

// i will establish my local database connection to the app with .env file after my final exams. for now, i deleted require(sequelize) part and updated the file with mysql2/promise

// mysql2/promise one. i guess this should work for .env files. feel free to change it if not

const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });

//pool allows for multiple coonnections
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'kutuphane',
  waitForConnections: true,

  //max 10 connections from different requests
  connectionLimit: 10,
  queueLimit: 0,
});

/* i also put example query function below. you may take a look at it for reference.

const pool = require('./config/database');
async function fetchBooks() {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM Books');
    console.log('Books:', rows);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

fetchBooks(); */

module.exports = pool;
