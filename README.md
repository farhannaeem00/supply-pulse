<div align="center">

<!-- BANNER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=SupplyPulse&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Real-Time%20Supply%20Chain%20Risk%20Intelligence%20Dashboard&descAlignY=58&descSize=18" width="100%"/>

<!-- STATUS BADGES -->
<p align="center">
  <img src="https://img.shields.io/badge/Status-Live%20%F0%9F%9F%A2-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PRs-Welcome-orange?style=for-the-badge" />
</p>

<!-- TECH BADGES -->
<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-4.18-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-4.6-010101?style=for-the-badge&logo=socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/Leaflet.js-Map-199900?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/NewsAPI-Live-FF6B35?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

<!-- ACTION LINKS -->
<p align="center">
  <a href="https://github.com/farhannaeem00/supplypulse" target="_blank">
    <img src="https://img.shields.io/badge/%E2%AD%90%20Star-this%20repo-FFD700?style=for-the-badge" />
  </a>
  <a href="https://github.com/farhannaeem00/supplypulse/issues" target="_blank">
    <img src="https://img.shields.io/badge/%F0%9F%90%9B%20Report-Bug-red?style=for-the-badge" />
  </a>
</p>

<br/>

> ### 🌍 *"Add your suppliers. We watch the world. Get alerts before disruptions cost you."*

<br/>

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Key Features](#-key-features)
- [Risk Level System](#-risk-level-system)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 🔍 Overview

**SupplyPulse** is a full-stack real-time supply chain risk intelligence platform built with the **MERN stack** and powered by **NewsAPI + Socket.io**. It enables businesses to monitor their global suppliers on an interactive world map, receive live risk score updates every 15 minutes, and get instant alerts when news events threaten their supply chain.

This is not a basic CRUD project. SupplyPulse is architected as a **production-grade intelligence platform** with JWT authentication, real-time WebSocket connections, scheduled background jobs, live news aggregation, automated risk scoring, and an interactive world map — all deployed at zero cost.

---

## 🔴 The Problem

<table>
<tr>
<td width="50%">

**The Supply Chain Blindspot:**
- 🌍 **$50 billion** lost annually to supply chain disruptions
- 😱 Companies have **zero early warning** systems
- 🕒 Average detection time: **3–7 days** after disruption
- 💸 A single disruption costs SMBs **$50,000–$500,000**
- 🌊 Floods, strikes, and wars hit businesses completely blindly

</td>
<td width="50%">

**Real Events That Destroy Supply Chains:**
- Factory fire in China → electronics shortage
- Port strike in Germany → delayed shipments
- Flood in Bangladesh → textile disruption
- Earthquake in Japan → automotive parts crisis
- Sanctions on Russia → energy supply collapse

</td>
</tr>
</table>

---

## 💡 The Solution

SupplyPulse bridges the **supply chain intelligence gap** by combining:

```
🗺️ World Map  +  📰 Live News  +  🤖 Risk Scoring  +  ⚡ Real-Time Alerts
```

> Add Suppliers → Monitor World → Score Risks → Alert You → Act Fast

In under **2 minutes**, businesses can monitor their entire global supplier network and start receiving real-time risk intelligence — for free.

---

## ✨ Key Features

<table>
<tr>
<td>

### 🗺️ Interactive World Map
- Live Leaflet.js world map
- Color-coded supplier pins
- Click pins for supplier details
- Real-time pin color changes via Socket.io

</td>
<td>

### 📊 Live Risk Scoring
- 0–100 risk score per supplier
- Auto-refreshes every 15 minutes
- Weighted news-based algorithm
- 5 levels: Secure / Low / Medium / High / Critical

</td>
</tr>
<tr>
<td>

### 📰 News Intelligence
- Real-time news from NewsAPI
- Filtered by supplier location + keywords
- Severity classification system
- Risk events stored per supplier

</td>
<td>

### ⚡ Real-Time WebSockets
- Socket.io live dashboard updates
- No page refresh needed
- Instant alerts on score spikes
- Auto-sync across all connected clients

</td>
</tr>
<tr>
<td>

### ⏰ Auto-Scheduler
- node-cron runs every 15 minutes
- Scores all suppliers automatically
- Runs 24/7 in background
- No manual refresh needed

</td>
<td>

### 🔐 Secure Authentication
- JWT-based auth (7-day expiry)
- bcrypt password hashing (12 rounds)
- Protected API + frontend routes
- Auto token expiry handling

</td>
</tr>
<tr>
<td>

### 📈 Supplier Detail View
- Risk score history chart (Recharts)
- All news events listed by severity
- Supplier metadata (country, city, category)
- One-click score refresh

</td>
<td>

### 🛡️ Security Middleware
- Helmet.js security headers
- Express rate limiting
- CORS protection
- Input sanitization

</td>
</tr>
</table>

---

## 🎨 Risk Level System

| Score | Level | Map Pin | Badge Color | Meaning |
|---|---|---|---|---|
| 80–100 | **Secure** | 🟢 Green | `bg-green-500` | No significant risks detected |
| 60–79 | **Low** | 🔵 Blue | `bg-blue-500` | Minor news events nearby |
| 40–59 | **Medium** | 🟡 Yellow | `bg-yellow-500` | Moderate disruption risk |
| 20–39 | **High** | 🟠 Orange | `bg-orange-500` | Serious disruption risk |
| 0–19 | **Critical** | 🔴 Red | `bg-red-500` | Immediate action needed |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=flat) React | 18.x | UI framework |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat) Vite | 5.x | Build tool & dev server |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white&style=flat) TailwindCSS | 4.x | Utility-first styling |
| Leaflet.js + React-Leaflet | Latest | Interactive world map |
| Recharts | Latest | Risk history charts |
| Socket.io Client | 4.6 | Real-time WebSocket |
| React Router | 6.x | Client-side routing |
| Axios | Latest | HTTP client + interceptors |
| Lucide React | Latest | Icon library |
| React Hot Toast | Latest | Toast notifications |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat) Node.js | 20.x | Runtime environment |
| ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=flat) Express.js | 4.18 | REST API framework |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=flat) MongoDB + Mongoose | Atlas | Database + ODM |
| Socket.io | 4.6 | WebSocket server |
| node-cron | 3.x | Background task scheduler |
| Axios | Latest | NewsAPI HTTP client |
| JWT + bcryptjs | Latest | Auth + password hashing |
| Helmet | Latest | Security headers |
| express-rate-limit | Latest | API rate limiting |

