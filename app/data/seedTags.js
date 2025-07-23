const mongoose = require('mongoose')
const Tag = require('../models/tag')
const db = require('../../config/db')

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })

const seedTags = async () => {
  try {
    // Clear existing tags
    await Tag.deleteMany()
    console.log('Existing tags cleared.')

    // Insert tags
    const tags = await Tag.insertMany([
      { name: 'Impressionist' },
      { name: 'Pop' },
      { name: 'Contemporary' }
    ])
    console.log('Tags seeded:', tags.map(t => t.name))

    // Seed pieces after tags
    require('./seedPieces')
  } catch (err) {
    console.error('Error seeding tags:', err)
  }
}

seedTags()
