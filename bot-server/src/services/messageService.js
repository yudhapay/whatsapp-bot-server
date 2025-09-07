import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';
import { logger } from '../utils/logger.js';

// Load environment variables
dotenv.config();

class MessageService {
  constructor() {
    this.apiUrl = process.env.WHATSAPP_API_URL;
    this.username = process.env.WHATSAPP_USERNAME;
    this.password = process.env.WHATSAPP_PASSWORD;
    this.webhookToken = process.env.WHATSAPP_WEBHOOK_TOKEN;
  }

  /**
   * Kirim pesan teks ke WhatsApp menggunakan GOWA API
   */
  async sendText(to, message) {
    try {
      const url = `${this.apiUrl}/send/message`;
      
      logger.info(`API URL: ${this.apiUrl}`);
      logger.info(`Full URL: ${url}`);
      
      const payload = {
        phone: to,
        message: message
      };

      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`
        }
      });

      logger.info(`Text message sent to ${to}:`, response.data);
      return response.data;
    } catch (error) {
      logger.error('Error sending text message:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Kirim dokumen ke WhatsApp menggunakan GOWA API
   */
  async sendDocument(to, documentBuffer, filename) {
    try {
      const url = `${this.apiUrl}/send/file`;
      
      // Convert buffer to base64
      const base64Data = documentBuffer.toString('base64');
      
      const payload = {
        phone: to,
        file: base64Data,
        filename: filename,
        caption: `📄 Dokumen ${filename} telah dibuat sesuai permintaan Anda.`
      };

      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`
        }
      });

      logger.info(`Document sent to ${to}:`, response.data);
      return response.data;
    } catch (error) {
      logger.error('Error sending document:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Kirim pesan dengan template (untuk notifikasi)
   */
  async sendTemplate(to, templateName, parameters = []) {
    try {
      const url = `${this.apiUrl}/v1/messages`;
      
      const payload = {
        messaging_product: 'whatsapp',
        to: to,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: 'id'
          },
          components: parameters.length > 0 ? [{
            type: 'body',
            parameters: parameters.map(param => ({
              type: 'text',
              text: param
            }))
          }] : []
        }
      };

      const response = await axios.post(url, payload, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      logger.info(`Template message sent to ${to}:`, response.data);
      return response.data;
    } catch (error) {
      logger.error('Error sending template message:', error.response?.data || error.message);
      throw error;
    }
  }
}

export const messageService = new MessageService();
