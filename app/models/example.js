import mongoose from 'mongoose'

const exampleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long']
    },
    text: {
      type: String,
      required: [true, 'Text is required'],
      trim: true,
      minlength: [5, 'Text must be at least 5 characters long']
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v   // remove version key
        return ret
      }
    }
  }
)

const Example = mongoose.model('Example', exampleSchema)
export default Example
