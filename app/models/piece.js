import mongoose from 'mongoose'

const pieceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    artist: {
      type: String,
      required: [true, 'Artist name is required'],
      trim: true
    },
    isAssigned: {
      type: Boolean,
      default: false
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true
      }
    ],
    isPurchased: {
      type: Boolean,
      default: false
    },
    price: {
      type: Number,
      min: [0, 'Price must be positive'],
      default: null
    },
    imgUrl: {
      type: String,
      required: [true, 'Image URL is required']
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

const Piece = mongoose.model('Piece', pieceSchema)
export default Piece
