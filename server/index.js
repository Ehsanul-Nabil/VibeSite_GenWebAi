import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDB from './config/db.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Connect to Database

// Health Check / Basic Test Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server running successfully!',
  });
});

// Example API Routes placeholder
// app.use('/api/users', userRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDB();

});


