// app/models/profile.js  (CommonJS, aligned with routes)
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    // ✅ new canonical field
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    name: { type: String, trim: true, default: '' },      // not required to allow auto-create
    address: { type: String, trim: true, default: '' },   // not required to allow auto-create
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }], // optional
    heldPiece1Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Piece', default: null },
    heldPiece2Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Piece', default: null },
    cartedPiece1Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Piece', default: null },
    cartedPiece2Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Piece', default: null },
    isSubscribed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => { delete ret.__v; return ret; }
    },
    toObject: { virtuals: true }
  }
);

// NOTE: We intentionally do NOT declare `userId` in the schema anymore.
// Old docs may still carry a `userId` property in the collection; we’ll migrate them.

module.exports = mongoose.models.Profile || mongoose.model('Profile', profileSchema);
