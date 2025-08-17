// app/routes/profile_routes.js

const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const Profile = require('../models/profile');
const removeBlanks = require('../../lib/remove_blank_fields');

const requireToken = passport.authenticate('bearer', { session: false });
const router = express.Router();

/**
 * Mounted at: app.use('/api/profiles', profileRoutes)
 */

/* INDEX */
router.get('/', async (_req, res, next) => {
  try {
    const profiles = await Profile.find().populate('tags');
    res.status(200).json({ profiles: profiles.map(p => p.toObject()) });
  } catch (err) { next(err); }
});

/* SHOW by profile _id */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid profile id' });

    const profile = await Profile.findById(id).populate('tags');
    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    res.status(200).json({ profile: profile.toObject() });
  } catch (err) { next(err); }
});

/* SHOW/CREATE by userId (ObjectId of User)
   GET /api/profiles/user/:userId?createIfMissing=true
   - Requires auth
   - If createIfMissing=true, only the authenticated user can create their own profile
*/
router.get('/user/:userId', requireToken, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const createIfMissing = String(req.query.createIfMissing || '').toLowerCase() === 'true';

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    if (createIfMissing && String(req.user._id) !== String(userId)) {
      return res.status(403).json({ error: 'Not allowed to create for another user' });
    }

    // Try new canonical field first
    let profile = await Profile.findOne({ user: userId }).populate('tags');

    // Legacy fallback (matches old docs that still have userId)
    if (!profile) {
      // Even though `userId` is not in the schema, querying by extra key is fine.
      profile = await Profile.findOne({ userId: new mongoose.Types.ObjectId(userId) }).populate('tags');
    }

    // If not found and requested to create, upsert blank safely
    if (!profile && createIfMissing) {
      profile = await Profile.findOneAndUpdate(
        { user: userId },
        {
          $setOnInsert: { user: userId, name: '', address: '', tags: [], isSubscribed: false },
        },
        { new: true, upsert: true }
      ).populate('tags');
    }

    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.status(200).json({ profile: profile.toObject() });
  } catch (err) { next(err); }
});

/* CREATE explicit (protected)
   Body: { profile: { name, address, tags, isSubscribed, (optional) user } }
*/
router.post('/', requireToken, removeBlanks, async (req, res, next) => {
  try {
    const payload = { ...req.body.profile, user: (req.body?.profile?.user || req.user._id) };
    const existing = await Profile.findOne({ user: payload.user });
    if (existing) return res.status(409).json({ error: 'Profile already exists for this user' });

    const profile = await Profile.create(payload);
    res.status(201).json({ profile: profile.toObject() });
  } catch (err) { next(err); }
});

/* UPDATE current user's profile (protected)
   Body: { profile: { ...fields } } -> returns updated profile
*/
router.patch('/', requireToken, removeBlanks, async (req, res, next) => {
  try {
    const data = req.body?.profile || {};
    const updated = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: data },
      { new: true, runValidators: true }
    ).populate('tags');
    if (!updated) return res.status(404).json({ error: 'Profile not found' });

    res.status(200).json({ profile: updated.toObject() });
  } catch (err) { next(err); }
});

/* UPDATE by userId (admin/maintenance) */
router.patch('/user/:userId', requireToken, removeBlanks, async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) return res.status(400).json({ error: 'Invalid user id' });

    const data = req.body?.profile || req.body || {};
    const updated = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: data },
      { new: true, runValidators: true }
    ).populate('tags');

    // Legacy fallback if still keyed by userId in DB
    if (!updated) {
      const updatedLegacy = await Profile.findOneAndUpdate(
        { userId: new mongoose.Types.ObjectId(userId) },
        { $set: data },
        { new: true, runValidators: true }
      ).populate('tags');
      if (!updatedLegacy) return res.status(404).json({ error: 'Profile not found' });
      return res.status(200).json({ profile: updatedLegacy.toObject() });
    }

    res.status(200).json({ profile: updated.toObject() });
  } catch (err) { next(err); }
});

/* UPDATE by profile _id (protected) */
router.patch('/:id', requireToken, removeBlanks, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid profile id' });

    const data = req.body?.profile || req.body || {};
    const updated = await Profile.findByIdAndUpdate(
      id, { $set: data }, { new: true, runValidators: true }
    ).populate('tags');
    if (!updated) return res.status(404).json({ error: 'Profile not found' });

    res.status(200).json({ profile: updated.toObject() });
  } catch (err) { next(err); }
});

/* DESTROY by profile _id (protected) */
router.delete('/:id', requireToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid profile id' });

    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    await profile.deleteOne();
    res.sendStatus(204);
  } catch (err) { next(err); }
});

module.exports = router;
