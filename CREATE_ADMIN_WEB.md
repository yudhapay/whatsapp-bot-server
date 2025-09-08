# 🚀 Buat Admin Web Service Baru

## Langkah 3: Buat Admin Web Service

### 📋 **Yang Perlu Anda Lakukan:**

#### 1. **Buka Render Dashboard**
- Pergi ke: https://dashboard.render.com
- Login dengan akun Anda

#### 2. **Klik "New +"**
- Di dashboard utama, klik tombol "New +"
- Pilih **"Static Site"** (bukan Web Service)

#### 3. **Connect Repository**
- Pilih "Build and deploy from a Git repository"
- Pilih repository: `yudhapay/whatsapp-bot-server`
- Klik "Connect"

#### 4. **Konfigurasi Service**
- **Name**: `whatsapp-admin-web`
- **Region**: Singapore (atau yang terdekat)
- **Branch**: `main`
- **Root Directory**: `admin-web`
- **Build Command**: `npm ci && npm run build`
- **Publish Directory**: `dist`

#### 5. **Klik "Create Static Site"**

### ⏳ **Tunggu Deployment Selesai**
- Render akan otomatis build dan deploy service
- Tunggu sampai status menjadi "Live"
- Proses ini bisa memakan waktu 5-10 menit

### 🔍 **Setelah Service Dibuat**
- Klik pada service `whatsapp-admin-web`
- Pergi ke tab "Settings"
- Copy Service ID dari bagian "General"

### 📝 **Yang Akan Anda Dapatkan:**
```
Admin Web Service ID: srv-________________
Admin Web URL: https://whatsapp-admin-web.onrender.com
```

### ⚠️ **Catatan Penting:**
- Pilih **Static Site**, bukan Web Service
- Pastikan Root Directory: `admin-web`
- Pastikan Publish Directory: `dist`
- Tunggu sampai status "Live" sebelum lanjut

### 🔄 **Langkah Selanjutnya:**
Setelah service dibuat dan status "Live", kita akan:
1. Dapatkan Service ID
2. Update GitHub Secrets
3. Set environment variables
4. Test deployment

## 🎯 **TARGET:**
Buat service `whatsapp-admin-web` dengan tipe Static Site
