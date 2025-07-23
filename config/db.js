'use strict';

require('dotenv').config();

// Use the MONGODB_URI from .env, or fall back to local development/test DB
const mongooseBaseName = 'reArtApp';

const database = {
  development: `mongodb://127.0.0.1:27017/${mongooseBaseName}-development`,
  test: `mongodb://127.0.0.1:27017/${mongooseBaseName}-test`,
};

const environment = process.env.NODE_ENV || 'development';
const currentDb = process.env.MONGODB_URI || (process.env.TESTENV ? database.test : database.development);

console.log(`🔗 Using ${process.env.MONGODB_URI ? 'production' : environment} database: ${currentDb}`);

module.exports = currentDb;
