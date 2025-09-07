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
   * PRODUCTION VERSION - No development mode check
   */
  async sendText(to, message) {
    try {
      const url = `${this.apiUrl}/send/message`;
      
      logger.info(`Sending text to ${to}: ${message.substring(0, 50)}...`);
      
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
   * PRODUCTION VERSION - No development mode check
   */
  async sendDocument(to, documentBuffer, filename) {
    try {
      const url = `${this.apiUrl}/send/file`;
      
      logger.info(`Sending document to ${to}: ${filename} (${documentBuffer.length} bytes)`);
      
      // Create FormData for multipart/form-data
      const formData = new FormData();
      formData.append('phone', to);
      formData.append('file', documentBuffer, {
        filename: filename,
        contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
      formData.append('caption', `📄 Dokumen ${filename} telah dibuat sesuai permintaan Anda.`);

      const response = await axios.post(url, formData, {
        headers: {
          ...formData.getHeaders(),
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
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.webhookToken}`
        }
      });

      logger.info(`Template message sent to ${to}:`, response.data);
      return response.data;
    } catch (error) {
      logger.error('Error sending template message:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Kirim pesan status/notifikasi
   */
  async sendStatus(to, status, message) {
    try {
      const statusMessages = {
        processing: '⏳ Sedang memproses dokumen Anda...',
        success: '✅ Dokumen berhasil dibuat!',
        error: '❌ Terjadi kesalahan saat membuat dokumen.',
        not_found: '❌ Template tidak ditemukan.'
      };

      const statusMessage = statusMessages[status] || message;
      return await this.sendText(to, statusMessage);
    } catch (error) {
      logger.error('Error sending status message:', error);
      throw error;
    }
  }

  /**
   * Kirim pesan bantuan
   */
  async sendHelp(to) {
    const helpMessage = `🤖 *WhatsApp Template Bot*

*Cara menggunakan:*
Kirim pesan dengan format:
\`buat [nama_template] untuk [nama] di [lokasi] [tanggal]\`

*Contoh:*
\`buat berita acara untuk Andi di Jakarta 8 September 2024\`

*Template yang tersedia:*
- berita acara
- surat undangan
- surat keterangan
- surat perjanjian
- surat pernyataan

*Fitur:*
✅ Generate dokumen otomatis
✅ Upload template baru via web admin
✅ Support format Word (.docx)

Ketik \`help\` untuk melihat pesan ini lagi.`;

    return await this.sendText(to, helpMessage);
  }
}

export const messageService = new MessageService();
