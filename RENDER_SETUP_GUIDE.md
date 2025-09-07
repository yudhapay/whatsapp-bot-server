# 🚀 Render.com Setup Guide

## Masalah Saat Ini
- Service `whatsapp-bot-88061` mengembalikan `x-render-routing: no-server`
- Ini menunjukkan service belum terdeploy dengan benar di Render
- GitHub Actions mungkin tidak terkonfigurasi dengan benar

## Langkah-langkah Konfigurasi Render

### 1. Manual Setup di Render Dashboard

#### A. Buat Service Baru
1. **Login ke Render Dashboard**: https://dashboard.render.com
2. **Klik "New +"** → **"Web Service"**
3. **Connect Repository**: Pilih GitHub repository `yudhapay/whatsapp-bot-server`
4. **Configure Service**:
   - **Name**: `whatsapp-bot-88061`
   - **Environment**: `Node`
   - **Region**: `Singapore`
   - **Branch**: `main`
   - **Root Directory**: `bot-server`
   - **Build Command**: `npm ci --production`
   - **Start Command**: `npm start`

#### B. Environment Variables
Tambahkan environment variables berikut di Render dashboard:

```
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
WHATSAPP_API_URL=https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id
WHATSAPP_USERNAME=0iK2Kv4m
WHATSAPP_PASSWORD=QUWlXsiaTHFBoSBM0WPtzRdQ
WHATSAPP_WEBHOOK_TOKEN=test_webhook_token_123
SUPABASE_URL=https://cwixdvfffqjeyhbvxsph.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzkzNTEsImV4cCI6MjA3Mjg1NTM1MX0.m6VyCTNUuxEsSbDb7v0fem_wx7rlTjiyrg1Yoym04x8
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzI3OTM1MSwiZXhwIjoyMDcyODU1MzUxfQ.IJSWJBcQLtnctjVArr9UeN-bcd_gDzUlUXKqIHOoeMA
GEMINI_API_KEY=AIzaSyAAds8Bj0-0xY7n9ZEk4jYeCFdYfYzVZmk
```

#### C. Advanced Settings
- **Health Check Path**: `/health`
- **Auto-Deploy**: `Yes`
- **Plan**: `Free`

### 2. GitHub Actions Configuration

#### A. Update GitHub Secrets
Di GitHub repository settings, tambahkan secrets berikut:

1. **RENDER_API_KEY**: API key dari Render dashboard
2. **RENDER_SERVICE_ID**: Service ID dari Render dashboard
3. **RENDER_ADMIN_SERVICE_ID**: (opsional, untuk admin web)

#### B. Cara Mendapatkan API Key
1. Di Render dashboard, klik **Account Settings**
2. Scroll ke **API Keys**
3. Klik **Create API Key**
4. Copy dan paste ke GitHub secrets

#### C. Cara Mendapatkan Service ID
1. Di service page, URL akan seperti: `https://dashboard.render.com/web/srv-xxxxx`
2. Service ID adalah bagian `srv-xxxxx`

### 3. Alternative: Deploy dengan Render CLI

#### A. Install Render CLI
```bash
curl -fsSL https://cli.render.com/install | sh
```

#### B. Login ke Render
```bash
render auth login
```

#### C. Deploy Service
```bash
cd bot-server
render services create --name whatsapp-bot-88061 --type web --env node --plan free --region singapore --build-command "npm ci --production" --start-command "npm start" --health-check-path "/health"
```

### 4. Troubleshooting

#### A. Jika Service Tidak Start
1. **Check Logs**: Di Render dashboard, klik **Logs** tab
2. **Common Issues**:
   - Port tidak sesuai (harus 3000)
   - Environment variables tidak set
   - Build command gagal
   - Dependencies tidak terinstall

#### B. Jika Health Check Gagal
1. **Verify Health Endpoint**: Pastikan `/health` endpoint ada di server
2. **Check Response Format**: Harus return JSON dengan status
3. **Test Locally**: Test endpoint di local dulu

#### C. Jika Webhook Tidak Bekerja
1. **Check Route**: Pastikan `/webhook` route terdefinisi
2. **Check Method**: Pastikan menerima POST request
3. **Check Headers**: Pastikan Content-Type: application/json

### 5. Testing Setelah Setup

#### A. Test Health Endpoint
```bash
curl -s https://whatsapp-bot-88061.onrender.com/health
```

#### B. Test Webhook Endpoint
```bash
curl -s -X POST https://whatsapp-bot-88061.onrender.com/webhook \
  -H "Content-Type: application/json" \
  -d '{"message": "test", "from": "test_user"}'
```

#### C. Test Root Endpoint
```bash
curl -s https://whatsapp-bot-88061.onrender.com/
```

### 6. Monitoring

#### A. Render Dashboard
- **Service Status**: Check apakah service running
- **Logs**: Monitor error dan warning
- **Metrics**: CPU, Memory, Response time

#### B. GitHub Actions
- **Workflow Status**: Check deployment status
- **Build Logs**: Check build errors
- **Deploy Logs**: Check deployment errors

## Next Steps

1. **Setup Manual di Render Dashboard** (Recommended)
2. **Update GitHub Secrets** dengan API key dan service ID
3. **Test Endpoints** setelah deployment
4. **Monitor Logs** untuk memastikan service berjalan

## Support

- **Render Documentation**: https://render.com/docs
- **GitHub Actions**: https://docs.github.com/en/actions
- **Service URL**: https://whatsapp-bot-88061.onrender.com
