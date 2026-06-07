import { pool } from '../config/db.js';

export async function archiveOldOrders() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const insertResult = await client.query(`
      WITH moved_orders AS (
        DELETE FROM orders
        WHERE order_date < NOW() - INTERVAL '30 days'
        RETURNING *
      )
      INSERT INTO orders_archive (
        id, store_id, store_name, item_id, item_name, quantity, unit_price,
        total_amount, order_date, customer_email, archived_at
      )
      SELECT
        id, store_id, store_name, item_id, item_name, quantity, unit_price,
        total_amount, order_date, customer_email, NOW()
      FROM moved_orders
      ON CONFLICT (id) DO NOTHING
      RETURNING id;
    `);

    await client.query('COMMIT');
    return { archivedCount: insertResult.rowCount };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
