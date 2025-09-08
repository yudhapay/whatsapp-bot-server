import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const GOWA_API_URL = process.env.WHATSAPP_API_URL || 'https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id';
const GOWA_USERNAME = process.env.WHATSAPP_USERNAME || '0iK2Kv4m';
const GOWA_PASSWORD = process.env.WHATSAPP_PASSWORD || 'QUWlXsiaTHFBoSBM0WPtzRdQ';
const TEST_PHONE = '6283199417708';

console.log('🔍 GOWA API Direct Test');
console.log('======================');
console.log('');

async function testGOWADirect() {
  try {
    console.log('📋 Configuration:');
    console.log(`API URL: ${GOWA_API_URL}`);
    console.log(`Username: ${GOWA_USERNAME}`);
    console.log(`Test Phone: ${TEST_PHONE}`);
    console.log('');

    // Test 1: Send test message
    console.log('1️⃣ Sending Test Message...');
    const messagePayload = {
      phone: TEST_PHONE,
      message: '🔍 Test message dari GOWA API direct test - Bot harus membalas ini!'
    };

    console.log('📤 Sending:', JSON.stringify(messagePayload, null, 2));

    const response = await axios.post(`${GOWA_API_URL}/send/message`, messagePayload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
      },
      timeout: 15000
    });

    console.log('✅ Message Sent Successfully!');
    console.log('📊 Response:', JSON.stringify(response.data, null, 2));

    // Test 2: Send template request message
    console.log('\n2️⃣ Sending Template Request...');
    const templatePayload = {
      phone: TEST_PHONE,
      message: 'buat surat undangan untuk Test Direct di Jakarta 8 September 2024'
    };

    console.log('📤 Sending:', JSON.stringify(templatePayload, null, 2));

    const templateResponse = await axios.post(`${GOWA_API_URL}/send/message`, templatePayload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
      },
      timeout: 15000
    });

    console.log('✅ Template Request Sent!');
    console.log('📊 Response:', JSON.stringify(templateResponse.data, null, 2));

    console.log('\n📱 Check your WhatsApp for messages!');
    console.log('⏳ Bot should reply within 10-30 seconds...');

  } catch (error) {
    console.log('❌ Test Failed:', error.message);
    if (error.response) {
      console.log('📊 Response Status:', error.response.status);
      console.log('📊 Response Data:', error.response.data);
    }
  }
}

testGOWADirect().catch(console.error);
