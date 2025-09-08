# WhatsApp Bot Server

Bot server untuk mengelola template dokumen WhatsApp dengan integrasi Supabase.

## 🚀 Fitur

- ✅ Webhook endpoint untuk menerima pesan WhatsApp
- ✅ Parsing pesan user otomatis
- ✅ Template dokumen dari Supabase Storage
- ✅ Generate dokumen Word (.docx) dengan data dinamis
- ✅ Kirim dokumen langsung ke WhatsApp
- ✅ Error handling dan logging lengkap
- ✅ PM2 untuk production deployment

## 📋 Prerequisites

- Node.js 18+ 
- npm atau yarn
- Akun WhatsApp Go API
- Akun Supabase
- PM2 (untuk production)

## 🛠️ Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd bot-server
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit file `.env` dengan konfigurasi yang sesuai:
```env
# WhatsApp Go API Configuration
WHATSAPP_API_URL=https://api.whatsapp-go.com
WHATSAPP_API_KEY=your_whatsapp_api_key_here
WHATSAPP_WEBHOOK_TOKEN=your_webhook_token_here

# Supabase Configuration
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Server Configuration
PORT=3000
NODE_ENV=development
```

4. **Buat folder logs**
```bash
mkdir logs
```

## 🚀 Running

### Development
```bash
npm run dev
```

### Production
```bash
# Start dengan PM2
npm run pm2:start

# Stop
npm run pm2:stop

# Restart
npm run pm2:restart
```

## 📱 Webhook Setup

1. **Endpoint URL**: `https://your-domain.com/webhook`
2. **Verification Token**: Gunakan token dari `.env` file
3. **Webhook Fields**: `messages`

## 🔧 API Endpoints

- `GET /health` - Health check
- `GET /webhook` - Webhook verification
- `POST /webhook` - Receive WhatsApp messages

## 📝 Cara Penggunaan

User mengirim pesan dengan format:
```
buat [nama_template] untuk [nama] di [lokasi] [tanggal]
```

**Contoh:**
```
buat surat undangan untuk Andi di Jakarta 8 September 2024
```

## 🗂️ Struktur Proyek

```
bot-server/
├── src/
│   ├── controllers/
│   │   └── webhookController.js
│   ├── routes/
│   │   └── webhook.js
│   ├── services/
│   │   ├── messageService.js
│   │   └── templateService.js
│   ├── middleware/
│   │   └── verifyWebhook.js
│   ├── utils/
│   │   └── logger.js
│   └── server.js
├── logs/
├── package.json
├── ecosystem.config.js
├── .env.example
└── README.md
```

## 🚀 Deployment ke Render

1. **Push ke GitHub**
2. **Connect ke Render**
3. **Set environment variables**
4. **Deploy**

## 🔍 Logging

Logs tersimpan di folder `logs/`:
- `combined.log` - Semua log
- `error.log` - Error log saja
- `out.log` - Output log

## 🐛 Troubleshooting

### Bot tidak merespon
1. Cek webhook URL di WhatsApp Go dashboard
2. Cek logs di folder `logs/`
3. Pastikan environment variables sudah benar

### Template tidak ditemukan
1. Pastikan template sudah diupload ke Supabase Storage
2. Cek nama template sesuai dengan yang diminta user
3. Pastikan file berekstensi `.docx`

### Error saat generate dokumen
1. Cek format template (harus .docx)
2. Pastikan placeholder menggunakan format `[NAMA]`, `[LOKASI]`, `[TANGGAL]`
3. Cek logs untuk detail error

## 📞 Support

Jika ada masalah, cek:
1. Logs di folder `logs/`
2. Environment variables
3. Supabase connection
4. WhatsApp Go API status

# Test trigger
