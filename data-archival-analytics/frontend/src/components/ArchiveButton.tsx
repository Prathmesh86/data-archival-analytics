'use client';

import { api } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export function ArchiveButton() {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post('/archive-old-orders');
      return response.data.data as { archivedCount: number };
    },
    onSuccess: (data) => {
      setMessage(`${data.archivedCount} old orders archived successfully.`);
      queryClient.invalidateQueries();
    },
    onError: () => setMessage('Archival failed. Please check backend and database connection.'),
  });

  return (
    <div className="card flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-lg font-bold">Data Archival</h2>
        <p className="text-sm text-slate-500">Move orders older than 30 days into orders_archive using one transaction.</p>
        {message && <p className="mt-2 text-sm font-medium text-slate-700">{message}</p>}
      </div>
      <button className="btn" disabled={mutation.isPending} onClick={() => mutation.mutate()}>
        {mutation.isPending ? 'Archiving...' : 'Archive Old Orders'}
      </button>
    </div>
  );
}
