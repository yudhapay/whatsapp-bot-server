# 🔍 Cara Mendapatkan Render Service IDs

## Langkah 2: Dapatkan Service IDs dari Render Dashboard

### 📋 Yang Perlu Anda Lakukan:

#### 1. **Buka Render Dashboard**
- Pergi ke: https://dashboard.render.com
- Login dengan akun Render Anda

#### 2. **Dapatkan Bot Server Service ID**
- Cari service dengan nama `whatsapp-bot-88061` atau service bot server Anda
- Klik pada service tersebut
- Pergi ke tab **Settings**
- Di bagian **General**, cari **Service ID**
- **Copy Service ID** tersebut (format: `srv-xxxxxxxxxxxxxxxx`)

#### 3. **Dapatkan Admin Web Service ID**
- Cari service dengan nama `whatsapp-admin-web` atau service admin web Anda
- Klik pada service tersebut
- Pergi ke tab **Settings**
- Di bagian **General**, cari **Service ID**
- **Copy Service ID** tersebut (format: `srv-xxxxxxxxxxxxxxxx`)

#### 4. **Dapatkan Render API Key**
- Pergi ke: https://dashboard.render.com/account/api-keys
- Jika belum ada API key, klik **Create API Key**
- Beri nama: `GitHub Actions Deploy`
- **Copy API Key** tersebut (format: `rnd_xxxxxxxxxxxxxxxx`)

### 📝 **Catat Informasi Ini:**
```
Bot Server Service ID: srv-________________
Admin Web Service ID: srv-________________
Render API Key: rnd_________________
```

### ⚠️ **Penting:**
- Jangan share API key atau Service IDs dengan siapapun
- Simpan informasi ini dengan aman
- Pastikan Anda copy dengan benar (tidak ada spasi tambahan)

### 🔄 **Langkah Selanjutnya:**
Setelah mendapatkan semua informasi di atas, kita akan update GitHub Secrets dengan nilai yang benar.
