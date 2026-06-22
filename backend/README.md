# DAKHILAA Backend

JEE Diagnostic Platform — Node.js + Express + MongoDB + Razorpay

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your actual credentials

# 3. Start development server (requires MongoDB running)
npm run dev

# 4. Start production server
npm start
```

---

## Project Structure

```
dakhilaa-backend/
├── server.js              # Entry point
├── config/
│   ├── db.js              # MongoDB connection
│   └── email.js           # Nodemailer + email templates
├── models/
│   ├── User.js            # User schema (auth, plans, weak topics)
│   ├── Diagnostic.js      # Diagnostic test results
│   ├── Payment.js         # Razorpay payment records
│   └── Lead.js            # Landing page signups
├── middleware/
│   └── auth.js            # JWT auth + paid-plan guard
├── routes/
│   ├── auth.js            # /api/auth/*
│   ├── leads.js           # /api/leads/*
│   ├── diagnostic.js      # /api/diagnostic/*
│   ├── payment.js         # /api/payment/*
│   └── user.js            # /api/user/*
├── utils/
│   └── helpers.js         # Daily question generator, score utils
├── .env.example
└── package.json
```

---

## API Reference

All protected routes require: `Authorization: Bearer <JWT_TOKEN>`

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login and get token |
| GET | `/api/auth/me` | ✅ | Get current user |

**Register body:**
```json
{ "name": "Rahul", "email": "rahul@example.com", "phone": "9876543210", "password": "pass123" }
```

---

### Leads (Landing Page)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/leads/diagnostic-signup` | ❌ | Submit landing page form |
| GET | `/api/leads` | ❌ | List all leads (add admin guard) |
| PATCH | `/api/leads/:id/status` | ❌ | Update lead conversion status |

**Signup body:**
```json
{ "name": "Aryan", "phone": "9876543210", "email": "aryan@email.com", "currentScore": 120, "targetCollege": "IIT Bombay" }
```

---

### Diagnostic

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/diagnostic/save-results` | ✅ | Save test results |
| GET | `/api/diagnostic/results` | ✅ | Get latest result |
| GET | `/api/diagnostic/history` | ✅ | Get all past results |

**Save results body:**
```json
{
  "totalScore": 180,
  "physicsScore": 60,
  "chemistryScore": 55,
  "mathScore": 65,
  "weakTopicsPhysics": ["Electrostatics", "Optics"],
  "weakTopicsChemistry": ["Coordination Compounds"],
  "weakTopicsMath": ["Integration", "Matrices"],
  "timeSpent": 900,
  "questionsAttempted": 75,
  "correctAnswers": 45
}
```

---

### Payment (Razorpay)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/payment/create-order` | ✅ | Create Razorpay order |
| POST | `/api/payment/verify` | ✅ | Verify payment & activate plan |
| GET | `/api/payment/history` | ✅ | User's payment history |

**Create order body:** `{ "planType": "mains" | "advanced" | "bundle" }`

**Plan prices:**
- `mains` → ₹799 (Mains Prep)
- `advanced` → ₹899 (Advanced Prep)
- `bundle` → ₹1099 (Mains + Advanced)

**Verify payment body:**
```json
{
  "razorpayPaymentId": "pay_xxx",
  "razorpayOrderId": "order_xxx",
  "razorpaySignature": "signature_here",
  "planType": "mains"
}
```

---

### User

| Method | Endpoint | Auth | Plan |
|--------|----------|------|------|
| GET | `/api/user/profile` | ✅ | Any |
| PATCH | `/api/user/profile` | ✅ | Any |
| GET | `/api/user/weak-topics` | ✅ | Any |
| GET | `/api/user/college-predictor` | ✅ | Any |
| GET | `/api/user/daily-practice` | ✅ | Paid only |
| POST | `/api/user/daily-practice/submit` | ✅ | Paid only |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for JWT signing (keep long & random) |
| `EMAIL_SERVICE` | Email provider (e.g. `gmail`) |
| `EMAIL_USER` | Sender email address |
| `EMAIL_PASSWORD` | App password (not regular Gmail password) |
| `RAZORPAY_KEY_ID` | Razorpay public key |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key |
| `DIAGNOSTIC_TEST_URL` | Link to diagnostic test page |
| `UPGRADE_URL` | Link to plans/pricing page |
| `DASHBOARD_URL` | Link to user dashboard |
| `CLIENT_URL` | Frontend origin for CORS |

---

## Gmail Setup (App Password)

1. Enable 2-Step Verification on your Google account
2. Go to **Google Account → Security → App Passwords**
3. Generate a password for "Mail"
4. Use that 16-character password as `EMAIL_PASSWORD`

---

## Production Checklist

- [ ] Set a strong random `JWT_SECRET`
- [ ] Use MongoDB Atlas (not localhost)
- [ ] Add admin authentication to `/api/leads` endpoints
- [ ] Implement rate limiting (`express-rate-limit`)
- [ ] Add request logging (`morgan`)
- [ ] Use HTTPS
- [ ] Set `CLIENT_URL` to your actual frontend domain (not `*`)
- [ ] Replace `generateDailyQuestions()` stub with real question bank queries
