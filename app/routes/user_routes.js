// app/routes/user_routes.js

const express = require('express');
const crypto = require('crypto');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');               // CommonJS model export
const Profile = require('../models/profile');         // for auto-create profile
const { BadParamsError, BadCredentialsError } = require('../../lib/custom_errors');

const router = express.Router();
const bcryptSaltRounds = 10;
const requireToken = passport.authenticate('bearer', { session: false });

// Helpers
const normalizeEmail = (email) => String(email || '').toLowerCase().trim();

/**
 * ====================
 * @route   POST /sign-up
 * @desc    Register a new user (also creates empty profile)
 * @access  Public
 * ====================
 */
router.post('/sign-up', async (req, res, next) => {
  try {
    const { email, password, password_confirmation } = req.body?.credentials || {};

    if (!email || !password || !password_confirmation) throw new BadParamsError();
    if (password !== password_confirmation) throw new BadParamsError();

    const normalizedEmail = normalizeEmail(email);
    const hashedPassword = await bcrypt.hash(password, bcryptSaltRounds);

    const user = await User.create({ email: normalizedEmail, hashedPassword });

    // Auto-create a blank profile so immediate client fetch won't 404
    await Profile.create({ user: user._id, displayName: '', avatarUrl: '', bio: '' });

    return res.status(201).json({ user: user.toObject() });
  } catch (error) {
    // Handle duplicate email (Mongo E11000)
    if (error && (error.code === 11000 || error.code === '11000')) {
      return res.status(409).json({ error: 'Email is already registered.' });
    }
    return next(error);
  }
});

/**
 * ====================
 * @route   POST /sign-in
 * @desc    Authenticate user and return token
 * @access  Public
 * ====================
 */
router.post('/sign-in', async (req, res, next) => {
  try {
    const { email, password } = req.body?.credentials || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const normalizedEmail = normalizeEmail(email);
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) throw new BadCredentialsError();

    const ok = await bcrypt.compare(password, user.hashedPassword);
    if (!ok) throw new BadCredentialsError();

    // Rotate token to sign in
    user.token = crypto.randomBytes(16).toString('hex');
    await user.save();

    return res.status(200).json({ user: user.toObject() });
  } catch (error) {
    return next(error);
  }
});

/**
 * ====================
 * @route   PATCH /change-password
 * @desc    Change user password
 * @access  Private (Bearer)
 * ====================
 */
router.patch('/change-password', requireToken, async (req, res, next) => {
  try {
    const { passwords } = req.body || {};
    const oldPw = passwords?.old;
    const newPw = passwords?.new;

    if (!oldPw || !newPw) throw new BadParamsError();

    const user = await User.findById(req.user.id);
    if (!user) throw new BadCredentialsError();

    const ok = await bcrypt.compare(oldPw, user.hashedPassword);
    if (!ok) throw new BadParamsError();

    user.hashedPassword = await bcrypt.hash(newPw, bcryptSaltRounds);
    await user.save();

    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
});

/**
 * ====================
 * @route   DELETE /sign-out
 * @desc    Sign out user by rotating token
 * @access  Private (Bearer)
 * ====================
 */
router.delete('/sign-out', requireToken, async (req, res, next) => {
  try {
    // Rotate token so the current bearer becomes invalid
    req.user.token = crypto.randomBytes(16).toString('hex');
    await req.user.save();
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
