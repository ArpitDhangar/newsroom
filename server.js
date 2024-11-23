import express from 'express';
import newsRoutes from './routes/newsRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Middleware to handle JSON requests
app.use(express.json());

// News API Routes
app.use('/api/headlines', newsRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
