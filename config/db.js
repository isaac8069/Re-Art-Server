'use strict'

// Base name for the MongoDB database
const mongooseBaseName = 'exampleApp';

// MongoDB URIs for development and test environments
const database = {
	development: `mongodb://localhost/${mongooseBaseName}-development`,
	test: `mongodb://localhost/${mongooseBaseName}-test`,
};

// Select the appropriate local database (development or test)
const localDb = process.env.TESTENV ? database.test : database.development;

// Use production URI if available, otherwise fall back to local DB
const currentDb = process.env.MONGODB_URI || localDb;

module.exports = currentDb;
