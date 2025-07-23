import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true
      }
    ],
    heldPiece1Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Piece',
      default: null
    },
    heldPiece2Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Piece',
      default: null
    },
    cartedPiece1Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Piece',
      default: null
    },
    cartedPiece2Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Piece',
      default: null
    },
    isSubscribed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v
        return ret
      }
    }
  }
)

const Profile = mongoose.model('Profile', profileSchema)
export default Profile
