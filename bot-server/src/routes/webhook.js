import express from 'express';
import { verifyWebhook as verifyWebhookController, handleMessage } from '../controllers/webhookController.js';
import { verifyWebhook } from '../middleware/verifyWebhook.js';

const router = express.Router();

// Webhook endpoint untuk menerima pesan dari WhatsApp Go
router.post('/', verifyWebhook, handleMessage);

// Webhook verification endpoint (untuk setup awal)
router.get('/', verifyWebhookController);

export default router;
