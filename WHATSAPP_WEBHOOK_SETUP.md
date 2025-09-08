# 🔧 Setup WhatsApp Webhook

## 🚨 **Masalah yang Ditemukan:**
Bot server berjalan dalam mode **production** dan memerlukan webhook verification yang proper.

## 🔍 **Analisis:**
1. **NODE_ENV=production** → Webhook verification aktif
2. **Webhook endpoint** memerlukan signature verification
3. **WhatsApp API** perlu mengirim webhook dengan signature yang benar

## 🔧 **Solusi:**

### **Langkah 1: Set Webhook di WhatsApp API Dashboard**
1. Buka dashboard WhatsApp API: https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id
2. Login dengan username: `0iK2Kv4m`
3. Pergi ke bagian **Webhook Settings**
4. Set **Webhook URL**: `https://whatsapp-bot-88061.onrender.com/webhook`
5. Set **Webhook Token**: `test_webhook_token_123`
6. **Enable webhook**

### **Langkah 2: Test Webhook Verification**
```bash
# Test GET request (webhook verification)
curl https://whatsapp-bot-88061.onrender.com/webhook?hub.mode=subscribe&hub.challenge=test&hub.verify_token=test_webhook_token_123
```

### **Langkah 3: Test dengan Pesan WhatsApp**
1. Kirim pesan ke nomor WhatsApp yang terhubung
2. Cek logs di Render dashboard
3. Bot seharusnya membalas pesan

## ⚠️ **Catatan Penting:**
- Webhook URL harus bisa diakses dari internet
- Webhook token harus sama dengan yang di-set di WhatsApp API
- Nomor WhatsApp harus sudah terhubung dengan API

## 🔄 **Langkah Selanjutnya:**
1. Set webhook di WhatsApp API dashboard
2. Test webhook verification
3. Test dengan pesan WhatsApp

## 🎯 **TARGET:**
Agar bot bisa menerima dan membalas pesan WhatsApp
