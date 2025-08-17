// app/models/user.js  (CommonJS)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    hashedPassword: {
      type: String,
      required: [true, 'Password hash is required'],
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: (_doc, user) => {
        delete user.hashedPassword;
        delete user.__v;
        return user;
      },
    },
    toJSON: {
      transform: (_doc, user) => {
        delete user.hashedPassword;
        delete user.__v;
        return user;
      },
    },
  }
);

// Avoid OverwriteModelError in dev/hot-reload:
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
