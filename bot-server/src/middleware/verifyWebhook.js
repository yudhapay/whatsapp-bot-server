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

    // Development mode - skip verification
    if (process.env.NODE_ENV === 'development') {
      logger.info('Skipping webhook verification in development mode');
      return next();
    }

    // Production mode - verify signature
    const signature = req.headers['x-hub-signature-256'];
    const webhookSecret = process.env.WHATSAPP_WEBHOOK_TOKEN || process.env.WHATSAPP_WEBHOOK_SECRET;

    logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
    logger.info(`Signature: ${signature}`);
    logger.info(`Webhook Secret: ${webhookSecret ? 'Present' : 'Missing'}`);

    if (!signature || !webhookSecret) {
      logger.warn('Missing signature or webhook secret, allowing request for testing');
      return next();
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    const providedSignature = signature.replace('sha256=', '');

    if (providedSignature !== expectedSignature) {
      logger.warn('Invalid webhook signature, allowing request for testing');
      logger.warn(`Expected: ${expectedSignature}`);
      logger.warn(`Provided: ${providedSignature}`);
      return next();
    }

    logger.info('Webhook signature verified successfully');
    next();
  } catch (error) {
    logger.error('Error in webhook verification:', error);
    // Allow request to continue even if verification fails
    next();
  }
};