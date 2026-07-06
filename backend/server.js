/**
 * DAKHILAA - Backend Server
 * JEE Diagnostic Platform
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from the monorepo root first,
// then fall back to the backend folder for compatibility.
const rootEnvPath = path.resolve(__dirname, '..', '.env');
const backendEnvPath = path.resolve(__dirname, '.env');
dotenv.config({ path: rootEnvPath });
dotenv.config({ path: backendEnvPath });

// Database connection
const { connectDB } = require('./config/db');
connectDB();

function createApp() {
  const app = express();

  // ─── Middleware ────────────────────────────────────────────────────────────
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: process.env.CLIENT_URL || '*',
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // ─── Routes ─────────────────────────────────────────────────────────────
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/leads', require('./routes/lead'));
  app.use('/api/diagnostic', require('./routes/diagnostic'));
  app.use('/api/payment', require('./routes/payment'));
  app.use('/api/user', require('./routes/user'));

  // ─── Health Check ───────────────────────────────────────────────────────
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Dakhilaa API',
      timestamp: new Date().toISOString(),
    });
  });

  // ─── 404 Handler ───────────────────────────────────────────────────────
  app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
  });

  // ─── Global Error Handler ───────────────────────────────────────────────
  app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    res.status(err.status || 500).json({
      error: 'Something went wrong',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    });
  });

  return app;
}

const app = createApp();

function startServer(port = Number(process.env.PORT) || 5000) {
  return new Promise((resolve, reject) => {
    const tryListen = (currentPort, attempts = 0) => {
      const server = app.listen(currentPort);

      server.once('listening', () => {
        const address = server.address();
        const actualPort = typeof address === 'string' ? address : address?.port || currentPort;
        console.log(`✅ Dakhilaa server running on port ${actualPort}`);
        console.log(`📍 API base: http://localhost:${actualPort}/api`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
        resolve(server);
      });

      server.once('error', (error) => {
        if (error.code === 'EADDRINUSE' && currentPort !== 0 && attempts < 10) {
          const nextPort = currentPort + 1;
          tryListen(nextPort, attempts + 1);
          return;
        }

        reject(error);
      });
    };

    tryListen(port);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  });
}

module.exports = { app, createApp, startServer };
