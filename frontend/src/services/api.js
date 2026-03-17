import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
  headers: { 'Content-Type': 'application/json' },
});

export async function createAccount(payload) {
  const { data } = await api.post('/api/accounts', payload);
  return data;
}

export async function getAccounts() {
  const { data } = await api.get('/api/accounts');
  return data;
}

export async function getAccount(id) {
  const { data } = await api.get(`/api/accounts/${id}`);
  return data;
}

export async function transferMoney(payload) {
  const { data } = await api.post('/api/transfer', payload);
  return data;
}

export async function getTransactions(accountId) {
  const { data } = await api.get(`/api/accounts/${accountId}/transactions`);
  return data;
}
