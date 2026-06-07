import { archiveOldOrders } from '../services/archiveService.js';

export async function archiveOldOrdersController(req, res, next) {
  try {
    const data = await archiveOldOrders();
    res.status(200).json({
      success: true,
      message: 'Orders older than 30 days archived successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
}
