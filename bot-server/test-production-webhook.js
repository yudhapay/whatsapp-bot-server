import axios from 'axios';

const PRODUCTION_URL = 'https://whatsapp-bot-88061.onrender.com';
const TEST_PHONE = '6283199417708';

console.log('🚀 Testing Production Webhook');
console.log('============================');
console.log('');

async function testProductionWebhook() {
  try {
    // Test 1: Health check
    console.log('1️⃣ Testing Health Endpoint...');
    try {
      const healthResponse = await axios.get(`${PRODUCTION_URL}/health`);
      console.log('✅ Health Check:', healthResponse.data);
    } catch (error) {
      console.log('❌ Health Check Failed:', error.message);
    }

    // Test 2: Test webhook dengan header yang berbeda
    console.log('\n2️⃣ Testing Webhook with Different Headers...');
    
    const webhookPayload = {
      type: 'message',
      message: {
        from: TEST_PHONE,
        type: 'text',
        text: 'test webhook production - buat surat undangan untuk Test di Jakarta 8 September 2024'
      }
    };

    // Test dengan berbagai header
    const testCases = [
      {
        name: 'No Authorization',
        headers: { 'Content-Type': 'application/json' }
      },
      {
        name: 'With X-Hub-Signature-256',
        headers: { 
          'Content-Type': 'application/json',
          'X-Hub-Signature-256': 'sha256=test'
        }
      },
      {
        name: 'With Authorization Bearer',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test_webhook_token_123'
        }
      },
      {
        name: 'With X-Webhook-Token',
        headers: { 
          'Content-Type': 'application/json',
          'X-Webhook-Token': 'test_webhook_token_123'
        }
      }
    ];

    for (const testCase of testCases) {
      console.log(`\n📤 Testing: ${testCase.name}`);
      try {
        const response = await axios.post(`${PRODUCTION_URL}/webhook`, webhookPayload, {
          headers: testCase.headers,
          timeout: 15000
        });
        console.log(`✅ Success: ${response.status}`);
        console.log(`📊 Response:`, JSON.stringify(response.data, null, 2));
      } catch (error) {
        console.log(`❌ Failed: ${error.response?.status || 'No response'}`);
        console.log(`📊 Error:`, error.response?.data || error.message);
      }
    }

    // Test 3: Test dengan format GOWA API
    console.log('\n3️⃣ Testing with GOWA API Format...');
    try {
      const gowaPayload = {
        type: 'message',
        message: {
          from: TEST_PHONE,
          type: 'text',
          text: 'buat surat undangan untuk Test GOWA di Jakarta 8 September 2024'
        }
      };

      const response = await axios.post(`${PRODUCTION_URL}/webhook`, gowaPayload, {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'GOWA-API/1.0'
        },
        timeout: 15000
      });

      console.log('✅ GOWA Format Success:', response.status);
      console.log('📊 Response:', JSON.stringify(response.data, null, 2));

    } catch (error) {
      console.log('❌ GOWA Format Failed:', error.response?.status || 'No response');
      console.log('📊 Error:', error.response?.data || error.message);
    }

  } catch (error) {
    console.log('❌ Test Failed:', error.message);
  }
}

console.log('🔍 Production Webhook Test');
console.log(`🌐 URL: ${PRODUCTION_URL}`);
console.log(`📱 Phone: ${TEST_PHONE}`);
console.log('');

testProductionWebhook().catch(console.error);
