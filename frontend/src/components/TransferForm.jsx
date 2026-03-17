import { useMemo, useState } from 'react';

export default function TransferForm({ accounts, onSubmit, loading }) {
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');

  const canSubmit = useMemo(() => {
    const n = Number(amount);
    return (
      fromAccountId &&
      toAccountId &&
      fromAccountId !== toAccountId &&
      Number.isFinite(n) &&
      n > 0 &&
      !loading
    );
  }, [fromAccountId, toAccountId, amount, loading]);

  return (
    <form
      className="card"
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        onSubmit({ fromAccountId, toAccountId, amount: Number(amount) });
      }}
    >
      <div className="grid2">
        <label className="field">
          <span className="label">From account</span>
          <select value={fromAccountId} onChange={(e) => setFromAccountId(e.target.value)}>
            <option value="">Select</option>
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} (₹{Number(a.balance).toLocaleString()})
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="label">To account</span>
          <select value={toAccountId} onChange={(e) => setToAccountId(e.target.value)}>
            <option value="">Select</option>
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} (₹{Number(a.balance).toLocaleString()})
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="label">Amount</span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            inputMode="decimal"
            placeholder="200"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>

      <div className="cardActions">
        <button className="btn primary" type="submit" disabled={!canSubmit}>
          {loading ? 'Transferring…' : 'Transfer'}
        </button>
      </div>
    </form>
  );
}

