const mongoose = require('mongoose')
const Piece = require('../models/piece')
const Tag = require('../models/tag')
const db = require('../../config/db')

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })

const seedPieces = async () => {
  try {
    // Fetch all tags
    const tags = await Tag.find()
    if (tags.length < 3) {
      console.error('Not enough tags found. Ensure Impressionist, Pop, and Contemporary tags exist.')
      process.exit()
    }

    // Clear existing pieces
    await Piece.deleteMany()
    console.log('Cleared existing pieces.')

    // Create new pieces
    const pieces = [
      // Impressionist
      {
        title: 'Impression Sunrise',
        description:
          "The painting is credited with inspiring the name of the Impressionist movement. Impression, Sunrise depicts the port of Le Havre, Monet's hometown.",
        artist: 'Claude Monet',
        tags: [tags[0]._id],
        imgUrl: 'https://www.claude-monet.com/images/paintings/impression-sunrise.jpg',
      },
      {
        title: 'The Basket of Apples',
        description:
          'The Basket of Apples is a still life oil painting by French artist Paul Cézanne, which he created c. 1893...',
        artist: 'Paul Cézanne',
        tags: [tags[0]._id],
        imgUrl: 'https://www.artic.edu/iiif/2/52ac8996-3460-cf71-cb42-5c4d0aa29b74/full/1686,/0/default.jpg',
      },
      // Pop
      {
        title: 'Andy Mouse III',
        description:
          'Andy Mouse is a series of silkscreen prints created by American artist Keith Haring in 1986...',
        artist: 'Keith Haring',
        tags: [tags[1]._id],
        imgUrl: 'https://www.guyhepner.com/wp-content/uploads/2015/04/andymouse3.gif',
      },
      // ... Add all the rest of your pieces here
    ]

    await Piece.insertMany(pieces)
    console.log('Pieces seeded successfully!')

    mongoose.connection.close()
  } catch (err) {
    console.error(err)
    mongoose.connection.close()
  }
}

seedPieces()
