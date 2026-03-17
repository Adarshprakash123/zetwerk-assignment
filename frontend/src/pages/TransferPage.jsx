import { useEffect, useMemo, useState } from 'react';
import TransactionList from '../components/TransactionList';
import TransferForm from '../components/TransferForm';
import { getAccounts, getTransactions, transferMoney } from '../services/api';

export default function TransferPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);

  async function loadAccounts() {
    setError('');
    setLoading(true);
    try {
      setAccounts(await getAccounts());
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load accounts');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAccounts();
  }, []);

  const canTransfer = useMemo(() => accounts.length >= 2, [accounts.length]);

  async function onTransfer(payload) {
    setError('');
    setResult(null);
    setRecentTransactions([]);
    setSubmitting(true);
    try {
      const data = await transferMoney(payload);
      setResult(data);
      await loadAccounts();

      const [fromTransactions, toTransactions] = await Promise.all([
        getTransactions(payload.fromAccountId),
        getTransactions(payload.toAccountId),
      ]);

      const mergedTransactions = [...fromTransactions, ...toTransactions]
        .filter((tx, index, all) => all.findIndex((item) => item.id === tx.id) === index)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setRecentTransactions(mergedTransactions);
    } catch (err) {
      setError(err?.response?.data?.message || 'Transfer failed');
    } finally {
      setSubmitting(false);
    }
  }

  const accountsById = useMemo(
    () => Object.fromEntries(accounts.map((account) => [account.id, account])),
    [accounts]
  );

  return (
    <div className="page">
      <h2>Transfer Money</h2>
      <p className="muted">Transfer money between accounts and immediately review the latest transaction history.</p>

      {error ? <div className="alert error">{error}</div> : null}
      {loading ? <div className="muted">Loading…</div> : null}

      {!loading && !canTransfer ? (
        <div className="alert warn">Create at least 2 accounts to make a transfer.</div>
      ) : null}

      {!loading && canTransfer ? (
        <TransferForm accounts={accounts} onSubmit={onTransfer} loading={submitting} />
      ) : null}

      {result ? (
        <div className="stack">
          <div className="card">
            <div className="title">Transfer complete</div>
            <div className="muted">
              From: <b>{result.fromAccount.name}</b> → ₹{Number(result.fromAccount.balance).toLocaleString()}
            </div>
            <div className="muted">
              To: <b>{result.toAccount.name}</b> → ₹{Number(result.toAccount.balance).toLocaleString()}
            </div>
          </div>
          <div className="card">
            <div className="title">Updated transaction list</div>
            <TransactionList transactions={recentTransactions} accountsById={accountsById} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
