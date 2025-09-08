# Render Environment Setup Guide

## Overview
Panduan lengkap untuk mengatur environment variables di Render untuk deployment WhatsApp Bot Server dan Admin Web.

## 1. GitHub Secrets Setup

### Menggunakan GitHub CLI (Recommended)
```bash
# Install GitHub CLI jika belum ada
# https://cli.github.com/

# Set Render Configuration
gh secret set RENDER_API_KEY --body 'your_render_api_key_here'
gh secret set RENDER_SERVICE_ID_V2 --body 'your_bot_service_id_here'
gh secret set RENDER_ADMIN_SERVICE_ID_V2 --body 'your_admin_service_id_here'

# Set WhatsApp Configuration
gh secret set WHATSAPP_API_URL --body 'https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id'
gh secret set WHATSAPP_USERNAME --body '0iK2Kv4m'
gh secret set WHATSAPP_PASSWORD --body 'QUWlXsiaTHFBoSBM0WPtzRdQ'
gh secret set WHATSAPP_WEBHOOK_TOKEN --body 'test_webhook_token_123'

# Set Supabase Configuration
gh secret set SUPABASE_URL --body 'https://cwixdvfffqjeyhbvxsph.supabase.co'
gh secret set SUPABASE_ANON_KEY --body 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzkzNTEsImV4cCI6MjA3Mjg1NTM1MX0.m6VyCTNUuxEsSbDb7v0fem_wx7rlTjiyrg1Yoym04x8'
gh secret set SUPABASE_SERVICE_ROLE_KEY --body 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzI3OTM1MSwiZXhwIjoyMDcyODU1MzUxfQ.IJSWJBcQLtnctjVArr9UeN-bcd_gDzUlUXKqIHOoeMA'

# Set AI Configuration
gh secret set GEMINI_API_KEY --body 'AIzaSyAAds8Bj0-0xY7n9ZEk4jYeCFdYfYzVZmk'
```

### Menggunakan GitHub Web Interface
1. Buka repository di GitHub
2. Klik **Settings** > **Secrets and variables** > **Actions**
3. Klik **New repository secret**
4. Tambahkan setiap secret dengan nama dan nilai yang sesuai

## 2. Render Dashboard Setup

### Bot Server Environment Variables
1. Buka dashboard Render untuk service bot server
2. Klik **Environment** tab
3. Tambahkan environment variables berikut:

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

### Admin Web Environment Variables
1. Buka dashboard Render untuk service admin web
2. Klik **Environment** tab
3. Tambahkan environment variables berikut:

```
VITE_SUPABASE_URL=https://cwixdvfffqjeyhbvxsph.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzkzNTEsImV4cCI6MjA3Mjg1NTM1MX0.m6VyCTNUuxEsSbDb7v0fem_wx7rlTjiyrg1Yoym04x8
VITE_APP_NAME=WhatsApp Template Admin
VITE_APP_VERSION=1.0.0
```

## 3. File Konfigurasi

### GitHub Actions Workflow
File `.github/workflows/deploy-to-render.yml` sudah dikonfigurasi untuk menggunakan GitHub Secrets.

### Render YAML
- `bot-server/render.yaml` - Konfigurasi untuk bot server
- `admin-web/render.yaml` - Konfigurasi untuk admin web

### Environment Files
- `env.production.secure` - Template environment variables
- `setup-github-secrets.sh` - Script untuk setup GitHub secrets

## 4. Verifikasi Setup

### Cek GitHub Secrets
```bash
gh secret list
```

### Cek Render Environment
1. Buka dashboard Render
2. Pastikan semua environment variables sudah ter-set dengan benar
3. Cek logs deployment untuk memastikan tidak ada error

### Test Deployment
1. Push ke branch `main` atau `production`
2. Monitor GitHub Actions workflow
3. Cek status deployment di Render dashboard

## 5. Troubleshooting

### Common Issues
1. **Missing Environment Variables**: Pastikan semua required env vars sudah di-set
2. **Invalid Secrets**: Pastikan nilai secrets sudah benar
3. **Build Failures**: Cek logs di GitHub Actions dan Render

### Debug Commands
```bash
# Test environment variables locally
node -e "console.log(process.env)"

# Check GitHub secrets
gh secret list

# View Render logs
# (Gunakan dashboard Render)
```

## 6. Security Notes

- Jangan commit sensitive values ke repository
- Gunakan GitHub Secrets untuk nilai yang sensitif
- Rotate API keys secara berkala
- Monitor access logs

## 7. Next Steps

1. Setup GitHub Secrets menggunakan script `setup-github-secrets.sh`
2. Konfigurasi environment variables di Render dashboard
3. Test deployment dengan push ke branch main
4. Monitor logs dan performance
5. Setup monitoring dan alerting jika diperlukan
