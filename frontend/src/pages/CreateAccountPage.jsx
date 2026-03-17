import { useState } from 'react';
import { createAccount } from '../services/api';

export default function CreateAccountPage() {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('1000');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [created, setCreated] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setCreated(null);

    const numericBalance = Number(balance);
    if (!name.trim()) return setError('Name is required');
    if (!Number.isFinite(numericBalance) || numericBalance < 0) return setError('Balance must be >= 0');

    setLoading(true);
    try {
      const account = await createAccount({ name: name.trim(), balance: numericBalance });
      setCreated(account);
      setName('');
      setBalance('1000');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h2>Create Account</h2>
      <p className="muted">Create a new banking account with an initial balance.</p>

      <form className="card" onSubmit={onSubmit}>
        <div className="grid2">
          <label className="field">
            <span className="label">Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Utkarsh" />
          </label>

          <label className="field">
            <span className="label">Initial balance</span>
            <input
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </label>
        </div>

        {error ? <div className="alert error">{error}</div> : null}
        {created ? (
          <div className="alert success">
            Created <b>{created.name}</b> with balance ₹{Number(created.balance).toLocaleString()}.
          </div>
        ) : null}

        <div className="cardActions">
          <button className="btn primary" type="submit" disabled={loading}>
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </div>
      </form>
    </div>
  );
}

