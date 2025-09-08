import { logger } from '../utils/logger.js';
import { messageService } from '../services/messageService.js';
import { templateService } from '../services/templateService.js';
import { aiService } from '../services/aiService.js';

/**
 * Verifikasi webhook untuk GOWA API
 */
export const verifyWebhook = (req, res) => {
  // GOWA API menggunakan format yang berbeda
  // Untuk sekarang, kita akan accept semua request untuk testing
  logger.info('Webhook verification request received');
  res.status(200).json({ 
    status: 'success', 
    message: 'Webhook verified',
    timestamp: new Date().toISOString()
  });
};

/**
 * Handle pesan masuk dari GOWA API
 */
export const handleMessage = async (req, res) => {
  try {
    const body = req.body;
    logger.info('Received GOWA webhook:', JSON.stringify(body, null, 2));
    logger.info('Request headers:', req.headers);

    // GOWA API menggunakan format yang berbeda
    // Cek apakah ada pesan masuk
    if (body.type === 'message' && body.message) {
      await processMessage(body.message, body);
    } else if (body.messages && Array.isArray(body.messages)) {
      // Handle multiple messages
      for (const message of body.messages) {
        await processMessage(message, body);
      }
    } else {
      logger.info('No message data found in webhook');
    }

    res.status(200).json({ status: 'success' });
  } catch (error) {
    logger.error('Error handling webhook:', error);
    logger.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Proses pesan individual untuk GOWA API
 */
const processMessage = async (message, value) => {
  try {
    const from = message.from || message.jid;
    const messageType = message.type || 'text';
    const messageId = message.id;
    
    logger.info(`Processing GOWA message from ${from}, type: ${messageType}`);

    // Handle text messages
    if (messageType === 'text' || messageType === 'message') {
      const textBody = message.text || message.message || message.body;
      logger.info(`Text message: ${textBody}`);

      // Parse pesan dengan AI untuk ekstrak informasi template
      const aiParseResult = await aiService.parseMessage(textBody);
      
      if (aiParseResult.success && aiParseResult.data) {
        const { data } = aiParseResult;
        
        // Ambil template dari Supabase
        const template = await templateService.getTemplate(data.template);
        
        if (template) {
          // Generate dokumen dengan data yang diisi
          const generatedDoc = await templateService.generateDocument(template, {
            nama: data.name,
            lokasi: data.location,
            tanggal: data.date
          });
          
          // Kirim dokumen ke user
          await messageService.sendDocument(from, generatedDoc, `${data.template}.docx`);
        } else {
          // Template tidak ditemukan
          await messageService.sendText(from, `Template "${data.template}" tidak ditemukan. Silakan coba template yang tersedia.`);
        }
      } else {
        // Fallback ke parsing manual
        const templateInfo = parseTemplateMessage(textBody);
        
        if (templateInfo) {
          // Ambil template dari Supabase
          const template = await templateService.getTemplate(templateInfo.templateName);
          
          if (template) {
            // Generate dokumen dengan data yang diisi
            const generatedDoc = await templateService.generateDocument(template, templateInfo.data);
            
            // Kirim dokumen ke user
            await messageService.sendDocument(from, generatedDoc, templateInfo.templateName);
          } else {
            // Template tidak ditemukan
            await messageService.sendText(from, `Template "${templateInfo.templateName}" tidak ditemukan. Silakan coba template yang tersedia.`);
          }
        } else {
          // Pesan tidak sesuai format, kirim bantuan
          await messageService.sendText(from, getHelpMessage());
        }
      }
    }
    // Handle document messages (jika user mengirim dokumen)
    else if (messageType === 'document') {
      await messageService.sendText(from, 'Terima kasih! Untuk saat ini, bot hanya bisa mengirim dokumen, bukan menerima. Gunakan format: "buat [nama_template] untuk [nama] di [lokasi] [tanggal]"');
    }
    // Handle other message types
    else {
      await messageService.sendText(from, 'Bot hanya mendukung pesan teks. Gunakan format: "buat [nama_template] untuk [nama] di [lokasi] [tanggal]"');
    }

  } catch (error) {
    logger.error('Error processing message:', error);
    
    // Kirim pesan error ke user
    try {
      const from = message.from || message.jid;
      await messageService.sendText(from, 'Maaf, terjadi kesalahan saat memproses pesan Anda. Silakan coba lagi.');
    } catch (sendError) {
      logger.error('Error sending error message:', sendError);
    }
  }
};

/**
 * Parse pesan user untuk ekstrak informasi template
 * Format: "buat [nama_template] untuk [nama] di [lokasi] [tanggal]"
 */
const parseTemplateMessage = (text) => {
  const lowerText = text.toLowerCase();
  
  // Pattern untuk parsing pesan
  const patterns = [
    /buat\s+(\w+)\s+untuk\s+([^di]+)\s+di\s+([^0-9]+)\s+([0-9\s\w]+)/i,
    /buat\s+(\w+)\s+untuk\s+([^di]+)\s+di\s+([^0-9]+)\s+([0-9\s\w]+)/i
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return {
        templateName: match[1].toLowerCase(),
        data: {
          nama: match[2].trim(),
          lokasi: match[3].trim(),
          tanggal: match[4].trim()
        }
      };
    }
  }

  return null;
};

/**
 * Pesan bantuan untuk user
 */
const getHelpMessage = () => {
  return `🤖 *WhatsApp Template Bot*

*Cara menggunakan:*
Kirim pesan dengan format:
\`buat [nama_template] untuk [nama] di [lokasi] [tanggal]\`

*Contoh:*
\`buat surat undangan untuk Andi di Jakarta 8 September 2024\`

*Template yang tersedia:*
- surat undangan
- surat keterangan
- surat permohonan
- surat pemberitahuan

*Fitur:*
✅ Generate dokumen otomatis
✅ Upload template baru via web admin
✅ Support format Word (.docx)

Ketik \`help\` untuk melihat pesan ini lagi.`;
};
