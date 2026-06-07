import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import analyticsRoutes from './routes/analyticsRoutes.js';
import archiveRoutes from './routes/archiveRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Data Archival & Analytics API is running',
    endpoints: [
      'POST /api/archive-old-orders',
      'GET /api/analytics/summary',
      'GET /api/analytics/orders-per-day',
      'GET /api/analytics/revenue-per-store',
      'GET /api/analytics/top-selling-items',
    ],
  });
});

app.use('/api', archiveRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
