import {
  getDashboardSummary,
  getOrdersPerDay,
  getRevenuePerStore,
  getTopSellingItems,
} from '../services/analyticsService.js';

export async function dashboardSummaryController(req, res, next) {
  try {
    const data = await getDashboardSummary();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function ordersPerDayController(req, res, next) {
  try {
    const data = await getOrdersPerDay(req.query);
    res.json({ success: true, data, pagination: { page: req.query.page, limit: req.query.limit } });
  } catch (error) {
    next(error);
  }
}

export async function revenuePerStoreController(req, res, next) {
  try {
    const data = await getRevenuePerStore(req.query);
    res.json({ success: true, data, pagination: { page: req.query.page, limit: req.query.limit } });
  } catch (error) {
    next(error);
  }
}

export async function topSellingItemsController(req, res, next) {
  try {
    const data = await getTopSellingItems(req.query);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
