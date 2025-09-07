import { Document, Packer, Paragraph, TextRun } from 'docx';
import mammoth from 'mammoth';
import { logger } from '../utils/logger.js';

class TemplateService {
  constructor() {
    this.supabase = null;
  }

  /**
   * Set Supabase client
   */
  setSupabaseClient(supabase) {
    this.supabase = supabase;
  }

  /**
   * Ambil template dari Supabase Storage
   */
  async getTemplate(templateName) {
    try {
      if (!this.supabase) {
        throw new Error('Supabase client not initialized');
      }

      // Ambil daftar file dari bucket templates
      const { data: files, error } = await this.supabase.storage
        .from('templates')
        .list();

      if (error) {
        logger.error('Error listing templates:', error);
        throw error;
      }

      // Cari template yang sesuai
      const templateFile = files.find(file => 
        file.name.toLowerCase().includes(templateName.toLowerCase()) &&
        file.name.endsWith('.docx')
      );

      if (!templateFile) {
        logger.warn(`Template "${templateName}" not found`);
        return null;
      }

      // Download template file
      const { data: fileData, error: downloadError } = await this.supabase.storage
        .from('templates')
        .download(templateFile.name);

      if (downloadError) {
        logger.error('Error downloading template:', downloadError);
        throw downloadError;
      }

      // Convert blob to buffer
      const arrayBuffer = await fileData.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return {
        name: templateFile.name,
        buffer: buffer,
        size: templateFile.metadata?.size || 0
      };
    } catch (error) {
      logger.error('Error getting template:', error);
      throw error;
    }
  }

  /**
   * Generate dokumen baru dengan data yang diisi
   */
  async generateDocument(template, data) {
    try {
      // Parse template Word document
      const result = await mammoth.extractRawText({ buffer: template.buffer });
      let content = result.value;

      // Replace placeholders dengan data
      content = this.replacePlaceholders(content, data);

      // Create new document
      const doc = new Document({
        sections: [{
          properties: {},
          children: this.createParagraphsFromText(content)
        }]
      });

      // Generate buffer
      const buffer = await Packer.toBuffer(doc);
      
      logger.info(`Document generated successfully, size: ${buffer.length} bytes`);
      return buffer;
    } catch (error) {
      logger.error('Error generating document:', error);
      throw error;
    }
  }

  /**
   * Replace placeholders dalam teks
   */
  replacePlaceholders(text, data) {
    let result = text;

    // Replace common placeholders
    const placeholders = {
      '[NAMA]': data.nama || '',
      '[LOKASI]': data.lokasi || '',
      '[TANGGAL]': data.tanggal || '',
      '[Nama]': data.nama || '',
      '[Lokasi]': data.lokasi || '',
      '[Tanggal]': data.tanggal || '',
      '[nama]': data.nama || '',
      '[lokasi]': data.lokasi || '',
      '[tanggal]': data.tanggal || '',
      '{{NAMA}}': data.nama || '',
      '{{LOKASI}}': data.lokasi || '',
      '{{TANGGAL}}': data.tanggal || '',
      '{{nama}}': data.nama || '',
      '{{lokasi}}': data.lokasi || '',
      '{{tanggal}}': data.tanggal || ''
    };

    for (const [placeholder, value] of Object.entries(placeholders)) {
      result = result.replace(new RegExp(placeholder, 'g'), value);
    }

    return result;
  }

  /**
   * Convert text to paragraphs for docx
   */
  createParagraphsFromText(text) {
    const lines = text.split('\n');
    return lines.map(line => {
      if (line.trim() === '') {
        return new Paragraph({ children: [new TextRun({ text: '' })] });
      }
      return new Paragraph({ children: [new TextRun({ text: line })] });
    });
  }

  /**
   * Dapatkan daftar template yang tersedia
   */
  async getAvailableTemplates() {
    try {
      if (!this.supabase) {
        throw new Error('Supabase client not initialized');
      }

      const { data: files, error } = await this.supabase.storage
        .from('templates')
        .list();

      if (error) {
        logger.error('Error listing templates:', error);
        throw error;
      }

      return files
        .filter(file => file.name.endsWith('.docx'))
        .map(file => ({
          name: file.name,
          size: file.metadata?.size || 0,
          created_at: file.created_at
        }));
    } catch (error) {
      logger.error('Error getting available templates:', error);
      throw error;
    }
  }

  /**
   * Upload template baru (untuk admin)
   */
  async uploadTemplate(fileName, fileBuffer) {
    try {
      if (!this.supabase) {
        throw new Error('Supabase client not initialized');
      }

      const { data, error } = await this.supabase.storage
        .from('templates')
        .upload(fileName, fileBuffer, {
          contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });

      if (error) {
        logger.error('Error uploading template:', error);
        throw error;
      }

      logger.info(`Template uploaded successfully: ${fileName}`);
      return data;
    } catch (error) {
      logger.error('Error uploading template:', error);
      throw error;
    }
  }
}

export const templateService = new TemplateService();

