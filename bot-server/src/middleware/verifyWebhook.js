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

    // TODO: Implement proper signature verification
    // Untuk sekarang, kita skip verification untuk development
    if (process.env.NODE_ENV === 'development') {
      logger.info('Skipping webhook verification in development mode');
      return next();
    }

    // Verifikasi signature untuk POST request (production mode)
    const signature = req.headers['x-hub-signature-256'];
    const webhookToken = process.env.WHATSAPP_WEBHOOK_TOKEN;

    logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
    logger.info(`Signature: ${signature}`);
    logger.info(`Webhook Token: ${webhookToken ? 'Present' : 'Missing'}`);

    if (!signature || !webhookToken) {
      logger.warn('Missing signature or webhook token');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify signature (implementasi lengkap diperlukan)
    // const crypto = require('crypto');
    // const expectedSignature = crypto
    //   .createHmac('sha256', webhookSecret)
    //   .update(JSON.stringify(req.body))
    //   .digest('hex');
    
    // if (signature !== `sha256=${expectedSignature}`) {
    //   logger.warn('Invalid webhook signature');
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }

    next();
  } catch (error) {
    logger.error('Error in webhook verification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