### Infrastructure
| Service | Purpose | Cost |
|---|---|---|
| ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white&style=flat) Vercel | Frontend + Backend hosting | **Free** |
| ![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?logo=mongodb&logoColor=white&style=flat) MongoDB Atlas | Cloud database (M0) | **Free** |
| NewsAPI | Live global news data | **Free (100 req/day)** |
| OpenStreetMap | Map tiles (Leaflet) | **Free** |

> 💡 **Total infrastructure cost: $0/month**

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
│                                                                 │
│   React + Vite + TailwindCSS + Leaflet.js + Recharts           │
│   Landing → Register/Login → Dashboard (Map) → Supplier Detail │
└──────────────┬──────────────────────────┬───────────────────────┘
               │ HTTPS / REST API          │ WebSocket (Socket.io)
               │ JWT Bearer Token          │ Real-time events
┌──────────────▼──────────────────────────▼───────────────────────┐
│              NODE.JS + EXPRESS + SOCKET.IO SERVER               │
│                                                                 │
│  ┌──────────────┐  ┌─────────────────┐  ┌──────────────────┐   │
│  │  /api/auth   │  │  /api/suppliers  │  │  Socket.io       │   │
│  │  register    │  │  POST /          │  │  supplier:added  │   │
│  │  login       │  │  GET /           │  │  riskUpdated     │   │
│  │  me          │  │  GET /:id        │  │  risk:alert      │   │
│  └──────────────┘  │  PUT /:id        │  └──────────────────┘   │
│                    │  DELETE /:id     │                          │
│                    │  POST /refresh   │                          │
│                    └────────┬─────────┘                          │
│  ┌─────────────────────────▼──────────────────────────────────┐  │
│  │                    SERVICE LAYER                           │  │
│  │                                                            │  │
│  │  newsService.js  →  riskScorer.js  →  alertService.js     │  │
│  │  NewsAPI fetch       Score calc        node-cron (15min)   │  │
│  │  Severity tagging    Risk level        Socket.io alerts     │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Mongoose ODM
┌──────────────────────────▼──────────────────────────────────────┐
│                   MongoDB Atlas (M0 Free)                       │
│                                                                 │
│   users              suppliers              riskEvents          │
│   ├── _id            ├── _id                ├── _id             │
│   ├── name           ├── userId (ref)        ├── supplierId     │
│   ├── email          ├── name                ├── userId         │
│   └── password       ├── country / city      ├── title          │
│                      ├── lat / lng           ├── description    │
│                      ├── category            ├── severity       │
│                      ├── riskScore           ├── source         │
│                      ├── riskLevel           ├── url            │
│                      ├── status              └── createdAt      │
│                      └── lastUpdated                            │
└─────────────────────────────────────────────────────────────────┘
```

### Real-Time Event Flow

```
User adds supplier
        ↓
MongoDB saves (riskScore: 50, status: active)
        ↓
202 response sent instantly to frontend
        ↓
Background scorer fires immediately
        ↓
NewsAPI fetches news for supplier location
        ↓
Risk score calculated from article severity
        ↓
