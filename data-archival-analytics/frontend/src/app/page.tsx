'use client';

import { ArchiveButton } from '@/components/ArchiveButton';
import { AnalyticsCharts } from '@/components/Charts';
import { DateFilters } from '@/components/DateFilters';
import { StatCard } from '@/components/StatCard';
import { fetcher } from '@/lib/api';
import { Summary } from '@/types/analytics';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data, isLoading } = useQuery({ queryKey: ['summary'], queryFn: () => fetcher<Summary>('/analytics/summary') });

  return (
    <main className="min-h-screen px-4 py-8 md:px-8">
      <section className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Full Stack Developer Assessment</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">Data Archival & Analytics</h1>
            <p className="mt-3 max-w-2xl text-slate-600">A production-style dashboard with PostgreSQL archival, aggregation APIs, optimized indexes, and clean Next.js UI.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-soft">Backend: Express + PostgreSQL<br />Frontend: Next.js + React Query</div>
        </header>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Active Orders" value={isLoading ? '...' : data?.active_orders ?? 0} subtitle="orders table" />
          <StatCard title="Archived Orders" value={isLoading ? '...' : data?.archived_orders ?? 0} subtitle="orders_archive table" />
          <StatCard title="Active Revenue" value={isLoading ? '...' : `₹${Number(data?.active_revenue || 0).toLocaleString('en-IN')}`} subtitle="current orders" />
          <StatCard title="Stores" value={isLoading ? '...' : data?.total_stores ?? 0} subtitle="unique stores" />
        </div>

        <ArchiveButton />
        <DateFilters />
        <AnalyticsCharts />
      </section>
    </main>
  );
}
