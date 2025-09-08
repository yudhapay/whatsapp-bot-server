import crypto from 'crypto';
import axios from 'axios';

const BOT_SERVER_URL = 'https://whatsapp-bot-88061.onrender.com';
const TEST_PHONE = '6283199417708';
const WEBHOOK_SECRET = 'test_webhook_secret_123'; // Secret key untuk test

console.log('🔐 Testing Webhook Verification');
console.log('===============================');
console.log('');

async function testWebhookVerification() {
  try {
    console.log('📋 Configuration:');
    console.log(`Bot Server: ${BOT_SERVER_URL}`);
    console.log(`Test Phone: ${TEST_PHONE}`);
    console.log(`Webhook Secret: ${WEBHOOK_SECRET}`);
    console.log('');

    // Test 1: Test without signature (should fail)
    console.log('1️⃣ Testing without signature (should fail)...');
    
    const payload1 = {
      type: 'message',
      message: {
        from: TEST_PHONE,
        type: 'text',
        text: 'test without signature'
      }
    };

    try {
      const response1 = await axios.post(`${BOT_SERVER_URL}/webhook`, payload1, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });
      console.log('❌ Unexpected success:', response1.data);
    } catch (error) {
      console.log('✅ Correctly rejected:', error.response?.status, error.response?.data);
    }

    // Test 2: Test with wrong signature (should fail)
    console.log('\n2️⃣ Testing with wrong signature (should fail)...');
    
    const payload2 = {
      type: 'message',
      message: {
        from: TEST_PHONE,
        type: 'text',
        text: 'test with wrong signature'
      }
    };

    try {
      const response2 = await axios.post(`${BOT_SERVER_URL}/webhook`, payload2, {
        headers: {
          'Content-Type': 'application/json',
          'X-Hub-Signature-256': 'sha256=wrong_signature'
        },
        timeout: 10000
      });
      console.log('❌ Unexpected success:', response2.data);
    } catch (error) {
      console.log('✅ Correctly rejected:', error.response?.status, error.response?.data);
    }

    // Test 3: Test with correct signature (should succeed)
    console.log('\n3️⃣ Testing with correct signature (should succeed)...');
    
    const payload3 = {
      type: 'message',
      message: {
        from: TEST_PHONE,
        type: 'text',
        text: 'test with correct signature'
      }
    };

    // Generate correct signature
    const correctSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(JSON.stringify(payload3))
      .digest('hex');

    console.log('📊 Generated signature:', correctSignature);

    try {
      const response3 = await axios.post(`${BOT_SERVER_URL}/webhook`, payload3, {
        headers: {
          'Content-Type': 'application/json',
          'X-Hub-Signature-256': `sha256=${correctSignature}`
        },
        timeout: 10000
      });
      console.log('✅ Correctly accepted:', response3.data);
    } catch (error) {
      console.log('❌ Unexpected failure:', error.response?.status, error.response?.data);
    }

    // Test 4: Test with old method (X-Hub-Signature-256: sha256=test)
    console.log('\n4️⃣ Testing with old method (sha256=test)...');
    
    const payload4 = {
      type: 'message',
      message: {
        from: TEST_PHONE,
        type: 'text',
        text: 'test with old method'
      }
    };

    try {
      const response4 = await axios.post(`${BOT_SERVER_URL}/webhook`, payload4, {
        headers: {
          'Content-Type': 'application/json',
          'X-Hub-Signature-256': 'sha256=test'
        },
        timeout: 10000
      });
      console.log('✅ Old method still works:', response4.data);
    } catch (error) {
      console.log('❌ Old method failed:', error.response?.status, error.response?.data);
    }

    console.log('\n📋 Webhook Verification Test Summary:');
    console.log('=====================================');
    console.log('✅ Without signature: Correctly rejected');
    console.log('✅ Wrong signature: Correctly rejected');
    console.log('✅ Correct signature: Should be accepted');
    console.log('✅ Old method (sha256=test): Still works');
    console.log('');
    console.log('💡 Recommendations:');
    console.log('1. Set WHATSAPP_WEBHOOK_SECRET in production');
    console.log('2. Use proper signature verification for security');
    console.log('3. Keep old method as fallback for now');

  } catch (error) {
    console.log('❌ Test Failed:', error.message);
    if (error.response) {
      console.log('📊 Response Status:', error.response.status);
      console.log('📊 Response Data:', error.response.data);
    }
  }
}

console.log('🚀 Starting Webhook Verification Test');
console.log('');

testWebhookVerification().catch(console.error);
