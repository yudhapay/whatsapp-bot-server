# 🔧 Bypass Webhook Verification untuk Testing

## 🚨 **Masalah:**
Webhook verification memblokir request POST karena tidak ada signature yang valid.

## 🔧 **Solusi Sementara:**

### **Langkah 1: Ubah NODE_ENV ke Development**
1. Buka Render dashboard: https://dashboard.render.com/web/srv-d2v1ft8gjchc73apglig
2. Klik tab **"Environment"**
3. Edit variable `NODE_ENV`
4. Ubah dari `production` ke `development`
5. Klik **"Save Changes"**

### **Langkah 2: Tunggu Redeploy**
- Service akan otomatis redeploy
- Tunggu sampai status "Live" lagi

### **Langkah 3: Test Webhook**
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
- Mode development akan skip webhook verification
- Bot akan log pesan ke console instead of mengirim ke WhatsApp
- Ini hanya untuk testing, bukan production

## 🔄 **Setelah Testing:**
- Ubah kembali `NODE_ENV` ke `production`
- Implement proper webhook verification
- Set webhook di GOWA API dashboard (jika ada)

## 🎯 **TARGET:**
Agar bot bisa menerima dan memproses pesan untuk testing
