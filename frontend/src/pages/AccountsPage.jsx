import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCard from '../components/AccountCard';
import { getAccounts } from '../services/api';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function load() {
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
    load();
  }, []);

  const total = useMemo(() => accounts.reduce((sum, a) => sum + Number(a.balance || 0), 0), [accounts]);

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2>Accounts</h2>
          <p className="muted">
            Total across all accounts: <b>₹{total.toLocaleString()}</b>
          </p>
        </div>
        <button className="btn" onClick={load} disabled={loading}>
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      {error ? <div className="alert error">{error}</div> : null}
      {loading ? <div className="muted">Loading…</div> : null}

      <div className="stack">
        {accounts.map((a) => (
          <AccountCard key={a.id} account={a} onViewTransactions={(id) => navigate(`/transactions/${id}`)} />
        ))}
      </div>
    </div>
  );
}

