import express from 'express'
import crypto from 'crypto'
import passport from 'passport'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { BadParamsError, BadCredentialsError } from '../../lib/custom_errors.js'

const router = express.Router()
const bcryptSaltRounds = 10
const requireToken = passport.authenticate('bearer', { session: false })

// ====================
// @route   POST /sign-up
// @desc    Register a new user
// @access  Public
// ====================
router.post('/sign-up', async (req, res, next) => {
  try {
    const { email, password, password_confirmation } = req.body.credentials || {}

    // Validate credentials
    if (!password || password !== password_confirmation) {
      throw new BadParamsError()
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, bcryptSaltRounds)

    // Create user
    const user = await User.create({ email, hashedPassword })
    res.status(201).json({ user: user.toObject() })
  } catch (error) {
    next(error)
  }
})

// ====================
// @route   POST /sign-in
// @desc    Authenticate user and return token
// @access  Public
// ====================
router.post('/sign-in', async (req, res, next) => {
  try {
    const { email, password } = req.body.credentials
    const user = await User.findOne({ email })

    if (!user) throw new BadCredentialsError()

    const correctPassword = await bcrypt.compare(password, user.hashedPassword)
    if (!correctPassword) throw new BadCredentialsError()

    // Generate token
    user.token = crypto.randomBytes(16).toString('hex')
    await user.save()

    res.status(201).json({ user: user.toObject() })
  } catch (error) {
    next(error)
  }
})

// ====================
// @route   PATCH /change-password
// @desc    Change user password
// @access  Private
// ====================
router.patch('/change-password', requireToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) throw new BadCredentialsError()

    const correctPassword = await bcrypt.compare(req.body.passwords.old, user.hashedPassword)
    if (!req.body.passwords.new || !correctPassword) throw new BadParamsError()

    user.hashedPassword = await bcrypt.hash(req.body.passwords.new, bcryptSaltRounds)
    await user.save()

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// ====================
// @route   DELETE /sign-out
// @desc    Sign out user by resetting token
// @access  Private
// ====================
router.delete('/sign-out', requireToken, async (req, res, next) => {
  try {
    req.user.token = crypto.randomBytes(16).toString('hex')
    await req.user.save()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

export default router
