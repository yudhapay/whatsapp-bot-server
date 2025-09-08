# 🚀 Cara Membuat Service di Render

## Service Belum Ada - Mari Kita Buat

### 📋 **Langkah 1: Buat Bot Server Service**

1. **Buka Render Dashboard**
   - Pergi ke: https://dashboard.render.com
   - Login dengan akun Anda

2. **Klik "New +"**
   - Di dashboard utama, klik tombol "New +"
   - Pilih "Web Service"

3. **Connect Repository**
   - Pilih "Build and deploy from a Git repository"
   - Klik "Connect account" jika belum connect GitHub
   - Pilih repository: `yudhapay/whatsapp-bot-server`

4. **Konfigurasi Service**
   - **Name**: `whatsapp-bot-88061`
   - **Region**: Singapore (atau yang terdekat)
   - **Branch**: `main`
   - **Root Directory**: `bot-server`
   - **Build Command**: `npm ci --production`
   - **Start Command**: `node src/server.js`

5. **Klik "Create Web Service"**

### 📋 **Langkah 2: Buat Admin Web Service**

1. **Klik "New +" lagi**
   - Pilih "Static Site"

2. **Connect Repository**
   - Pilih repository yang sama: `yudhapay/whatsapp-bot-server`

3. **Konfigurasi Service**
   - **Name**: `whatsapp-admin-web`
   - **Region**: Singapore (atau yang terdekat)
   - **Branch**: `main`
   - **Root Directory**: `admin-web`
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `dist`

4. **Klik "Create Static Site"**

### ⏳ **Tunggu Deployment Selesai**
- Render akan otomatis build dan deploy service
- Tunggu sampai status menjadi "Live"
- Proses ini bisa memakan waktu 5-10 menit

### 🔍 **Setelah Service Dibuat**
- Klik pada service yang sudah dibuat
- Pergi ke tab "Settings"
- Copy Service ID dari bagian "General"

### 📝 **Yang Akan Anda Dapatkan:**
```
Bot Server Service ID: srv-________________
Admin Web Service ID: srv-________________
```

### ⚠️ **Catatan:**
- Pastikan repository sudah ter-connect dengan GitHub
- Service akan otomatis deploy dari branch main
- Environment variables akan kita set nanti

## 🔄 **Langkah Selanjutnya:**
Setelah kedua service dibuat dan status "Live", kita akan mendapatkan Service IDs dan lanjut ke langkah berikutnya.
