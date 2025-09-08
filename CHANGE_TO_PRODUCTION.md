# 🔧 Ubah Bot ke Production Mode

## 🚨 **Masalah:**
Bot dalam mode development, jadi tidak mengirim pesan asli ke WhatsApp.

## 🔧 **Solusi:**

### **Langkah 1: Ubah NODE_ENV ke Production**
1. Buka Render dashboard: https://dashboard.render.com/web/srv-d2v1ft8gjchc73apglig
2. Klik tab **"Environment"**
3. Edit variable `NODE_ENV`
4. Ubah dari `development` ke `production`
5. Klik **"Save Changes"**

### **Langkah 2: Tunggu Redeploy**
- Service akan otomatis redeploy
- Tunggu sampai status "Live" lagi
- Proses ini bisa memakan waktu 2-5 menit

### **Langkah 3: Test Manual Webhook**
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

### **Langkah 4: Cek Logs**
1. Buka Render dashboard: https://dashboard.render.com/web/srv-d2v1ft8gjchc73apglig
2. Klik tab "Logs"
3. Lihat apakah bot mengirim pesan ke WhatsApp

## ⚠️ **Catatan:**
- Production mode akan mengirim pesan asli ke WhatsApp
- Bot akan membalas pesan ke nomor 6289661687111
- Perlu template di database untuk generate dokumen

## 🔄 **Langkah Selanjutnya:**
1. Ubah NODE_ENV ke production
2. Tunggu redeploy
3. Test manual webhook
4. Cek logs untuk memastikan pesan terkirim

## 🎯 **TARGET:**
Agar bot bisa mengirim pesan asli ke WhatsApp
