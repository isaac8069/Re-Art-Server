require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Routes
const exampleRoutes = require('./app/routes/example_routes');
const userRoutes = require('./app/routes/user_routes');
const tagRoutes = require('./app/routes/tag_routes');
const pieceRoutes = require('./app/routes/piece_routes');
const profileRoutes = require('./app/routes/profile_routes');

// Middleware
const errorHandler = require('./lib/error_handler');
const replaceToken = require('./lib/replace_token');
const requestLogger = require('./lib/request_logger');
const auth = require('./lib/auth');

// Database
const db = require('./config/db');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(replaceToken);
app.use(auth);

// API Routes
app.use('/api/examples', exampleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/pieces', pieceRoutes);
app.use('/api/profiles', profileRoutes);

// Stripe Payment Route
app.post('/api/pay', async (req, res) => {
  try {
    const intent = await stripe.paymentIntents.create({
      payment_method: req.body.payment_method_id,
      description: 'Test payment',
      amount: req.body.amount,
      currency: 'usd',
      confirmation_method: 'manual',
      confirm: true,
    });
    res.send(generateResponse(intent));
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

const generateResponse = (intent) =>
  intent.status === 'succeeded'
    ? { success: true }
    : { error: 'Invalid PaymentIntent status' };

// Test Route (for development)
app.get('/', (req, res) => {
  res.send('Re-Art MERN backend is running.');
});

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, 'client', 'build');
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) =>
    res.sendFile(path.join(clientBuildPath, 'index.html'))
  );
}

// Error Handler
app.use(errorHandler);

// Connect to MongoDB and Start Server
const startServer = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ Connected to MongoDB: ${db}`);
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  }
};

startServer();

module.exports = app;
