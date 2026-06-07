'use client';

import { fetcher } from '@/lib/api';
import { useFilterStore } from '@/lib/store';
import { OrdersPerDay, RevenuePerStore, TopSellingItem } from '@/types/analytics';
import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function buildQuery(startDate: string, endDate: string) {
  const params = new URLSearchParams({ limit: '30' });
  if (startDate) params.set('startDate', startDate);
  if (endDate) params.set('endDate', endDate);
  return params.toString();
}

export function AnalyticsCharts() {
  const { startDate, endDate } = useFilterStore();
  const query = buildQuery(startDate, endDate);

  const orders = useQuery({ queryKey: ['orders-per-day', query], queryFn: () => fetcher<OrdersPerDay[]>(`/analytics/orders-per-day?${query}`) });
  const revenue = useQuery({ queryKey: ['revenue-per-store', query], queryFn: () => fetcher<RevenuePerStore[]>(`/analytics/revenue-per-store?${query}`) });
  const items = useQuery({ queryKey: ['top-selling-items', query], queryFn: () => fetcher<TopSellingItem[]>(`/analytics/top-selling-items?${query}`) });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ChartCard title="Orders Per Day" loading={orders.isLoading}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={orders.data?.map((row) => ({ ...row, order_day: new Date(row.order_day).toLocaleDateString() })) || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="order_day" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_orders" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Revenue Per Store" loading={revenue.isLoading}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={revenue.data?.map((row) => ({ ...row, total_revenue: Number(row.total_revenue) })) || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="store_name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_revenue" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="card lg:col-span-2">
        <h2 className="mb-4 text-lg font-bold">Top 5 Selling Items</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr><th className="p-3">Item</th><th className="p-3">Quantity Sold</th><th className="p-3">Total Sales</th></tr>
            </thead>
            <tbody>
              {(items.data || []).map((item) => (
                <tr key={`${item.item_id}-${item.item_name}`} className="border-b border-slate-100">
                  <td className="p-3 font-medium">{item.item_name}</td>
                  <td className="p-3">{item.total_quantity_sold}</td>
                  <td className="p-3">₹{Number(item.total_sales).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, loading, children }: { title: string; loading: boolean; children: React.ReactNode }) {
  return <div className="card"><h2 className="mb-4 text-lg font-bold">{title}</h2>{loading ? <p className="text-sm text-slate-500">Loading...</p> : children}</div>;
}
