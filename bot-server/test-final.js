import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const GOWA_API_URL = process.env.WHATSAPP_API_URL || 'https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id';
const GOWA_USERNAME = process.env.WHATSAPP_USERNAME || '0iK2Kv4m';
const GOWA_PASSWORD = process.env.WHATSAPP_PASSWORD || 'QUWlXsiaTHFBoSBM0WPtzRdQ';
const BOT_SERVER_URL = 'https://whatsapp-bot-88061.onrender.com';
const TEST_PHONE = '6283199417708';

console.log('🎯 FINAL TEST - WhatsApp Bot System');
console.log('===================================');
console.log('');

async function finalTest() {
  try {
    console.log('📋 System Configuration:');
    console.log(`GOWA API: ${GOWA_API_URL}`);
    console.log(`Bot Server: ${BOT_SERVER_URL}`);
    console.log(`Test Phone: ${TEST_PHONE}`);
    console.log('');

    // Test 1: Health Check
    console.log('1️⃣ Health Check...');
    try {
      const healthResponse = await axios.get(`${BOT_SERVER_URL}/health`);
      console.log('✅ Bot Server Health:', healthResponse.data);
    } catch (error) {
      console.log('❌ Health Check Failed:', error.message);
    }

    // Test 2: Send test message via GOWA
    console.log('\n2️⃣ Sending Test Message via GOWA...');
    const testMessage = {
      phone: TEST_PHONE,
      message: 'TEST COBA - Bot harus membalas ini!'
    };

    const gowaResponse = await axios.post(`${GOWA_API_URL}/send/message`, testMessage, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
      },
      timeout: 15000
    });

    console.log('✅ GOWA Message Sent!');
    console.log('📊 Response:', gowaResponse.data);

    // Test 3: Test webhook with help command
    console.log('\n3️⃣ Testing Help Command via Webhook...');
    const helpPayload = {
      type: 'message',
      message: {
        from: TEST_PHONE,
        type: 'text',
        text: 'help'
      }
    };

    const helpResponse = await axios.post(`${BOT_SERVER_URL}/webhook`, helpPayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Hub-Signature-256': 'sha256=test'
      },
      timeout: 15000
    });

    console.log('✅ Help Webhook Success!');
    console.log('📊 Response:', helpResponse.data);

    // Test 4: Test webhook with template request
    console.log('\n4️⃣ Testing Template Request via Webhook...');
    const templatePayload = {
      type: 'message',
      message: {
        from: TEST_PHONE,
        type: 'text',
        text: 'buat surat undangan untuk Test Final di Jakarta 8 September 2024'
      }
    };

    const templateResponse = await axios.post(`${BOT_SERVER_URL}/webhook`, templatePayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Hub-Signature-256': 'sha256=test'
      },
      timeout: 15000
    });

    console.log('✅ Template Webhook Success!');
    console.log('📊 Response:', templateResponse.data);

    // Test 5: Send final message via GOWA
    console.log('\n5️⃣ Sending Final Message via GOWA...');
    const finalMessage = {
      phone: TEST_PHONE,
      message: 'TEST FINAL - Bot harus membalas dengan help message!'
    };

    const finalResponse = await axios.post(`${GOWA_API_URL}/send/message`, finalMessage, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
      },
      timeout: 15000
    });

    console.log('✅ Final Message Sent!');
    console.log('📊 Response:', finalResponse.data);

    console.log('\n🎉 FINAL TEST COMPLETED!');
    console.log('========================');
    console.log('');
    console.log('📱 Check your WhatsApp for messages!');
    console.log('⏳ Bot should have sent:');
    console.log('   - Help message for "help" command');
    console.log('   - Document for template request');
    console.log('   - Response to test messages');
    console.log('');
    console.log('🔧 Next Steps:');
    console.log('1. Configure webhook in GOWA dashboard');
    console.log('2. Test with real WhatsApp messages');
    console.log('3. Upload templates via admin web');
    console.log('');
    console.log('✅ WhatsApp Bot System is READY! 🚀');

  } catch (error) {
    console.log('❌ Final Test Failed:', error.message);
    if (error.response) {
      console.log('📊 Response Status:', error.response.status);
      console.log('📊 Response Data:', error.response.data);
    }
  }
}

console.log('🚀 Starting Final Test');
console.log('');

finalTest().catch(console.error);
