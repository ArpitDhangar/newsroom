import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import newsRoutes from './routes/newsRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

// Load environment variables
dotenv.config({ path: './config.env' });

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL in production
  methods: 'GET,POST,PUT,DELETE', // Allowed methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
  credentials: true,
};

app.use(cors(corsOptions)); // Use cors with options

// Middleware to handle JSON requests
app.use(express.json());

// News API Routes
app.use('/api/headlines', newsRoutes);

// Error handling middleware
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Nice Work Arpit!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
