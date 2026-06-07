type StatCardProps = { title: string; value: string | number; subtitle: string };

export function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="card">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="mt-2 text-3xl font-bold tracking-tight">{value}</h3>
      <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
    </div>
  );
}
