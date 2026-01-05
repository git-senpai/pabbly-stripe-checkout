# Boutique - E-commerce Store with Stripe Integration

A full-stack e-commerce application with Stripe payment integration.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Payment**: Stripe Checkout

## Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- Stripe account
- Stripe CLI

## Setup

### 1. Clone and Install

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 2. Environment Variables

Create `backend/.env`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
CLIENT_URL=http://localhost:5173
```

### 3. Get Stripe Webhook Secret

```bash
stripe listen --forward-to localhost:5000/api/payment/webhook
```

Copy the webhook signing secret and add to `.env`.

## Run

Open 3 terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Stripe Webhooks:**
```bash
stripe listen --forward-to localhost:5000/api/payment/webhook
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

## Access

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## Test Payment

Use Stripe test card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC
