# 🤖 Test Bot WhatsApp Manual

## 🔍 **Analisis Masalah:**
Bot menggunakan **GOWA API** yang berbeda dari WhatsApp Business API standar. GOWA API tidak memerlukan webhook setup di dashboard.

## 🔧 **Solusi: Test Bot Manual**

### **Langkah 1: Test Webhook Endpoint Langsung**
```bash
# Test dengan data pesan WhatsApp
curl -X POST https://whatsapp-bot-88061.onrender.com/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "type": "message",
    "message": {
      "from": "6289661687111",
      "type": "text",
      "text": "buat surat undangan untuk Andi di Jakarta 8 September 2024"
    }
  }'
```

### **Langkah 2: Cek Logs Bot Server**
1. Buka Render dashboard: https://dashboard.render.com/web/srv-d2v1ft8gjchc73apglig
2. Klik tab **"Logs"**
3. Lihat apakah ada error atau pesan masuk

### **Langkah 3: Test dengan Nomor WhatsApp Asli**
1. Pastikan nomor WhatsApp sudah terhubung dengan GOWA API
2. Kirim pesan ke nomor yang terhubung
3. Cek logs di Render dashboard

## 🔍 **Debug Steps:**

### **Test 1: Cek Environment Variables**
```bash
curl https://whatsapp-bot-88061.onrender.com/health
```

### **Test 2: Test Webhook dengan Data Dummy**
```bash
curl -X POST https://whatsapp-bot-88061.onrender.com/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "type": "message",
    "message": {
      "from": "6289661687111",
      "type": "text",
      "text": "help"
    }
  }'
```

### **Test 3: Cek GOWA API Connection**
```bash
curl -X POST https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id/send/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic $(echo -n '0iK2Kv4m:QUWlXsiaTHFBoSBM0WPtzRdQ' | base64)" \
  -d '{
    "phone": "6289661687111",
    "message": "Test dari bot server"
  }'
```

## ⚠️ **Kemungkinan Masalah:**
1. **GOWA API tidak aktif** atau tidak bisa diakses
2. **Username/Password salah** untuk GOWA API
3. **Nomor WhatsApp belum terhubung** dengan GOWA API
4. **Bot server tidak menerima webhook** dari GOWA API

## 🔄 **Langkah Selanjutnya:**
Mari kita test webhook endpoint dengan data dummy terlebih dahulu
