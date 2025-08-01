// Import dependencies
const express = require('express')
const passport = require('passport')
const Tag = require('../models/tag')
const { handle404 } = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')

const router = express.Router()
const requireToken = passport.authenticate('bearer', { session: false })

// ====================
// @route   GET /tags
// @desc    Get all tags
// @access  Public (can change to requireToken if needed)
// ====================
router.get('/tags', async (req, res, next) => {
  try {
    const tags = await Tag.find()
    res.status(200).json({ tags: tags.map(tag => tag.toObject()) })
  } catch (error) {
    next(error)
  }
})

// ====================
// @route   POST /tags
// @desc    Create a new tag
// @access  Private
// ====================
router.post('/tags', requireToken, async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body.tag)
    res.status(201).json({ tag: tag.toObject() })
  } catch (error) {
    next(error)
  }
})

// ====================
// @route   DELETE /tags/:id
// @desc    Delete a tag by ID
// @access  Private
// ====================
router.delete('/tags/:id', requireToken, async (req, res, next) => {
  try {
    const tag = await Tag.findById(req.params.id)
    handle404(tag)
    await tag.deleteOne()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