MongoDB updated (new riskScore + riskLevel)
        ↓
Risk events saved to riskEvents collection
        ↓
Socket.io emits → all connected clients ⚡
        ↓
Map pin color changes LIVE on dashboard
        ↓
────────────────────────────────────────
Every 15 minutes → auto repeat 🔄
node-cron rescores all suppliers silently
```

---

## 📁 Project Structure

```
supplypulse/
│
├── 📁 client/                           # React Frontend (Vite)
│   ├── 📁 public/
│   │   └── favicon.svg
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── Map.jsx                  # Leaflet world map component
│   │   │   ├── SupplierCard.jsx         # Supplier list item
│   │   │   ├── RiskBadge.jsx            # Risk level badge
│   │   │   ├── NewsCard.jsx             # News event card
│   │   │   └── SkeletonCard.jsx         # Loading skeleton
│   │   ├── 📁 context/
│   │   │   └── AuthContext.jsx          # Global auth state management
│   │   ├── 📁 hooks/
│   │   │   └── usePageTitle.js          # Dynamic browser tab titles
│   │   ├── 📁 pages/
│   │   │   ├── Landing.jsx              # Marketing landing page
│   │   │   ├── Login.jsx                # Sign in page
│   │   │   ├── Register.jsx             # Sign up page
│   │   │   ├── Dashboard.jsx            # Map + supplier list + alerts
│   │   │   ├── Supplier.jsx             # Supplier detail + chart
│   │   │   └── NotFound.jsx             # 404 page
│   │   ├── 📁 utils/
│   │   │   └── api.js                   # Axios instance + interceptors
│   │   ├── App.jsx                      # Router + protected routes
│   │   ├── main.jsx                     # React entry point
│   │   └── index.css                    # Tailwind v4 imports
│   ├── .env
│   ├── vite.config.js
│   └── package.json
│
├── 📁 server/                           # Node.js Backend
│   ├── 📁 config/
│   │   └── db.js                        # MongoDB connection
│   ├── 📁 controllers/
│   │   ├── authController.js            # Register, login, getMe
│   │   └── supplierController.js        # Supplier CRUD + refresh
│   ├── 📁 middleware/
│   │   ├── auth.js                      # JWT verification guard
│   │   ├── rateLimiter.js               # API rate limiting
│   │   └── errorHandler.js              # Global error handler
│   ├── 📁 models/
│   │   ├── User.js                      # User schema + bcrypt
│   │   ├── Supplier.js                  # Supplier schema
│   │   └── RiskEvent.js                 # Risk event schema
│   ├── 📁 routes/
│   │   ├── auth.js                      # Auth API routes
│   │   └── suppliers.js                 # Supplier API routes
│   ├── 📁 services/
│   │   ├── newsService.js               # NewsAPI integration
│   │   ├── riskScorer.js                # Risk calculation engine
│   │   └── alertService.js              # node-cron + Socket alerts
│   ├── .env
│   ├── index.js                         # Express + Socket.io entry
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

```bash
node --version    # v20.x or higher
npm --version     # v9.x or higher
git --version     # any recent version
```

