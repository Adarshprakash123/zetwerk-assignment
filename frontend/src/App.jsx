import { Link, NavLink, Route, Routes } from 'react-router-dom';
import AccountsPage from './pages/AccountsPage';
import CreateAccountPage from './pages/CreateAccountPage';
import TransferPage from './pages/TransferPage';
import TransactionsPage from './pages/TransactionsPage';

function App() {
  return (
    <div className="appShell">
      <header className="topbar">
        <Link to="/" className="brand">
          Banking Transfer
        </Link>
        <nav className="nav">
          <NavLink to="/create" className={({ isActive }) => (isActive ? 'active' : '')}>
            Create account
          </NavLink>
          <NavLink to="/accounts" className={({ isActive }) => (isActive ? 'active' : '')}>
            Accounts
          </NavLink>
          <NavLink to="/transfer" className={({ isActive }) => (isActive ? 'active' : '')}>
            Transfer
          </NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<AccountsPage />} />
          <Route path="/create" element={<CreateAccountPage />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/transactions/:id" element={<TransactionsPage />} />
          <Route path="*" element={<div className="muted">Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
