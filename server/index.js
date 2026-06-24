require('dotenv').config();

const express  = require('express');
const cors     = require('cors');
const helmet   = require('helmet');
const connectDB = require('./config/db');
const authRoutes     = require('./routes/auth');
const supplierRoutes = require('./routes/suppliers');
const { errorHandler } = require('./middleware/errorHandler');
const { apiLimiter }   = require('./middleware/rateLimiter');

const app = express();

// ── Security ──────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
}));

// ── CORS ──────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.CLIENT_URL,
    'https://supplypulseclient.vercel.app',
  ],
  methods:        ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials:    true,
}));

app.options('*', cors());

// ── Body Parser ───────────────────────────────────────
app.use(express.json({ limit: '10kb' }));

// ── Rate Limiting ─────────────────────────────────────
app.use('/api', apiLimiter);

// ── Health Check ──────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '✅ SupplyPulse API is running' });
});

// ── Routes ────────────────────────────────────────────
app.use('/api/auth',      authRoutes);
app.use('/api/suppliers', supplierRoutes);

// ── Error Handler ─────────────────────────────────────
app.use(errorHandler);

// ── Local Dev Only ────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  const http       = require('http');
  const { Server } = require('socket.io');

  const server = http.createServer(app);
  const io     = new Server(server, {
    cors: {
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST'],
    },
  });

  app.set('io', io);

  io.on('connection', (socket) => {
    console.log(`⚡ Client connected: ${socket.id}`);
    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });

  const PORT = process.env.PORT || 5000;

  connectDB().then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    const { startScheduler } = require('./services/alertService');
    startScheduler(io);
  });

} else {
  // ── Production (Vercel) ──────────────────────────────
  connectDB();
}

// ── MUST export app for Vercel ────────────────────────
module.exports = app;