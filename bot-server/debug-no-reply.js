import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const GOWA_API_URL = process.env.WHATSAPP_API_URL || 'https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id';
const GOWA_USERNAME = process.env.WHATSAPP_USERNAME || '0iK2Kv4m';
const GOWA_PASSWORD = process.env.WHATSAPP_PASSWORD || 'QUWlXsiaTHFBoSBM0WPtzRdQ';
const BOT_SERVER_URL = 'https://whatsapp-bot-88061.onrender.com';
const TEST_PHONE = '6283199417708';

console.log('🔍 DEBUG: Bot Tidak Membalas');
console.log('============================');
console.log('');

async function debugNoReply() {
  try {
    console.log('📋 Configuration:');
    console.log(`GOWA API: ${GOWA_API_URL}`);
    console.log(`Bot Server: ${BOT_SERVER_URL}`);
    console.log(`Test Phone: ${TEST_PHONE}`);
    console.log('');

    // Test 1: Check if bot server is processing messages
    console.log('1️⃣ Testing Bot Server Message Processing...');
    
    const webhookPayload = {
      type: 'message',
      message: {
        from: TEST_PHONE,
        type: 'text',
        text: 'help'
      }
    };

    console.log('📤 Sending webhook to bot server...');
    console.log('Payload:', JSON.stringify(webhookPayload, null, 2));

    const webhookResponse = await axios.post(`${BOT_SERVER_URL}/webhook`, webhookPayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Hub-Signature-256': 'sha256=test'
      },
      timeout: 15000
    });

    console.log('✅ Webhook Response:', webhookResponse.data);

    // Wait a bit
    console.log('\n⏳ Waiting 5 seconds...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Test 2: Check if bot is trying to send reply
    console.log('\n2️⃣ Testing Bot Reply via GOWA API...');
    
    const replyMessage = {
      phone: TEST_PHONE,
      message: '🤖 Bot Reply: Ini adalah balasan dari bot untuk test!'
    };

    console.log('📤 Sending bot reply via GOWA...');
    console.log('Payload:', JSON.stringify(replyMessage, null, 2));

    const replyResponse = await axios.post(`${GOWA_API_URL}/send/message`, replyMessage, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
      },
      timeout: 15000
    });

    console.log('✅ Bot Reply Sent!');
    console.log('📊 Response:', JSON.stringify(replyResponse.data, null, 2));

    // Test 3: Test different message formats
    console.log('\n3️⃣ Testing Different Message Formats...');
    
    const testMessages = [
      {
        name: 'Simple Text',
        message: 'Halo bot, apakah kamu mendengar saya?'
      },
      {
        name: 'Help Command',
        message: 'help'
      },
      {
        name: 'Template Request',
        message: 'buat surat undangan untuk Test Debug di Jakarta 8 September 2024'
      }
    ];

    for (const test of testMessages) {
      console.log(`\n📝 Testing: ${test.name}`);
      
      // Send via GOWA
      const gowaPayload = {
        phone: TEST_PHONE,
        message: test.message
      };

      try {
        const gowaResponse = await axios.post(`${GOWA_API_URL}/send/message`, gowaPayload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
          },
          timeout: 15000
        });

        console.log(`✅ ${test.name} sent via GOWA:`, gowaResponse.data.code);

        // Wait a bit
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Trigger webhook
        const webhookPayload = {
          type: 'message',
          message: {
            from: TEST_PHONE,
            type: 'text',
            text: test.message
          }
        };

        const webhookResponse = await axios.post(`${BOT_SERVER_URL}/webhook`, webhookPayload, {
          headers: {
            'Content-Type': 'application/json',
            'X-Hub-Signature-256': 'sha256=test'
          },
          timeout: 15000
        });

        console.log(`✅ ${test.name} webhook triggered:`, webhookResponse.data.status);

      } catch (error) {
        console.log(`❌ ${test.name} failed:`, error.message);
      }
    }

    console.log('\n📱 Check your WhatsApp for messages!');
    console.log('⏳ Bot should have sent replies...');
    console.log('');
    console.log('🔍 Debug Summary:');
    console.log('- GOWA API: Working (can send messages)');
    console.log('- Bot Server: Working (webhook responds)');
    console.log('- Issue: Bot not sending replies back to WhatsApp');
    console.log('');
    console.log('💡 Possible Issues:');
    console.log('1. Bot server not configured to send replies via GOWA');
    console.log('2. Environment variables not set correctly');
    console.log('3. Bot server not in production mode');
    console.log('4. GOWA webhook not configured to send messages back');

  } catch (error) {
    console.log('❌ Debug Failed:', error.message);
    if (error.response) {
      console.log('📊 Response Status:', error.response.status);
      console.log('📊 Response Data:', error.response.data);
    }
  }
}

console.log('🚀 Starting Debug Session');
console.log('');

debugNoReply().catch(console.error);
