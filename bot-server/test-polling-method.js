import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const GOWA_API_URL = process.env.WHATSAPP_API_URL || 'https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id';
const GOWA_USERNAME = process.env.WHATSAPP_USERNAME || '0iK2Kv4m';
const GOWA_PASSWORD = process.env.WHATSAPP_PASSWORD || 'QUWlXsiaTHFBoSBM0WPtzRdQ';
const BOT_SERVER_URL = 'https://whatsapp-bot-88061.onrender.com';

console.log('🔄 Testing Polling Method for GOWA API');
console.log('=====================================');
console.log('');

async function testPollingMethod() {
  try {
    console.log('📋 Configuration:');
    console.log(`GOWA API: ${GOWA_API_URL}`);
    console.log(`Bot Server: ${BOT_SERVER_URL}`);
    console.log('');

    // Test 1: Check if GOWA has message polling endpoint
    console.log('1️⃣ Testing GOWA Message Polling Endpoints...');
    
    const pollingEndpoints = [
      '/messages',
      '/get/messages',
      '/receive/messages',
      '/webhook/messages',
      '/api/messages',
      '/status/messages',
      '/queue/messages'
    ];

    for (const endpoint of pollingEndpoints) {
      try {
        const response = await axios.get(`${GOWA_API_URL}${endpoint}`, {
          headers: {
            'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
          },
          timeout: 5000
        });
        console.log(`✅ ${endpoint}: ${response.status} - ${JSON.stringify(response.data).substring(0, 100)}...`);
      } catch (error) {
        console.log(`❌ ${endpoint}: ${error.response?.status || 'No response'} - ${error.message}`);
      }
    }

    // Test 2: Send test message and try to poll
    console.log('\n2️⃣ Sending Test Message and Polling...');
    
    const testMessage = {
      phone: '6283199417708',
      message: 'test polling method - buat surat undangan untuk Test Polling di Jakarta 8 September 2024'
    };

    console.log('📤 Sending test message...');
    const sendResponse = await axios.post(`${GOWA_API_URL}/send/message`, testMessage, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
      },
      timeout: 15000
    });

    console.log('✅ Message sent:', sendResponse.data);

    // Wait a bit then try to poll
    console.log('\n⏳ Waiting 5 seconds before polling...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Try to get messages
    console.log('\n📥 Attempting to poll messages...');
    try {
      const pollResponse = await axios.get(`${GOWA_API_URL}/messages`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
        },
        timeout: 10000
      });
      console.log('✅ Polling successful:', pollResponse.data);
    } catch (error) {
      console.log('❌ Polling failed:', error.message);
    }

    // Test 3: Manual webhook trigger
    console.log('\n3️⃣ Testing Manual Webhook Trigger...');
    
    const webhookPayload = {
      type: 'message',
      message: {
        from: '6283199417708',
        type: 'text',
        text: 'buat surat undangan untuk Test Manual di Jakarta 8 September 2024'
      }
    };

    console.log('📤 Triggering webhook manually...');
    const webhookResponse = await axios.post(`${BOT_SERVER_URL}/webhook`, webhookPayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Hub-Signature-256': 'sha256=test'
      },
      timeout: 15000
    });

    console.log('✅ Webhook triggered:', webhookResponse.data);

  } catch (error) {
    console.log('❌ Test Failed:', error.message);
    if (error.response) {
      console.log('📊 Response Status:', error.response.status);
      console.log('📊 Response Data:', error.response.data);
    }
  }
}

console.log('🚀 Starting Polling Method Test');
console.log('');

testPollingMethod().catch(console.error);
