import { aiService } from './src/services/aiService.js';
import dotenv from 'dotenv';

dotenv.config();

async function testAI() {
  console.log('🤖 Testing AI Service...\n');

  const testMessages = [
    'buat berita acara untuk Andi di Jakarta 8 September 2024',
    'saya butuh surat undangan untuk Siti di Bandung tanggal 15 Oktober',
    'tolong buat surat keterangan untuk Budi di Surabaya 20 November',
    'mohon bantuan buat surat perjanjian untuk Tono di Medan 25 Desember',
    'hello, apa kabar?',
    'buat dokumen untuk John di New York 1 Januari 2025'
  ];

  for (const message of testMessages) {
    console.log(`📝 Testing: "${message}"`);
    
    try {
      const result = await aiService.parseMessage(message);
      
      if (result.success) {
        console.log(`✅ Success:`, result.data);
        console.log(`🎯 Confidence: ${result.confidence}%`);
        console.log(`🔧 Source: ${result.source || 'rule-based'}`);
      } else {
        console.log(`❌ Failed:`, result.error);
      }
    } catch (error) {
      console.log(`💥 Error:`, error.message);
    }
    
    console.log('---\n');
  }

  // Test help message
  console.log('📚 Help Message:');
  const helpMessage = aiService.getSmartHelpMessage();
  console.log(JSON.stringify(helpMessage, null, 2));
}

testAI().catch(console.error);
