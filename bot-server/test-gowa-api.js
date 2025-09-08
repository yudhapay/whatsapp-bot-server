import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const GOWA_API_URL = process.env.WHATSAPP_API_URL || 'https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id';
const GOWA_USERNAME = process.env.WHATSAPP_USERNAME || '0iK2Kv4m';
const GOWA_PASSWORD = process.env.WHATSAPP_PASSWORD || 'QUWlXsiaTHFBoSBM0WPtzRdQ';
const TEST_PHONE = '6283199417708';

console.log('🔍 GOWA API Diagnostic Tool');
console.log('============================');
console.log('');

console.log('📋 Configuration:');
console.log(`API URL: ${GOWA_API_URL}`);
console.log(`Username: ${GOWA_USERNAME}`);
console.log(`Password: ${GOWA_PASSWORD.substring(0, 4)}...`);
console.log(`Test Phone: ${TEST_PHONE}`);
console.log('');

async function testGOWAConnection() {
  try {
    console.log('🔗 Testing GOWA API Connection...');
    
    // Test 1: Check API health/status
    console.log('\n1️⃣ Testing API Health...');
    try {
      const healthResponse = await axios.get(`${GOWA_API_URL}/status`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
        },
        timeout: 10000
      });
      console.log('✅ API Health Check:', healthResponse.data);
    } catch (error) {
      console.log('❌ API Health Check Failed:', error.message);
      if (error.response) {
        console.log('📊 Response Status:', error.response.status);
        console.log('📊 Response Data:', error.response.data);
      }
    }

    // Test 2: Test send message endpoint
    console.log('\n2️⃣ Testing Send Message Endpoint...');
    try {
      const messagePayload = {
        phone: TEST_PHONE,
        message: '🔍 Test message dari GOWA API diagnostic tool'
      };

      console.log('📤 Sending test message...');
      console.log('Payload:', JSON.stringify(messagePayload, null, 2));

      const messageResponse = await axios.post(`${GOWA_API_URL}/send/message`, messagePayload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
        },
        timeout: 15000
      });

      console.log('✅ Message Sent Successfully!');
      console.log('📊 Response Status:', messageResponse.status);
      console.log('📊 Response Data:', JSON.stringify(messageResponse.data, null, 2));
      
    } catch (error) {
      console.log('❌ Send Message Failed:', error.message);
      if (error.response) {
        console.log('📊 Response Status:', error.response.status);
        console.log('📊 Response Headers:', error.response.headers);
        console.log('📊 Response Data:', JSON.stringify(error.response.data, null, 2));
      }
    }

    // Test 3: Test different endpoints
    console.log('\n3️⃣ Testing Available Endpoints...');
    const endpoints = [
      '/status',
      '/health',
      '/ping',
      '/send/message',
      '/send/file',
      '/webhook',
      '/api/status'
    ];

    for (const endpoint of endpoints) {
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

  } catch (error) {
    console.log('❌ Connection Test Failed:', error.message);
  }
}

async function testWebhookEndpoint() {
  console.log('\n4️⃣ Testing Webhook Endpoint...');
  try {
    const webhookPayload = {
      type: 'message',
      message: {
        from: TEST_PHONE,
        type: 'text',
        text: 'test webhook dari GOWA diagnostic'
      }
    };

    console.log('📤 Testing webhook with payload:', JSON.stringify(webhookPayload, null, 2));

    const webhookResponse = await axios.post('http://localhost:3000/webhook', webhookPayload, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });

    console.log('✅ Webhook Test Successful!');
    console.log('📊 Response Status:', webhookResponse.status);
    console.log('📊 Response Data:', JSON.stringify(webhookResponse.data, null, 2));

  } catch (error) {
    console.log('❌ Webhook Test Failed:', error.message);
    if (error.response) {
      console.log('📊 Response Status:', error.response.status);
      console.log('📊 Response Data:', error.response.data);
    }
  }
}

async function runDiagnostics() {
  console.log('🚀 Starting GOWA API Diagnostics...\n');
  
  await testGOWAConnection();
  await testWebhookEndpoint();
  
  console.log('\n📋 Diagnostic Summary:');
  console.log('=====================');
  console.log('1. Check if GOWA API is accessible');
  console.log('2. Verify authentication credentials');
  console.log('3. Test message sending capability');
  console.log('4. Verify webhook endpoint is working');
  console.log('');
  console.log('💡 Next Steps:');
  console.log('- If API tests fail, check GOWA service status');
  console.log('- If authentication fails, verify credentials');
  console.log('- If message sending fails, check phone number format');
  console.log('- If webhook fails, ensure bot server is running');
}

runDiagnostics().catch(console.error);
