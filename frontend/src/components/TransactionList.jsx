export default function TransactionList({ transactions, accountsById }) {
  if (!transactions.length) {
    return <div className="muted">No transactions yet.</div>;
  }

  return (
    <div className="stack">
      {transactions.map((t) => {
        const fromName = accountsById?.[t.fromAccount]?.name || t.fromAccount;
        const toName = accountsById?.[t.toAccount]?.name || t.toAccount;
        return (
          <div className="card" key={t.id}>
            <div className="cardRow">
              <div>
                <div className="title">
                  {fromName} → {toName}
                </div>
                <div className="muted">
                  {new Date(t.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="amount">
                ₹{Number(t.amount).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

