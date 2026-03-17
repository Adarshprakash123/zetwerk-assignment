# Banking Money Transfer System

A simple full-stack banking transfer application built for an assessment. It lets users create bank accounts, view balances, transfer money between accounts, and review transaction history.

## Features

- Create bank accounts with an initial balance
- View all accounts and current balances
- Transfer money from one account to another
- Prevent transfers when the sender has insufficient balance
- Store and display transaction history
- Show the updated transaction list immediately after a transfer

## Tech Stack

- Frontend: React + Vite + React Router + Axios
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Language: JavaScript

## Project Structure

```text
banking-transfer-system/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    app.js
    server.js
  frontend/
    src/
      components/
      pages/
      services/
  README.md
```

## Prerequisites

- Node.js 18 or later
- npm
- MongoDB running locally on macOS, Windows, or Linux

## Setup Steps

### 1. Clone or open the project

```bash
cd banking-transfer-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Backend file: `backend/.env`

```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/banking_transfer_system
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
```

Frontend file: `frontend/.env`

```env
VITE_API_URL=http://localhost:5001
```

### 4. Start MongoDB locally

If MongoDB is installed with Homebrew on Mac:

```bash
brew services start mongodb-community
```

If MongoDB is already running, you can skip this step.

### 5. Start the application

Run frontend and backend together:

```bash
npm run dev
```

Or run them separately:

```bash
npm run dev:backend
```

```bash
npm run dev:frontend
```

## Local URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5001`

## How To Use The App

### Create an account

1. Open the app in the browser.
2. Go to `Create account`.
3. Enter a name and initial balance.
4. Click `Create account`.

### View accounts

1. Go to `Accounts`.
2. See all created accounts and their balances.
3. Click `View transactions` for any account to see its history.

### Transfer money

1. Go to `Transfer`.
2. Select the sender account.
3. Select the receiver account.
4. Enter an amount.
5. Click `Transfer`.

After a successful transfer, the page shows:

- updated balances for both accounts
- updated transaction list for the transfer

## Sample Usage / Test Flow

Use this flow to verify the assignment manually:

1. Create `Account A` with balance `1000`
2. Create `Account B` with balance `500`
3. Open `Accounts` and verify both accounts are visible
4. Open `Transfer`
5. Transfer `200` from `Account A` to `Account B`
6. Verify the success section shows:
   - `Account A` balance as `800`
   - `Account B` balance as `700`
7. Verify the updated transaction list appears immediately after transfer
8. Open `Accounts` again and confirm balances are updated
9. Click `View transactions` for either account and verify the same transfer appears in history

## API Endpoints

### Create account

`POST /api/accounts`

Example request:

```json
{
  "name": "Account A",
  "balance": 1000
}
```

### Get all accounts

`GET /api/accounts`

### Get one account

`GET /api/accounts/:id`

### Get account transaction history

`GET /api/accounts/:id/transactions`

### Transfer money

`POST /api/transfer`

Example request:

```json
{
  "fromAccountId": "ACCOUNT_ID_1",
  "toAccountId": "ACCOUNT_ID_2",
  "amount": 200
}
```

Example response:

```json
{
  "transaction": {
    "id": "TRANSACTION_ID",
    "fromAccount": "ACCOUNT_ID_1",
    "toAccount": "ACCOUNT_ID_2",
    "amount": 200,
    "createdAt": "2026-03-17T10:00:00.000Z"
  },
  "fromAccount": {
    "id": "ACCOUNT_ID_1",
    "name": "Account A",
    "balance": 800,
    "createdAt": "2026-03-17T09:00:00.000Z"
  },
  "toAccount": {
    "id": "ACCOUNT_ID_2",
    "name": "Account B",
    "balance": 700,
    "createdAt": "2026-03-17T09:05:00.000Z"
  }
}
```

## Validation Rules

- Account name is required
- Initial balance must be `0` or more
- Transfer amount must be greater than `0`
- Sender and receiver cannot be the same account
- Transfer amount cannot exceed sender balance

## Notes

- This version uses a simple transfer flow suitable for an assessment.
- It does not use MongoDB replica-set transactions.
- If MongoDB is not running, the backend will fail to connect until the database service is started.
