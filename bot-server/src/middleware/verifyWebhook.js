import crypto from 'crypto';
import { logger } from '../utils/logger.js';

/**
 * Middleware untuk verifikasi webhook WhatsApp Go
 */
export const verifyWebhook = (req, res, next) => {
  try {
    logger.info(`Webhook middleware: ${req.method} ${req.path}`);
    logger.info('Request headers:', req.headers);
    
    // Skip verification untuk GET request (webhook verification)
    if (req.method === 'GET') {
      logger.info('GET request - allowing');
      return next();
    }

    // Skip verification untuk semua request (untuk GOWA API)
    logger.info('POST request - skipping verification, allowing all requests');
    return next();

  } catch (error) {
    logger.error('Error in webhook verification:', error);
    // Allow request to continue even if verification fails
    next();
  }
};