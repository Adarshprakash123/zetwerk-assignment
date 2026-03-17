import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TransactionList from '../components/TransactionList';
import { getAccount, getAccounts, getTransactions } from '../services/api';

export default function TransactionsPage() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [accountsById, setAccountsById] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setError('');
      setLoading(true);
      try {
        const [acct, txs, accounts] = await Promise.all([getAccount(id), getTransactions(id), getAccounts()]);
        setAccount(acct);
        setTransactions(txs);
        setAccountsById(Object.fromEntries(accounts.map((a) => [a.id, a])));
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load transactions');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const subtitle = useMemo(() => {
    if (!account) return '';
    return `Balance ₹${Number(account.balance).toLocaleString()}`;
  }, [account]);

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2>Transaction History</h2>
          {account ? (
            <p className="muted">
              <b>{account.name}</b> · {subtitle}
            </p>
          ) : (
            <p className="muted">Account: {id}</p>
          )}
        </div>
        <Link className="btn" to="/accounts">
          Back to accounts
        </Link>
      </div>

      {error ? <div className="alert error">{error}</div> : null}
      {loading ? <div className="muted">Loading…</div> : null}

      {!loading && !error ? (
        <TransactionList transactions={transactions} accountsById={accountsById} />
      ) : null}
    </div>
  );
}

