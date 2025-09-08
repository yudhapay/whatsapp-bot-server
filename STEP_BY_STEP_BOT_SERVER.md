# 🤖 Langkah 1: Set Environment Variables untuk Bot Server

## 📋 **Yang Perlu Anda Lakukan SEKARANG:**

### 1. **Buka Bot Server Service**
- Klik link ini: https://dashboard.render.com/web/srv-d2v1ft8gjchc73apglig
- Atau buka Render dashboard → cari service `whatsapp-bot-88061` → klik

### 2. **Buka Tab Environment**
- Di halaman service, klik tab **"Environment"**
- Anda akan melihat daftar environment variables yang sudah ada

### 3. **Tambahkan Environment Variables Satu Per Satu**
Klik **"Add Environment Variable"** dan tambahkan satu per satu:

**Variable 1:**
- Key: `NODE_ENV`
- Value: `production`

**Variable 2:**
- Key: `PORT`
- Value: `3000`

**Variable 3:**
- Key: `LOG_LEVEL`
- Value: `info`

**Variable 4:**
- Key: `WHATSAPP_API_URL`
- Value: `https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id`

**Variable 5:**
- Key: `WHATSAPP_USERNAME`
- Value: `0iK2Kv4m`

**Variable 6:**
- Key: `WHATSAPP_PASSWORD`
- Value: `QUWlXsiaTHFBoSBM0WPtzRdQ`

**Variable 7:**
- Key: `WHATSAPP_WEBHOOK_TOKEN`
- Value: `test_webhook_token_123`

**Variable 8:**
- Key: `SUPABASE_URL`
- Value: `https://cwixdvfffqjeyhbvxsph.supabase.co`

**Variable 9:**
- Key: `SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzkzNTEsImV4cCI6MjA3Mjg1NTM1MX0.m6VyCTNUuxEsSbDb7v0fem_wx7rlTjiyrg1Yoym04x8`

**Variable 10:**
- Key: `SUPABASE_SERVICE_ROLE_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzI3OTM1MSwiZXhwIjoyMDcyODU1MzUxfQ.IJSWJBcQLtnctjVArr9UeN-bcd_gDzUlUXKqIHOoeMA`

**Variable 11:**
- Key: `GEMINI_API_KEY`
- Value: `AIzaSyAAds8Bj0-0xY7n9ZEk4jYeCFdYfYzVZmk`

### 4. **Save Changes**
- Setelah semua variables ditambahkan, klik **"Save Changes"**
- Service akan otomatis redeploy

### 5. **Tunggu Deployment Selesai**
- Tunggu sampai status menjadi "Live" lagi
- Proses ini bisa memakan waktu 2-5 menit

## ⚠️ **Catatan Penting:**
- Tambahkan satu per satu, jangan sekaligus
- Pastikan copy-paste dengan benar
- Jangan ada spasi tambahan di awal atau akhir

## 🔄 **Langkah Selanjutnya:**
Setelah Bot Server selesai, kita akan lanjut ke Admin Web.

## 🎯 **TARGET SEKARANG:**
Set 11 environment variables untuk Bot Server
