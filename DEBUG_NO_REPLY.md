# 🔍 Debug Bot Tidak Membalas

## 🚨 **Masalah:**
Bot tidak membalas pesan yang dikirim ke nomor 6289661687111

## 🔍 **Kemungkinan Penyebab:**

### **1. GOWA API Tidak Mengirim Webhook ke Bot**
- GOWA API perlu dikonfigurasi untuk mengirim webhook ke bot server
- Webhook URL: `https://whatsapp-bot-88061.onrender.com/webhook`
- Webhook token: `test_webhook_token_123`

### **2. Bot Server Mode Development**
- Bot dalam mode development, jadi tidak mengirim pesan asli
- Hanya log ke console

### **3. Template Database Kosong**
- Bot tidak bisa generate dokumen karena tidak ada template
- Perlu upload template di admin web

## 🔧 **Solusi:**

### **Langkah 1: Cek GOWA API Webhook Settings**
1. Buka dashboard GOWA API: https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id
2. Login dengan username: `0iK2Kv4m`
3. Cari pengaturan webhook atau callback
4. Set webhook URL: `https://whatsapp-bot-88061.onrender.com/webhook`
5. Set webhook token: `test_webhook_token_123`

### **Langkah 2: Ubah Bot ke Production Mode**
1. Buka Render dashboard: https://dashboard.render.com/web/srv-d2v1ft8gjchc73apglig
2. Klik tab "Environment"
3. Edit variable `NODE_ENV`
4. Ubah dari `development` ke `production`
5. Klik "Save Changes"

### **Langkah 3: Upload Template di Admin Web**
1. Buka: https://whatsapp-admin-web-2ypm.onrender.com
2. Login dan upload template Word (.docx)
3. Template akan tersedia untuk bot

### **Langkah 4: Test Manual Webhook**
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

## ⚠️ **Catatan:**
- GOWA API mungkin tidak memiliki pengaturan webhook
- Perlu cek dokumentasi GOWA API
- Mungkin perlu konfigurasi khusus untuk webhook

## 🔄 **Langkah Selanjutnya:**
Mari kita cek GOWA API dashboard dan konfigurasi webhook
