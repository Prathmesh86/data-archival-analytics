'use client';

import { useFilterStore } from '@/lib/store';

export function DateFilters() {
  const { startDate, endDate, setStartDate, setEndDate } = useFilterStore();

  return (
    <div className="card flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-lg font-bold">Analytics Filters</h2>
        <p className="text-sm text-slate-500">Filter analytics by order date.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-600">
          Start Date
          <input className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label className="text-sm font-medium text-slate-600">
          End Date
          <input className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
      </div>
    </div>
  );
}
