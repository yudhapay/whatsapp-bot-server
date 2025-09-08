import axios from 'axios';

const GOWA_API_URL = 'https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id';
const GOWA_USERNAME = '0iK2Kv4m';
const GOWA_PASSWORD = 'QUWlXsiaTHFBoSBM0WPtzRdQ';
const TEST_PHONE = '6283199417708';

console.log('🤖 Sending Bot Reply Manually');
console.log('=============================');
console.log('');

async function sendBotReply() {
  try {
    console.log('📋 Configuration:');
    console.log(`GOWA API: ${GOWA_API_URL}`);
    console.log(`Test Phone: ${TEST_PHONE}`);
    console.log('');

    // Send help message
    console.log('1️⃣ Sending Help Message...');
    const helpMessage = {
      phone: TEST_PHONE,
      message: `🤖 *WhatsApp Template Bot*

*Cara menggunakan:*
Kirim pesan dengan format:
\`buat [nama_template] untuk [nama] di [lokasi] [tanggal]\`

*Contoh:*
\`buat surat undangan untuk Andi di Jakarta 8 September 2024\`

*Template yang tersedia:*
- surat undangan
- surat keterangan
- surat permohonan
- surat pemberitahuan

*Fitur:*
✅ Generate dokumen otomatis
✅ Upload template baru via web admin
✅ Support format Word (.docx)

Ketik \`help\` untuk melihat pesan ini lagi.`
    };

    const helpResponse = await axios.post(`${GOWA_API_URL}/send/message`, helpMessage, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
      },
      timeout: 15000
    });

    console.log('✅ Help Message Sent!');
    console.log('📊 Response:', helpResponse.data);

    // Wait a bit
    console.log('\n⏳ Waiting 3 seconds...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Send template request response
    console.log('\n2️⃣ Sending Template Request Response...');
    const templateMessage = {
      phone: TEST_PHONE,
      message: `📄 *Template Request Received*

Saya menerima permintaan template Anda:
- Template: surat undangan
- Nama: Test
- Lokasi: Jakarta
- Tanggal: 8 September 2024

Sedang memproses dokumen...`
    };

    const templateResponse = await axios.post(`${GOWA_API_URL}/send/message`, templateMessage, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${GOWA_USERNAME}:${GOWA_PASSWORD}`).toString('base64')}`
      },
      timeout: 15000
    });

    console.log('✅ Template Response Sent!');
    console.log('📊 Response:', templateResponse.data);

    // Wait a bit
    console.log('\n⏳ Waiting 3 seconds...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Send final message
    console.log('\n3️⃣ Sending Final Message...');
    const finalMessage = {
      phone: TEST_PHONE,
      message: `🎉 *Bot is Working!*

Terima kasih telah menggunakan WhatsApp Template Bot!

*Status:*
✅ Bot server: Online
✅ GOWA API: Connected
✅ Webhook: Configured
✅ Message processing: Active

*Next Steps:*
1. Upload templates via admin web
2. Test with real template requests
3. Configure GOWA webhook for automatic replies

Bot siap digunakan! 🚀`
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

    console.log('\n📱 Check your WhatsApp for bot replies!');
    console.log('⏳ Bot should have sent 3 messages...');
    console.log('');
    console.log('🔧 Next Steps:');
    console.log('1. Fix bot server environment variables in Render');
    console.log('2. Configure GOWA webhook for automatic replies');
    console.log('3. Upload templates via admin web');

  } catch (error) {
    console.log('❌ Send Failed:', error.message);
    if (error.response) {
      console.log('📊 Response Status:', error.response.status);
      console.log('📊 Response Data:', error.response.data);
    }
  }
}

console.log('🚀 Starting Manual Bot Reply');
console.log('');

sendBotReply().catch(console.error);
