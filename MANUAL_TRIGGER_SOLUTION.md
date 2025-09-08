# 🔧 Solusi Manual Trigger untuk Testing

## 🚨 **Masalah:**
GOWA API tidak mengirim webhook ke bot server, jadi bot tidak tahu ada pesan masuk.

## 🔧 **Solusi Sementara - Manual Trigger:**

### **Langkah 1: Test Manual Webhook**
```bash
# Simulasikan pesan masuk dari WhatsApp
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
2. Klik tab "Logs"
3. Lihat apakah bot memproses pesan dan mengirim balasan

### **Langkah 3: Upload Template di Admin Web**
1. Buka: https://whatsapp-admin-web-2ypm.onrender.com
2. Login dan upload template Word (.docx)
3. Template akan tersedia untuk bot

## 🔍 **Debug Steps:**

### **Test 1: Cek Bot Response**
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

### **Test 2: Cek Template Request**
```bash
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

## ⚠️ **Catatan:**
- Bot dalam mode development, jadi tidak mengirim pesan asli
- Hanya log ke console
- Perlu ubah ke production mode untuk mengirim pesan asli

## 🔄 **Langkah Selanjutnya:**
1. Test manual webhook
2. Cek logs bot server
3. Upload template di admin web
4. Ubah ke production mode

## 🎯 **TARGET:**
Agar bot bisa memproses pesan dan mengirim balasan
