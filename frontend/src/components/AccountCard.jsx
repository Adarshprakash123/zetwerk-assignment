export default function AccountCard({ account, onViewTransactions }) {
  return (
    <div className="card">
      <div className="cardRow">
        <div>
          <div className="muted">Account</div>
          <div className="title">{account.name}</div>
          <div className="muted mono">{account.id}</div>
        </div>
        <div className="amount">
          ₹{Number(account.balance).toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </div>
      </div>
      {onViewTransactions ? (
        <div className="cardActions">
          <button className="btn" onClick={() => onViewTransactions(account.id)}>
            View transactions
          </button>
        </div>
      ) : null}
    </div>
  );
}

