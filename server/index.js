require('dotenv').config();
require('express-async-errors');

const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const http       = require('http');
const { Server } = require('socket.io');
const connectDB  = require('./config/db');
const authRoutes     = require('./routes/auth');
const supplierRoutes = require('./routes/suppliers');
const { errorHandler }  = require('./middleware/errorHandler');
const { apiLimiter }    = require('./middleware/rateLimiter');
const { startScheduler } = require('./services/alertService');

const app    = express();
const server = http.createServer(app);

// ─── Socket.io Setup ──────────────────────────────────
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      process.env.CLIENT_URL,
    ],
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`⚡ Client connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// Make io accessible in controllers
app.set('io', io);

// ─── Security ─────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
}));

// ─── CORS ─────────────────────────────────────────────
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


// ─── Body Parser ──────────────────────────────────────
app.use(express.json({ limit: '10kb' }));

// ─── Rate Limiting ────────────────────────────────────
app.use('/api', apiLimiter);

// ─── Health Check ─────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '✅ SupplyPulse API is running' });
});

// ─── Routes ───────────────────────────────────────────
app.use('/api/auth',      authRoutes);
app.use('/api/suppliers', supplierRoutes);

// ─── Error Handler ────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);

    // Start auto-refresh scheduler
    startScheduler(io);
  });
});

module.exports = { app, io };