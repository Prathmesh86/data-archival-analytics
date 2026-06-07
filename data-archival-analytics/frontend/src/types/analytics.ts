export type Summary = {
  active_orders: number;
  archived_orders: number;
  active_revenue: string;
  total_stores: number;
};

export type OrdersPerDay = { order_day: string; total_orders: number };
export type RevenuePerStore = { store_id: number; store_name: string; total_revenue: string };
export type TopSellingItem = { item_id: number; item_name: string; total_quantity_sold: number; total_sales: string };
