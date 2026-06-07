import { Router } from 'express';
import {
  dashboardSummaryController,
  ordersPerDayController,
  revenuePerStoreController,
  topSellingItemsController,
} from '../controllers/analyticsController.js';
import { validate } from '../middleware/validate.js';
import { dateRangeQuerySchema } from '../validators/analyticsValidator.js';

const router = Router();

router.get('/summary', dashboardSummaryController);
router.get('/orders-per-day', validate(dateRangeQuerySchema), ordersPerDayController);
router.get('/revenue-per-store', validate(dateRangeQuerySchema), revenuePerStoreController);
router.get('/top-selling-items', validate(dateRangeQuerySchema), topSellingItemsController);

export default router;
