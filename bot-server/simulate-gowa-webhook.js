import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const GOWA_API_URL = process.env.WHATSAPP_API_URL || 'https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id';
const GOWA_USERNAME = process.env.WHATSAPP_USERNAME || '0iK2Kv4m';
const GOWA_PASSWORD = process.env.WHATSAPP_PASSWORD || 'QUWlXsiaTHFBoSBM0WPtzRdQ';
const BOT_SERVER_URL = 'https://whatsapp-bot-88061.onrender.com';
const TEST_PHONE = '6283199417708';

console.log('🔄 Simulating GOWA Webhook Flow');
console.log('===============================');
console.log('');

async function simulateGOWAWebhook() {
  try {
    console.log('📋 Configuration:');
    console.log(`GOWA API: ${GOWA_API_URL}`);
    console.log(`Bot Server: ${BOT_SERVER_URL}`);
    console.log(`Test Phone: ${TEST_PHONE}`);
    console.log('');

    // Step 1: Send message via GOWA API (simulating user sending message)
    console.log('1️⃣ Simulating User Message via GOWA API...');
    const userMessage = {
      phone: TEST_PHONE,
      message: 'buat surat undangan untuk Test Simulation di Jakarta 8 September 2024'
    };

    console.log('📤 Sending user message:', JSON.stringify(userMessage, null, 2));

    const gowaResponse = await axios.post(`${GOWA_API_URL}/send/message`, userMessage, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
      },
      timeout: 15000
    });

    console.log('✅ User message sent via GOWA!');
    console.log('📊 Response:', JSON.stringify(gowaResponse.data, null, 2));

    // Step 2: Wait a moment
    console.log('\n⏳ Waiting 2 seconds...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 3: Simulate GOWA sending webhook to bot server
    console.log('\n2️⃣ Simulating GOWA Webhook to Bot Server...');
    const webhookPayload = {
      type: 'message',
      message: {
        from: TEST_PHONE,
        type: 'text',
        text: 'buat surat undangan untuk Test Simulation di Jakarta 8 September 2024'
      }
    };

    console.log('📤 Sending webhook to bot server:', JSON.stringify(webhookPayload, null, 2));

    const webhookResponse = await axios.post(`${BOT_SERVER_URL}/webhook`, webhookPayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Hub-Signature-256': 'sha256=test'
      },
      timeout: 15000
    });

    console.log('✅ Webhook sent to bot server!');
    console.log('📊 Response:', JSON.stringify(webhookResponse.data, null, 2));

    // Step 4: Wait for bot to process and send response
    console.log('\n⏳ Waiting 5 seconds for bot to process...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Step 5: Send another message to test help command
    console.log('\n3️⃣ Testing Help Command...');
    const helpMessage = {
      phone: TEST_PHONE,
      message: 'help'
    };

    console.log('📤 Sending help command:', JSON.stringify(helpMessage, null, 2));

    const helpResponse = await axios.post(`${GOWA_API_URL}/send/message`, helpMessage, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
      },
      timeout: 15000
    });

    console.log('✅ Help command sent!');
    console.log('📊 Response:', JSON.stringify(helpResponse.data, null, 2));

    // Step 6: Trigger webhook for help command
    console.log('\n4️⃣ Triggering Webhook for Help Command...');
    const helpWebhookPayload = {
      type: 'message',
      message: {
        from: TEST_PHONE,
        type: 'text',
        text: 'help'
      }
    };

    const helpWebhookResponse = await axios.post(`${BOT_SERVER_URL}/webhook`, helpWebhookPayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Hub-Signature-256': 'sha256=test'
      },
      timeout: 15000
    });

    console.log('✅ Help webhook triggered!');
    console.log('📊 Response:', JSON.stringify(helpWebhookResponse.data, null, 2));

    console.log('\n📱 Check your WhatsApp for bot responses!');
    console.log('⏳ Bot should have sent:');
    console.log('   - Help message for "help" command');
    console.log('   - Document for template request');
    console.log('   - Error message for invalid commands');

  } catch (error) {
    console.log('❌ Simulation Failed:', error.message);
    if (error.response) {
      console.log('📊 Response Status:', error.response.status);
      console.log('📊 Response Data:', error.response.data);
    }
  }
}

console.log('🚀 Starting GOWA Webhook Simulation');
console.log('');

simulateGOWAWebhook().catch(console.error);
