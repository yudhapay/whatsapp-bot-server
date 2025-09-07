# 🤖 Setup AI untuk Chatbot

## OpenAI API Setup (Recommended)

### 1. Dapatkan API Key
1. Buka [platform.openai.com](https://platform.openai.com)
2. Sign up/Login
3. Pergi ke **API Keys**
4. Klik **Create new secret key**
5. Copy API key yang dihasilkan

### 2. Set Environment Variable
Tambahkan ke file `.env`:

```bash
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 3. Test AI
Setelah setup, AI akan otomatis aktif dan lebih pintar dalam parsing pesan.

## Alternatif AI Gratis

### 1. Hugging Face (100% Gratis)
Jika tidak ingin menggunakan OpenAI, AI service akan otomatis fallback ke rule-based parsing yang sudah cukup pintar.

### 2. Google Gemini (Gratis)
Bisa juga menggunakan Google Gemini API sebagai alternatif.

## Fitur AI yang Ditambahkan

### ✅ **Smart Parsing**
- Memahami berbagai format pesan
- Ekstrak informasi dengan akurat
- Fallback ke parsing manual jika AI gagal

### ✅ **Natural Language Processing**
- Mengerti bahasa Indonesia
- Menangani variasi format pesan
- Confidence scoring

### ✅ **Error Handling**
- Graceful fallback
- Logging yang detail
- User-friendly error messages

## Contoh Penggunaan

### Format Pesan yang Didukung:
```
✅ "buat berita acara untuk Andi di Jakarta 8 September 2024"
✅ "saya butuh surat undangan untuk Siti di Bandung tanggal 15 Oktober"
✅ "tolong buat surat keterangan untuk Budi di Surabaya 20 November"
✅ "mohon bantuan buat surat perjanjian untuk Tono di Medan 25 Desember"
```

### AI akan otomatis:
1. **Deteksi template** yang diminta
2. **Ekstrak nama** orang
3. **Ekstrak lokasi** acara
4. **Ekstrak tanggal** acara
5. **Validasi data** dan perbaiki jika perlu

## Troubleshooting

### AI tidak aktif
- Cek `OPENAI_API_KEY` di `.env`
- Pastikan API key valid
- Cek logs untuk error

### Parsing tidak akurat
- AI akan fallback ke rule-based parsing
- Cek confidence score di logs
- Gunakan format yang lebih jelas

## Cost

### OpenAI API
- **Free tier:** $5 credit untuk new user
- **Cost:** ~$0.002 per request
- **Sangat murah** untuk penggunaan normal

### Fallback
- **100% gratis** jika tidak ada API key
- **Rule-based parsing** yang sudah cukup pintar
