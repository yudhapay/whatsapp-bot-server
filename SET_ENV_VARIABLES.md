# 🔧 Set Environment Variables di Render Dashboard

## Langkah 4: Set Environment Variables

### 📋 **Yang Perlu Anda Lakukan:**

#### 1. **Set Environment Variables untuk Bot Server**

**Buka Bot Server Service:**
- Pergi ke: https://dashboard.render.com/web/srv-d2v1ft8gjchc73apglig
- Klik tab **"Environment"**
- Klik **"Add Environment Variable"**

**Tambahkan Environment Variables berikut:**
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

**Klik "Save Changes"**

#### 2. **Set Environment Variables untuk Admin Web**

**Buka Admin Web Service:**
- Pergi ke: https://dashboard.render.com/static/srv-d2v3d4nfte5s73bn04sg
- Klik tab **"Environment"**
- Klik **"Add Environment Variable"**

**Tambahkan Environment Variables berikut:**
```
VITE_SUPABASE_URL=https://cwixdvfffqjeyhbvxsph.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzkzNTEsImV4cCI6MjA3Mjg1NTM1MX0.m6VyCTNUuxEsSbDb7v0fem_wx7rlTjiyrg1Yoym04x8
VITE_APP_NAME=WhatsApp Template Admin
VITE_APP_VERSION=1.0.0
```

**Klik "Save Changes"**

### ⚠️ **Catatan Penting:**
- Pastikan semua environment variables ditambahkan dengan benar
- Double-check nilai-nilai sebelum save
- Setelah save, service akan otomatis redeploy

### 🔄 **Langkah Selanjutnya:**
Setelah environment variables di-set, kita akan test deployment dan verifikasi bahwa semuanya berjalan dengan baik.

## 🎯 **TARGET:**
Set environment variables di kedua service (Bot Server dan Admin Web)
