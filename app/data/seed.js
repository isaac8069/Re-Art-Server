import mongoose from 'mongoose'
import Piece from '../models/piece.js'
import Tag from '../models/tag.js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const seedData = [
  // Impressionist
  {
    title: "Impression Sunrise",
    description:
      "The painting is credited with inspiring the name of the Impressionist movement. Impression, Sunrise depicts the port of Le Havre, Monet's hometown.",
    artist: "Claude Monet",
    tags: [], // Will be filled with actual Tag IDs
    imgUrl: "https://www.claude-monet.com/images/paintings/impression-sunrise.jpg"
  },
  {
    title: "The Basket of Apples",
    description:
      "The Basket of Apples is a still life oil painting by French artist Paul Cézanne...",
    artist: "Paul Cézanne",
    tags: [],
    imgUrl: "https://www.artic.edu/iiif/2/52ac8996-3460-cf71-cb42-5c4d0aa29b74/full/1686,/0/default.jpg"
  },
  // ... add other Pop and Contemporary pieces
]

// Seed function
const seedDB = async () => {
  try {
    // Clear existing pieces
    await Piece.deleteMany()

    // Find or create a default tag (e.g., "Impressionist")
    let defaultTag = await Tag.findOne({ name: 'Impressionist' })
    if (!defaultTag) {
      defaultTag = await Tag.create({ name: 'Impressionist' })
    }

    // Insert seed data with the tag ID
    const piecesWithTag = seedData.map(piece => ({
      ...piece,
      tags: [defaultTag._id]
    }))

    await Piece.insertMany(piecesWithTag)
    console.log('Database seeded successfully!')
  } catch (err) {
    console.error('Error seeding database:', err)
  } finally {
    mongoose.connection.close()
  }
}

seedDB()
