import { pool } from '../config/db.js';

function getDateFilter(startDate, endDate, offset = 1) {
  const conditions = [];
  const values = [];
  if (startDate) {
    values.push(startDate);
    conditions.push(`order_date >= $${offset + values.length - 1}`);
  }
  if (endDate) {
    values.push(endDate);
    conditions.push(`order_date <= $${offset + values.length - 1}`);
  }
  return {
    where: conditions.length ? `WHERE ${conditions.join(' AND ')}` : '',
    values,
  };
}

export async function getOrdersPerDay({ startDate, endDate, page, limit }) {
  const dateFilter = getDateFilter(startDate, endDate);
  const offsetValue = (page - 1) * limit;
  const limitIndex = dateFilter.values.length + 1;
  const offsetIndex = dateFilter.values.length + 2;

  const query = `
    SELECT DATE(order_date) AS order_day, COUNT(*)::int AS total_orders
    FROM orders
    ${dateFilter.where}
    GROUP BY DATE(order_date)
    ORDER BY order_day DESC
    LIMIT $${limitIndex} OFFSET $${offsetIndex};
  `;

  const { rows } = await pool.query(query, [...dateFilter.values, limit, offsetValue]);
  return rows;
}

export async function getRevenuePerStore({ startDate, endDate, page, limit }) {
  const dateFilter = getDateFilter(startDate, endDate);
  const offsetValue = (page - 1) * limit;
  const limitIndex = dateFilter.values.length + 1;
  const offsetIndex = dateFilter.values.length + 2;

  const query = `
    SELECT store_id, store_name, ROUND(SUM(total_amount)::numeric, 2) AS total_revenue
    FROM orders
    ${dateFilter.where}
    GROUP BY store_id, store_name
    ORDER BY total_revenue DESC
    LIMIT $${limitIndex} OFFSET $${offsetIndex};
  `;

  const { rows } = await pool.query(query, [...dateFilter.values, limit, offsetValue]);
  return rows;
}

export async function getTopSellingItems({ startDate, endDate }) {
  const dateFilter = getDateFilter(startDate, endDate);
  const query = `
    SELECT item_id, item_name,
           SUM(quantity)::int AS total_quantity_sold,
           ROUND(SUM(total_amount)::numeric, 2) AS total_sales
    FROM orders
    ${dateFilter.where}
    GROUP BY item_id, item_name
    ORDER BY total_quantity_sold DESC, total_sales DESC
    LIMIT 5;
  `;

  const { rows } = await pool.query(query, dateFilter.values);
  return rows;
}

export async function getDashboardSummary() {
  const query = `
    SELECT
      (SELECT COUNT(*)::int FROM orders) AS active_orders,
      (SELECT COUNT(*)::int FROM orders_archive) AS archived_orders,
      (SELECT ROUND(COALESCE(SUM(total_amount), 0)::numeric, 2) FROM orders) AS active_revenue,
      (SELECT COUNT(DISTINCT store_id)::int FROM orders) AS total_stores;
  `;
  const { rows } = await pool.query(query);
  return rows[0];
}
