const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const accountRoutes = require('./routes/accountRoutes');
const transferRoutes = require('./routes/transferRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

function createApp() {
  const app = express();
  const normalizeOrigin = (value) => value?.trim().replace(/\/$/, '');
  const allowedOrigins = new Set(
    [
      ...(process.env.CLIENT_ORIGIN || '')
        .split(',')
        .map(normalizeOrigin)
        .filter(Boolean),
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ].map(normalizeOrigin)
  );
  const corsOptions = {
    origin(origin, callback) {
      // Allow tools like curl/Postman that do not send an Origin header.
      if (!origin || allowedOrigins.has(normalizeOrigin(origin))) {
        return callback(null, true);
      }

      return callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204,
  };

  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
  app.use(cors(corsOptions));
  app.options(/.*/, cors(corsOptions));
  app.use(express.json({ limit: '64kb' }));
  app.use(morgan('dev'));

  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      limit: 120,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
    })
  );

  app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

  app.use('/api/accounts', accountRoutes);
  app.use('/api/transfer', transferRoutes);

  app.use(notFound);
  app.use((err, req, res, next) => {
    if (err && err.statusCode && !res.headersSent) {
      res.status(err.statusCode);
    }
    next(err);
  });
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
