// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for tags
const Piece = require('../models/piece')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404

// this is middleware that will remove blank fields from `req.body`, e.g.
// { tag: { title: '', text: 'foo' } } -> { tag: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// // passing this as a second argument to `router.<verb>` will make it
// // so that a token MUST be passed for that route to be available
// // it will also set `req.user`
// const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()


// INDEX
// GET /tags
router.get('/pieces', (req, res, next) => {
	Piece.find()
		.then((pieces) => {
			// `tags` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return pieces.map((piece) => piece.toObject())
		})
		// respond with status 200 and JSON of the tags
		.then((pieces) => res.status(200).json({ pieces: pieces }))
		// if an error occurs, pass it to the handler
		.catch(next)
})


// CREATE
// POST /tags
router.post('/pieces', (req, res, next) => {

	Piece.create(req.body.piece)
		// respond to succesful `create` with status 201 and JSON of new "tag"
		.then((piece) => {
			res.status(201).json({ piece: piece.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// DESTROY
// DELETE /tags/5a7db6c74d55bc51bdf39793
router.delete('/pieces/:id', (req, res, next) => {
	Piece.findById(req.params.id)
		.then(handle404)
		.then((piece) => {
			// delete the tag ONLY IF the above didn't throw
			piece.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})




module.exports = router