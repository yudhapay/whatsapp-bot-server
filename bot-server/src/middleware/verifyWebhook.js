import crypto from 'crypto';
import { logger } from '../utils/logger.js';

/**
 * Middleware untuk verifikasi webhook WhatsApp Go
 */
export const verifyWebhook = (req, res, next) => {
  try {
    // Skip verification untuk GET request (webhook verification)
    if (req.method === 'GET') {
      return next();
    }

    // Skip verification untuk semua request (untuk GOWA API)
    logger.info('Skipping webhook verification - allowing all requests');
    return next();

  } catch (error) {
    logger.error('Error in webhook verification:', error);
    // Allow request to continue even if verification fails
    next();
  }
};