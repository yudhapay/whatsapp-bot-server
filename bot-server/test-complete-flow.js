import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const GOWA_API_URL = process.env.WHATSAPP_API_URL || 'https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id';
const GOWA_USERNAME = process.env.WHATSAPP_USERNAME || '0iK2Kv4m';
const GOWA_PASSWORD = process.env.WHATSAPP_PASSWORD || 'QUWlXsiaTHFBoSBM0WPtzRdQ';
const BOT_SERVER_URL = 'https://whatsapp-bot-88061.onrender.com';
const TEST_PHONE = '6283199417708';

console.log('🔄 Complete Flow Test - GOWA API + Bot Server');
console.log('============================================');
console.log('');

async function testCompleteFlow() {
  try {
    console.log('📋 Configuration:');
    console.log(`GOWA API: ${GOWA_API_URL}`);
    console.log(`Bot Server: ${BOT_SERVER_URL}`);
    console.log(`Test Phone: ${TEST_PHONE}`);
    console.log('');

    // Step 1: Send message via GOWA API
    console.log('1️⃣ Sending Message via GOWA API...');
    const messagePayload = {
      phone: TEST_PHONE,
      message: 'buat surat undangan untuk Test Complete Flow di Jakarta 8 September 2024'
    };

    console.log('📤 Sending:', JSON.stringify(messagePayload, null, 2));

    const gowaResponse = await axios.post(`${GOWA_API_URL}/send/message`, messagePayload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
      },
      timeout: 15000
    });

    console.log('✅ GOWA Message Sent!');
    console.log('📊 Response:', JSON.stringify(gowaResponse.data, null, 2));

    // Step 2: Wait a bit
    console.log('\n⏳ Waiting 3 seconds...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Step 3: Trigger webhook manually (simulating GOWA webhook)
    console.log('\n2️⃣ Triggering Bot Server Webhook...');
    const webhookPayload = {
      type: 'message',
      message: {
        from: TEST_PHONE,
        type: 'text',
        text: 'buat surat undangan untuk Test Webhook di Jakarta 8 September 2024'
      }
    };

    console.log('📤 Triggering webhook:', JSON.stringify(webhookPayload, null, 2));

    const webhookResponse = await axios.post(`${BOT_SERVER_URL}/webhook`, webhookPayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Hub-Signature-256': 'sha256=test'
      },
      timeout: 15000
    });

    console.log('✅ Webhook Triggered!');
    console.log('📊 Response:', JSON.stringify(webhookResponse.data, null, 2));

    // Step 4: Wait for bot response
    console.log('\n⏳ Waiting 10 seconds for bot response...');
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Step 5: Send another message to check if bot is responding
    console.log('\n3️⃣ Sending Follow-up Message...');
    const followupMessage = {
      phone: TEST_PHONE,
      message: 'help'
    };

    console.log('📤 Sending follow-up:', JSON.stringify(followupMessage, null, 2));

    const followupResponse = await axios.post(`${GOWA_API_URL}/send/message`, followupMessage, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
      },
      timeout: 15000
    });

    console.log('✅ Follow-up Sent!');
    console.log('📊 Response:', JSON.stringify(followupResponse.data, null, 2));

    console.log('\n📱 Check your WhatsApp for messages!');
    console.log('⏳ Bot should have replied to your messages...');
    console.log('');
    console.log('🔍 Expected Results:');
    console.log('- Bot should send help message for "help" command');
    console.log('- Bot should process template request and send document');
    console.log('- If no response, check GOWA webhook configuration');

  } catch (error) {
    console.log('❌ Test Failed:', error.message);
    if (error.response) {
      console.log('📊 Response Status:', error.response.status);
      console.log('📊 Response Data:', error.response.data);
    }
  }
}

console.log('🚀 Starting Complete Flow Test');
console.log('');

testCompleteFlow().catch(console.error);