Free accounts needed:
- [MongoDB Atlas](https://mongodb.com/atlas) — cloud database
- [NewsAPI](https://newsapi.org) — free 100 requests/day

---

### 1. Clone the Repository

```bash
git clone https://github.com/farhannaeem00/supplypulse.git
cd supplypulse
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/supplypulse
JWT_SECRET=supplypulse_super_secret_key_2024
NEWS_API_KEY=your_newsapi_key_here
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm start
```

✅ Expected output:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on http://localhost:5000
⏰ Risk score scheduler started
```

---

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

✅ Expected output:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

---

### 4. Open in Browser

```
http://localhost:5173
```

🎉 **SupplyPulse is now running locally!**

---

### 5. Add Your First Supplier

1. Register → Login → Dashboard
2. Click **"Add Supplier"**
3. Enter supplier details + coordinates
4. Find coordinates at [latlong.net](https://www.latlong.net)
5. Watch the map pin appear and score update in real-time!

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login + get JWT | ❌ |
| `GET` | `/api/auth/me` | Get current user | ✅ |

**Register Request:**
```json
{
  "name":     "John Doe",
  "email":    "john@example.com",
  "password": "securepassword"
}
```

**Register Response:**
```json
{
  "success": true,
  "token":   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id":    "64f3b2c1...",
    "name":  "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Suppliers

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/suppliers` | Add new supplier | ✅ |
| `GET` | `/api/suppliers` | Get all suppliers | ✅ |
| `GET` | `/api/suppliers/:id` | Get supplier + events | ✅ |
| `PUT` | `/api/suppliers/:id` | Update supplier | ✅ |
| `DELETE` | `/api/suppliers/:id` | Delete supplier | ✅ |
| `GET` | `/api/suppliers/:id/news` | Get news events | ✅ |
| `POST` | `/api/suppliers/refresh` | Refresh all scores | ✅ |

**Add Supplier Request:**
```json
{
  "name":     "Samsung Electronics",
  "country":  "South Korea",
  "city":     "Seoul",
  "lat":      37.5665,
  "lng":      126.9780,
  "category": "Electronics"
}
```

**Supplier Response:**
```json
{
  "success": true,
  "data": {
    "_id":         "64f3b2c1...",
    "name":        "Samsung Electronics",
    "country":     "South Korea",
    "city":        "Seoul",
    "riskScore":   72,
    "riskLevel":   "medium",
    "status":      "at-risk",
    "lastUpdated": "2025-01-15T10:30:00Z",
    "events": [...]
  }
}
```

---

### Socket.io Events

| Event | Direction | Description | Payload |
|---|---|---|---|
| `supplier:added` | Server → Client | New supplier added | Supplier object |
| `supplier:updated` | Server → Client | Supplier data changed | Updated supplier |
| `supplier:deleted` | Server → Client | Supplier removed | `{ id }` |
| `supplier:riskUpdated` | Server → Client | Score updated | `{ supplierId, riskScore, riskLevel, status }` |
| `risk:alert` | Server → Client | Score spike detected | Alert object with message |

---

## 📸 Screenshots

### 🏠 Landing Page
> Dark professional marketing page with feature highlights

![Landing](https://via.placeholder.com/900x500/052e16/10b981?text=SupplyPulse+%7C+Landing+Page)

---

### 🗺️ Dashboard — Live World Map
> Interactive Leaflet map with color-coded supplier pins

![Dashboard](https://via.placeholder.com/900x500/052e16/10b981?text=Live+World+Map+%7C+Supplier+Risk+Pins)

---

### ➕ Add Supplier Modal
> Clean modal to add suppliers with coordinates

![Add](https://via.placeholder.com/900x500/052e16/10b981?text=Add+Supplier+Modal)

---

### 📊 Supplier Detail Page
> Risk score ring + history chart + news events

![Supplier](https://via.placeholder.com/900x500/7f1d1d/ef4444?text=Supplier+Detail+%7C+Score+72%2F100+%7C+Medium+Risk)

---

## 🛣️ Future Roadmap

```
v1.1 — Short Term
├── [ ] Email alerts when risk score spikes significantly
├── [ ] WhatsApp notifications via CallMeBot (free)
├── [ ] CSV bulk import for suppliers
├── [ ] Real risk score history stored in database
├── [ ] Supplier search + filter on dashboard
└── [ ] Sort suppliers by risk score / name / country

v1.2 — Medium Term
├── [ ] AI-powered risk prediction (ML model)
├── [ ] Supplier comparison side-by-side view
├── [ ] Alternative supplier suggestions
├── [ ] Multi-language support (Arabic, Urdu, French)
├── [ ] Mobile responsive improvements
└── [ ] Dark/light theme toggle

v2.0 — Long Term
├── [ ] Stripe integration (SaaS freemium model)
├── [ ] Team workspace (multiple users per company)
├── [ ] ERP integrations (Shopify, SAP, Oracle)
├── [ ] Custom risk keyword rules engine
├── [ ] Satellite imagery integration
├── [ ] AI chatbot for supply chain Q&A
└── [ ] Enterprise on-premise deployment option
```

---

## 🤝 Contributing

Contributions make open source amazing. Any contributions are **greatly appreciated**.

### How to Contribute

1. **Fork** the repository
2. **Create** your feature branch:
```bash
git checkout -b feature/AmazingFeature
```
3. **Commit** your changes:
```bash
git commit -m "Add: AmazingFeature that does X"
```
4. **Push** to the branch:
```bash
git push origin feature/AmazingFeature
```
5. **Open** a Pull Request

### Commit Convention

```
Add:      New feature
Fix:      Bug fix
Update:   Improvement to existing feature
Refactor: Code restructuring
Docs:     Documentation update
Style:    UI/styling changes
```

---

## 👨‍💻 Author

<div align="center">

<img src="https://github.com/farhannaeem00.png" width="100" style="border-radius:50%"/>

### Farhan Naeem

**BS Computer Science Student**
Full Stack Developer | AI Enthusiast | Problem Solver

[![GitHub](https://img.shields.io/badge/GitHub-farhannaeem00-181717?style=for-the-badge&logo=github)](https://github.com/farhannaeem00)

</div>

---

## 📄 License

```
MIT License

Copyright (c) 2025 Farhan Naeem

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>

**⭐ Star this repo if it helped you!**

Made with ❤️ and 🌍 by [Farhan Naeem](https://github.com/farhannaeem00)

</div>
