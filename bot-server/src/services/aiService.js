import { GoogleGenerativeAI } from '@google/generative-ai';
import { logger } from '../utils/logger.js';

/**
 * AI Service untuk meningkatkan kecerdasan chatbot
 * Menggunakan Google Gemini sebagai AI provider utama
 */
class AIService {
  constructor() {
    // Initialize Google Gemini
    this.gemini = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY || 'your-gemini-api-key-here'
    );

    this.templateKeywords = {
      'berita acara': ['berita', 'acara', 'laporan', 'report'],
      'surat undangan': ['undangan', 'invitation', 'undang'],
      'surat keterangan': ['keterangan', 'sertifikat', 'certificate'],
      'surat perjanjian': ['perjanjian', 'kontrak', 'agreement'],
      'surat pernyataan': ['pernyataan', 'statement', 'declaration']
    };
    
    this.locationKeywords = ['di', 'pada', 'lokasi', 'tempat', 'alamat'];
    this.dateKeywords = ['tanggal', 'hari', 'waktu', 'kapan', 'kapan'];
    this.nameKeywords = ['untuk', 'kepada', 'dari', 'oleh'];
  }

  /**
   * Parse pesan user dengan AI untuk ekstrak informasi
   */
  async parseMessage(message) {
    try {
      // Coba Gemini AI parsing dulu, fallback ke rule-based
      const aiResult = await this.parseWithGemini(message);
      if (aiResult.success) {
        return aiResult;
      }

      // Fallback ke rule-based parsing
      const text = message.toLowerCase().trim();
      
      // 1. Deteksi template yang diminta
      const template = this.detectTemplate(text);
      
      // 2. Ekstrak nama
      const name = this.extractName(text);
      
      // 3. Ekstrak lokasi
      const location = this.extractLocation(text);
      
      // 4. Ekstrak tanggal
      const date = this.extractDate(text);
      
      // 5. Validasi dan perbaiki data
      const validatedData = this.validateAndFixData({
        template,
        name,
        location,
        date
      });

      logger.info('AI Parse Result:', validatedData);
      
      return {
        success: true,
        data: validatedData,
        confidence: this.calculateConfidence(validatedData),
        source: 'rule-based'
      };
      
    } catch (error) {
      logger.error('Error in AI parsing:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }


  /**
   * Parse dengan Google Gemini API
   */
  async parseWithGemini(message) {
    try {
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-gemini-api-key-here') {
        logger.info('Gemini API key not set, using fallback parsing');
        return { success: false };
      }

      const model = this.gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
Anda adalah AI assistant untuk parsing pesan WhatsApp. Ekstrak informasi dari pesan user untuk membuat dokumen template.

Pesan user: "${message}"

Template yang tersedia:
- berita acara
- surat undangan  
- surat keterangan
- surat perjanjian
- surat pernyataan

Ekstrak informasi berikut dalam format JSON:
{
  "template": "nama_template_yang_diminta",
  "name": "nama_orang",
  "location": "lokasi",
  "date": "tanggal"
}

Contoh:
Input: "buat berita acara untuk Andi di Jakarta 8 September 2024"
Output: {"template": "berita acara", "name": "Andi", "location": "Jakarta", "date": "8 September 2024"}

Input: "saya butuh surat undangan untuk Siti di Bandung tanggal 15 Oktober"
Output: {"template": "surat undangan", "name": "Siti", "location": "Bandung", "date": "15 Oktober"}

Jika tidak bisa mengekstrak informasi lengkap, gunakan nilai default yang masuk akal.
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiResponse = response.text().trim();
      
      logger.info('Gemini Response:', aiResponse);

      // Clean response from markdown formatting
      let cleanResponse = aiResponse;
      if (cleanResponse.includes('```json')) {
        cleanResponse = cleanResponse.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
      }
      if (cleanResponse.includes('```')) {
        cleanResponse = cleanResponse.replace(/```\s*/g, '');
      }
      
      // Parse JSON response
      const parsedData = JSON.parse(cleanResponse);
      
      // Validasi data
      const validatedData = this.validateAndFixData(parsedData);
      
      return {
        success: true,
        data: validatedData,
        confidence: 95, // Gemini sebagai AI provider utama
        source: 'gemini'
      };

    } catch (error) {
      logger.error('Gemini parsing error:', error);
      return { success: false };
    }
  }

  /**
   * Deteksi template berdasarkan keyword
   */
  detectTemplate(text) {
    for (const [template, keywords] of Object.entries(this.templateKeywords)) {
      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          return template;
        }
      }
    }
    return null;
  }

  /**
   * Ekstrak nama dari pesan
   */
  extractName(text) {
    // Pattern untuk nama setelah "untuk", "kepada", dll
    const namePatterns = [
      /untuk\s+([a-zA-Z\s]+?)(?:\s+di|\s+tanggal|\s+$)/i,
      /kepada\s+([a-zA-Z\s]+?)(?:\s+di|\s+tanggal|\s+$)/i,
      /dari\s+([a-zA-Z\s]+?)(?:\s+di|\s+tanggal|\s+$)/i,
      /oleh\s+([a-zA-Z\s]+?)(?:\s+di|\s+tanggal|\s+$)/i
    ];

    for (const pattern of namePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    // Fallback: cari kata setelah "untuk"
    const fallbackMatch = text.match(/untuk\s+([a-zA-Z\s]+)/i);
    if (fallbackMatch && fallbackMatch[1]) {
      return fallbackMatch[1].trim();
    }

    return null;
  }

  /**
   * Ekstrak lokasi dari pesan
   */
  extractLocation(text) {
    const locationPatterns = [
      /di\s+([a-zA-Z\s]+?)(?:\s+tanggal|\s+\d|\s+$)/i,
      /pada\s+([a-zA-Z\s]+?)(?:\s+tanggal|\s+\d|\s+$)/i,
      /lokasi\s+([a-zA-Z\s]+?)(?:\s+tanggal|\s+\d|\s+$)/i,
      /tempat\s+([a-zA-Z\s]+?)(?:\s+tanggal|\s+\d|\s+$)/i
    ];

    for (const pattern of locationPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return null;
  }

  /**
   * Ekstrak tanggal dari pesan
   */
  extractDate(text) {
    // Pattern untuk berbagai format tanggal
    const datePatterns = [
      /tanggal\s+([a-zA-Z0-9\s]+?)(?:\s+$)/i,
      /hari\s+([a-zA-Z0-9\s]+?)(?:\s+$)/i,
      /waktu\s+([a-zA-Z0-9\s]+?)(?:\s+$)/i,
      /kapan\s+([a-zA-Z0-9\s]+?)(?:\s+$)/i,
      /(\d{1,2}\s+(?:januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+\d{4})/i,
      /(\d{1,2}\/\d{1,2}\/\d{4})/i,
      /(\d{1,2}-\d{1,2}-\d{4})/i
    ];

    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return null;
  }

  /**
   * Validasi dan perbaiki data yang diekstrak
   */
  validateAndFixData(data) {
    const result = { ...data };

    // Validasi template
    if (!result.template) {
      result.template = 'berita acara'; // default
    }

    // Validasi nama
    if (!result.name || result.name.length < 2) {
      result.name = 'Tuan/Ibu'; // default
    }

    // Validasi lokasi
    if (!result.location || result.location.length < 2) {
      result.location = 'Jakarta'; // default
    }

    // Validasi tanggal
    if (!result.date || result.date.length < 3) {
      const today = new Date();
      result.date = today.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }

    return result;
  }

  /**
   * Hitung confidence score
   */
  calculateConfidence(data) {
    let score = 0;
    
    if (data.template) score += 30;
    if (data.name && data.name !== 'Tuan/Ibu') score += 25;
    if (data.location && data.location !== 'Jakarta') score += 25;
    if (data.date && !data.date.includes('Invalid')) score += 20;
    
    return Math.min(score, 100);
  }

  /**
   * Generate respons yang lebih cerdas
   */
  async generateResponse(parseResult, templateFound) {
    try {
      if (!parseResult.success) {
        return this.getErrorResponse();
      }

      const { data, confidence } = parseResult;

      if (confidence < 50) {
        return this.getLowConfidenceResponse(data);
      }

      if (!templateFound) {
        return this.getTemplateNotFoundResponse(data);
      }

      return this.getSuccessResponse(data, confidence);

    } catch (error) {
      logger.error('Error generating AI response:', error);
      return this.getErrorResponse();
    }
  }

  /**
   * Respons untuk error
   */
  getErrorResponse() {
    return {
      type: 'error',
      message: 'Maaf, saya tidak dapat memahami pesan Anda. Silakan gunakan format: "buat [nama_template] untuk [nama] di [lokasi] [tanggal]"',
      suggestions: [
        'buat berita acara untuk Andi di Jakarta 8 September 2024',
        'buat surat undangan untuk Siti di Bandung 15 Oktober 2024',
        'buat surat keterangan untuk Budi di Surabaya 20 November 2024'
      ]
    };
  }

  /**
   * Respons untuk confidence rendah
   */
  getLowConfidenceResponse(data) {
    return {
      type: 'clarification',
      message: `Saya mendeteksi Anda ingin membuat ${data.template} untuk ${data.name} di ${data.location} pada ${data.date}. Apakah ini benar?`,
      data: data,
      confirm: true
    };
  }

  /**
   * Respons untuk template tidak ditemukan
   */
  getTemplateNotFoundResponse(data) {
    return {
      type: 'template_not_found',
      message: `Template "${data.template}" tidak ditemukan. Template yang tersedia:`,
      availableTemplates: Object.keys(this.templateKeywords),
      data: data
    };
  }

  /**
   * Respons untuk sukses
   */
  getSuccessResponse(data, confidence) {
    return {
      type: 'success',
      message: `Baik! Saya akan membuat ${data.template} untuk ${data.name} di ${data.location} pada ${data.date}. Mohon tunggu sebentar...`,
      data: data,
      confidence: confidence
    };
  }

  /**
   * Generate help message yang lebih cerdas
   */
  getSmartHelpMessage() {
    return {
      type: 'help',
      message: 'Halo! Saya adalah AI assistant untuk membuat dokumen template. Saya bisa membantu Anda membuat:',
      templates: Object.keys(this.templateKeywords),
      examples: [
        'buat berita acara untuk Andi di Jakarta 8 September 2024',
        'buat surat undangan untuk Siti di Bandung 15 Oktober 2024',
        'buat surat keterangan untuk Budi di Surabaya 20 November 2024'
      ],
      tips: [
        'Gunakan format: "buat [nama_template] untuk [nama] di [lokasi] [tanggal]"',
        'Template yang tersedia: berita acara, surat undangan, surat keterangan, dll',
        'Saya akan otomatis mendeteksi informasi yang Anda berikan'
      ]
    };
  }
}

export const aiService = new AIService();
