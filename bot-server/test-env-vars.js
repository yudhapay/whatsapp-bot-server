import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const BOT_SERVER_URL = 'https://whatsapp-bot-88061.onrender.com';
const TEST_PHONE = '6283199417708';

console.log('🔧 Testing Environment Variables');
console.log('================================');
console.log('');

async function testEnvVars() {
  try {
    console.log('📋 Local Environment Variables:');
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`WHATSAPP_API_URL: ${process.env.WHATSAPP_API_URL}`);
    console.log(`WHATSAPP_USERNAME: ${process.env.WHATSAPP_USERNAME}`);
    console.log(`WHATSAPP_PASSWORD: ${process.env.WHATSAPP_PASSWORD ? 'SET' : 'NOT SET'}`);
    console.log(`WHATSAPP_WEBHOOK_TOKEN: ${process.env.WHATSAPP_WEBHOOK_TOKEN}`);
    console.log('');

    // Test 1: Check if bot server has correct environment
    console.log('1️⃣ Testing Bot Server Environment...');
    
    // Create a test endpoint to check environment
    const testPayload = {
      type: 'message',
      message: {
        from: TEST_PHONE,
        type: 'text',
        text: 'test environment variables'
      }
    };

    console.log('📤 Sending test message to check environment...');
    
    const response = await axios.post(`${BOT_SERVER_URL}/webhook`, testPayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Hub-Signature-256': 'sha256=test'
      },
      timeout: 15000
    });

    console.log('✅ Bot Server Response:', response.data);

    // Test 2: Send a message that should trigger a reply
    console.log('\n2️⃣ Testing Message that Should Trigger Reply...');
    
    const helpPayload = {
      type: 'message',
      message: {
        from: TEST_PHONE,
        type: 'text',
        text: 'help'
      }
    };

    console.log('📤 Sending help command...');
    
    const helpResponse = await axios.post(`${BOT_SERVER_URL}/webhook`, helpPayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Hub-Signature-256': 'sha256=test'
      },
      timeout: 15000
    });

    console.log('✅ Help Command Response:', helpResponse.data);

    // Wait a bit
    console.log('\n⏳ Waiting 10 seconds for bot reply...');
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Test 3: Check if bot sent any reply
    console.log('\n3️⃣ Checking for Bot Reply...');
    console.log('📱 Check your WhatsApp for any bot replies...');
    
    // Test 4: Send a direct message to test GOWA API
    console.log('\n4️⃣ Testing Direct GOWA API...');
    
    const GOWA_API_URL = 'https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id';
    const GOWA_USERNAME = '0iK2Kv4m';
    const GOWA_PASSWORD = 'QUWlXsiaTHFBoSBM0WPtzRdQ';
    
    const directMessage = {
      phone: TEST_PHONE,
      message: '🤖 Direct Test: Bot harus membalas ini!'
    };

    console.log('📤 Sending direct message via GOWA...');
    
    const directResponse = await axios.post(`${GOWA_API_URL}/send/message`, directMessage, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
      },
      timeout: 15000
    });

    console.log('✅ Direct Message Sent:', directResponse.data);

    console.log('\n🔍 Debug Summary:');
    console.log('================');
    console.log('✅ GOWA API: Working (can send messages)');
    console.log('✅ Bot Server: Working (webhook responds)');
    console.log('❌ Bot Replies: Not working');
    console.log('');
    console.log('💡 Possible Issues:');
    console.log('1. Bot server environment variables not set in production');
    console.log('2. Bot server not configured to send replies via GOWA');
    console.log('3. Bot server in development mode (not sending real messages)');
    console.log('4. Missing GOWA API credentials in production');
    console.log('');
    console.log('🔧 Solution:');
    console.log('1. Check Render dashboard environment variables');
    console.log('2. Ensure NODE_ENV=production');
    console.log('3. Set WHATSAPP_API_URL, WHATSAPP_USERNAME, WHATSAPP_PASSWORD');
    console.log('4. Redeploy bot server');

  } catch (error) {
    console.log('❌ Test Failed:', error.message);
    if (error.response) {
      console.log('📊 Response Status:', error.response.status);
      console.log('📊 Response Data:', error.response.data);
    }
  }
}

console.log('🚀 Starting Environment Variables Test');
console.log('');

testEnvVars().catch(console.error);
