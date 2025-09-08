import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import webhookRoutes from './routes/webhook.js';
import { logger } from './utils/logger.js';
import { templateService } from './services/templateService.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Validate required environment variables
const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'WHATSAPP_API_URL',
  'WHATSAPP_USERNAME',
  'WHATSAPP_PASSWORD',
  'WHATSAPP_WEBHOOK_TOKEN'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  logger.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize template service with Supabase client
templateService.setSupabaseClient(supabase);

// Log startup information
logger.info('Starting WhatsApp Bot Server...');
logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
logger.info(`Port: ${PORT}`);
logger.info(`Supabase URL: ${supabaseUrl ? 'Configured' : 'Missing'}`);
logger.info(`WhatsApp API URL: ${process.env.WHATSAPP_API_URL ? 'Configured' : 'Missing'}`);

// Middleware
// app.use(helmet()); // Disabled for debugging
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Make supabase available to routes
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// Routes
app.use('/webhook', webhookRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'WhatsApp Bot Server'
  });
});

// Test endpoint for debugging
app.post('/test', (req, res) => {
  logger.info('Test endpoint called');
  logger.info('Request body:', req.body);
  res.json({ 
    status: 'success', 
    message: 'Test endpoint working',
    body: req.body
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 WhatsApp Bot Server running on port ${PORT}`);
  logger.info(`📱 Webhook endpoint: http://localhost:${PORT}/webhook`);
  logger.info(`🏥 Health check: http://localhost:${PORT}/health`);
});

export default app;

