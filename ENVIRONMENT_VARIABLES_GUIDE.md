# 🔧 Environment Variables Guide

## Apa itu Environment Variables?

Environment variables adalah konfigurasi yang dibutuhkan oleh aplikasi untuk berjalan dengan benar di production. Mereka berisi informasi sensitif seperti API keys, database URLs, dan konfigurasi lainnya.

## 📋 Daftar Environment Variables untuk WhatsApp Bot Server

### 1. **Basic Configuration**
```
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
```

### 2. **WhatsApp API Configuration**
```
WHATSAPP_API_URL=https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id
WHATSAPP_USERNAME=0iK2Kv4m
WHATSAPP_PASSWORD=QUWlXsiaTHFBoSBM0WPtzRdQ
WHATSAPP_WEBHOOK_TOKEN=test_webhook_token_123
```

### 3. **Supabase Database Configuration**
```
SUPABASE_URL=https://cwixdvfffqjeyhbvxsph.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzkzNTEsImV4cCI6MjA3Mjg1NTM1MX0.m6VyCTNUuxEsSbDb7v0fem_wx7rlTjiyrg1Yoym04x8
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzI3OTM1MSwiZXhwIjoyMDcyODU1MzUxfQ.IJSWJBcQLtnctjVArr9UeN-bcd_gDzUlUXKqIHOoeMA
```

### 4. **AI Configuration**
```
GEMINI_API_KEY=AIzaSyAAds8Bj0-0xY7n9ZEk4jYeCFdYfYzVZmk
```

## 🚀 Cara Menambahkan Environment Variables di Render

### Step 1: Buka Render Dashboard
1. Login ke https://dashboard.render.com
2. Pilih service `whatsapp-bot-88061`
3. Klik tab **"Environment"**

### Step 2: Tambahkan Environment Variables
1. Klik **"Add Environment Variable"**
2. Masukkan **Key** dan **Value**
3. Klik **"Save Changes"**

### Step 3: Deploy Ulang
1. Klik **"Manual Deploy"** atau **"Redeploy"**
2. Tunggu deployment selesai

## 📝 Copy-Paste Ready

Berikut adalah environment variables yang siap copy-paste:

```bash
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

## 🔍 Penjelasan Setiap Environment Variable

### **NODE_ENV**
- **Fungsi**: Menentukan environment aplikasi
- **Value**: `production`
- **Penting**: Ya, untuk optimasi production

### **PORT**
- **Fungsi**: Port yang digunakan oleh server
- **Value**: `3000`
- **Penting**: Ya, Render akan menggunakan port ini

### **LOG_LEVEL**
- **Fungsi**: Level logging aplikasi
- **Value**: `info`
- **Penting**: Tidak, untuk debugging

### **WHATSAPP_API_URL**
- **Fungsi**: URL API WhatsApp (GOWA)
- **Value**: `https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id`
- **Penting**: Ya, untuk komunikasi dengan WhatsApp

### **WHATSAPP_USERNAME & PASSWORD**
- **Fungsi**: Kredensial untuk akses WhatsApp API
- **Penting**: Ya, untuk autentikasi

### **WHATSAPP_WEBHOOK_TOKEN**
- **Fungsi**: Token untuk verifikasi webhook
- **Value**: `test_webhook_token_123`
- **Penting**: Ya, untuk keamanan webhook

### **SUPABASE_URL & KEYS**
- **Fungsi**: Konfigurasi database Supabase
- **Penting**: Ya, untuk menyimpan data

### **GEMINI_API_KEY**
- **Fungsi**: API key untuk Google Gemini AI
- **Penting**: Ya, untuk fitur AI

## ⚠️ Troubleshooting

### Jika Service Tidak Start
1. **Check Environment Variables**: Pastikan semua sudah di-set
2. **Check Logs**: Lihat error di Render dashboard
3. **Check Format**: Pastikan tidak ada spasi extra

### Jika Health Endpoint Tidak Bekerja
1. **Check PORT**: Pastikan PORT=3000
2. **Check NODE_ENV**: Pastikan NODE_ENV=production
3. **Check Logs**: Lihat error di Render dashboard

## 🎯 Next Steps

1. **Copy environment variables** di atas
2. **Paste ke Render dashboard** di tab Environment
3. **Save changes**
4. **Redeploy service**
5. **Test dengan** `./monitor-after-setup.sh`

---

**Total Environment Variables: 11**
**Wajib di-set: 8**
**Opsional: 3**
