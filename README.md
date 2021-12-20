## Local Setup

#### This Part 2 of local deployment (the server side). If you have not completed Part 1 (the client side), please start with [Part 1 of local deployment](https://github.com/isaac8069/Re-Art-Client), and then complete this setup.

- Install the LTS version of node.js, available [here](https://nodejs.org/en/)

- In a terminal, clone this repo

```sh
git clone https://github.com/isaac8069/Re-Art-Server.git
```

- Navigate to the repo folder

```sh
cd Re-Art-Server
```

- Install the project dependencies:

```sh
npm install
```

- create a new folder in the main directory and name it "config". Within the folder create a file called "db.js".

```sh
mkdir config
cd config
touch db.js
```

- within this file, include this code for setting up your database:

```sh
'use strict'

// creating a base name for the mongodb
// REPLACE THE STRING WITH YOUR OWN DATABASE NAME
const mongooseBaseName = 'exampleApp'

// create the mongodb uri for development and test
const database = {
	development: `mongodb://localhost/${mongooseBaseName}-development`,
	test: `mongodb://localhost/${mongooseBaseName}-test`,
}

// Identify if development environment is test or development
// select DB based on whether a test file was executed before `server.js`
const localDb = process.env.TESTENV ? database.test : database.development

// Environment variable MONGODB_URI will be available in
// heroku production evironment otherwise use test or development db
const currentDb = process.env.MONGODB_URI || localDb

module.exports = currentDb
```

- Deploy the project on your local machine

```sh
npm start
```

- head to localhost:3000 to see the client and server running together.