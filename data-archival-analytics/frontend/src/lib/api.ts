import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

export async function fetcher<T>(url: string): Promise<T> {
  const response = await api.get<{ success: boolean; data: T }>(url);
  return response.data.data;
}
