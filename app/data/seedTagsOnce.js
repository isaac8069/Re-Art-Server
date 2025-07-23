const mongoose = require('mongoose')
const Tag = require('../models/tag')
const db = require('../../config/db')

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })

const seedTags = async () => {
  try {
    // Clear existing tags
    await Tag.deleteMany()
    console.log('Existing tags cleared.')

    // Insert new tags in bulk
    const insertedTags = await Tag.insertMany([
      { name: 'Impressionist' },
      { name: 'Pop' },
      { name: 'Contemporary' }
    ])

    console.log('Tags seeded:', insertedTags.map(tag => tag.name))
  } catch (err) {
    console.error('Error seeding tags:', err)
  } finally {
    mongoose.disconnect()
  }
}

seedTags()
