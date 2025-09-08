import axios from 'axios';

const WEBHOOK_URL = 'https://whatsapp-bot-88061.onrender.com/webhook';
const WEBHOOK_HEADER = 'X-Hub-Signature-256: sha256=test';
const TEST_PHONE = '6283199417708';

console.log('🔧 Testing Webhook Configuration');
console.log('================================');
console.log('');

async function testWebhookConfig() {
  try {
    console.log('📋 Webhook Configuration:');
    console.log(`URL: ${WEBHOOK_URL}`);
    console.log(`Header: ${WEBHOOK_HEADER}`);
    console.log(`Test Phone: ${TEST_PHONE}`);
    console.log('');

    // Test 1: Test webhook endpoint with correct header
    console.log('1️⃣ Testing Webhook Endpoint...');
    
    const webhookPayload = {
      type: 'message',
      message: {
        from: TEST_PHONE,
        type: 'text',
        text: 'buat surat undangan untuk Test Webhook Config di Jakarta 8 September 2024'
      }
    };

    console.log('📤 Sending webhook request...');
    console.log('Payload:', JSON.stringify(webhookPayload, null, 2));

    const response = await axios.post(WEBHOOK_URL, webhookPayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Hub-Signature-256': 'sha256=test'
      },
      timeout: 15000
    });

    console.log('✅ Webhook Success!');
    console.log('📊 Status:', response.status);
    console.log('📊 Response:', JSON.stringify(response.data, null, 2));

    // Test 2: Test different message types
    console.log('\n2️⃣ Testing Different Message Types...');
    
    const testMessages = [
      {
        name: 'Help Command',
        message: 'help'
      },
      {
        name: 'Template Request',
        message: 'buat surat keterangan untuk Test Template di Bandung 9 September 2024'
      },
      {
        name: 'Invalid Command',
        message: 'halo bot'
      }
    ];

    for (const test of testMessages) {
      console.log(`\n📝 Testing: ${test.name}`);
      
      const payload = {
        type: 'message',
        message: {
          from: TEST_PHONE,
          type: 'text',
          text: test.message
        }
      };

      try {
        const testResponse = await axios.post(WEBHOOK_URL, payload, {
          headers: {
            'Content-Type': 'application/json',
            'X-Hub-Signature-256': 'sha256=test'
          },
          timeout: 10000
        });

        console.log(`✅ ${test.name}: ${testResponse.status}`);
        console.log(`📊 Response:`, JSON.stringify(testResponse.data, null, 2));

        // Wait between tests
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (error) {
        console.log(`❌ ${test.name}: ${error.message}`);
      }
    }

    // Test 3: Test webhook verification (GET request)
    console.log('\n3️⃣ Testing Webhook Verification...');
    
    try {
      const verifyResponse = await axios.get(`${WEBHOOK_URL}?hub.mode=subscribe&hub.challenge=test&hub.verify_token=test_webhook_token_123`, {
        timeout: 10000
      });

      console.log('✅ Verification Success!');
      console.log('📊 Status:', verifyResponse.status);
      console.log('📊 Response:', verifyResponse.data);

    } catch (error) {
      console.log('❌ Verification Failed:', error.message);
    }

    console.log('\n📱 Check your WhatsApp for bot responses!');
    console.log('⏳ Bot should have processed the messages and sent replies...');

  } catch (error) {
    console.log('❌ Test Failed:', error.message);
    if (error.response) {
      console.log('📊 Response Status:', error.response.status);
      console.log('📊 Response Data:', error.response.data);
    }
  }
}

console.log('🚀 Starting Webhook Configuration Test');
console.log('');

testWebhookConfig().catch(console.error);
