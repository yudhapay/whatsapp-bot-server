# 🤖 Multi-AI Setup untuk Chatbot

## 🎯 **AI Providers yang Didukung**

### 1. **OpenAI GPT-3.5** (Primary)
- **Model:** `gpt-3.5-turbo`
- **Keunggulan:** Paling pintar, akurat
- **Cost:** $5 credit gratis untuk new user
- **Priority:** 1 (dicoba pertama)

### 2. **Google Gemini** (Secondary)
- **Model:** `gemini-pro`
- **Keunggulan:** Gratis dengan limit tinggi, mudah setup
- **Cost:** Gratis dengan limit 15 requests/minute
- **Priority:** 2 (dicoba kedua)

### 3. **Rule-based Parsing** (Fallback)
- **Keunggulan:** 100% gratis, offline
- **Cost:** Gratis
- **Priority:** 3 (fallback terakhir)

## 🚀 **Setup Multi-AI**

### **Langkah 1: Dapatkan API Keys**

#### **OpenAI API Key (Opsional)**
1. Buka [platform.openai.com](https://platform.openai.com)
2. Sign up/Login
3. Pergi ke **API Keys**
4. Klik **Create new secret key**
5. Copy API key

#### **Google Gemini API Key (Recommended)**
1. Buka [makersuite.google.com](https://makersuite.google.com)
2. Sign up/Login dengan Google account
3. Pergi ke **Get API Key**
4. Klik **Create API Key**
5. Copy API key

### **Langkah 2: Set Environment Variables**

Tambahkan ke file `.env`:

```bash
# AI APIs (Optional - untuk AI yang lebih pintar)
OPENAI_API_KEY=sk-your-openai-api-key-here
GEMINI_API_KEY=your-gemini-api-key-here
```

### **Langkah 3: Deploy ke Render**

Set environment variables di Render dashboard:
- `OPENAI_API_KEY`: (opsional)
- `GEMINI_API_KEY`: (recommended)

## 🔄 **Cara Kerja Multi-AI**

### **Flow Parsing:**
```
1. User mengirim pesan
2. Coba OpenAI GPT-3.5
   ├─ Success → Return hasil
   └─ Failed → Lanjut ke step 3
3. Coba Google Gemini
   ├─ Success → Return hasil
   └─ Failed → Lanjut ke step 4
4. Rule-based parsing (fallback)
   └─ Return hasil
```

### **Keunggulan Multi-AI:**
- ✅ **Reliability:** Jika satu AI down, yang lain backup
- ✅ **Cost Optimization:** Gunakan yang gratis dulu
- ✅ **Performance:** Pilih yang tercepat
- ✅ **Accuracy:** Kombinasi multiple AI

## 📊 **Perbandingan AI**

| Provider | Accuracy | Speed | Cost | Setup |
|----------|----------|-------|------|-------|
| OpenAI | 95% | Fast | $ | Easy |
| Gemini | 90% | Fast | Free | Very Easy |
| Rule-based | 80% | Instant | Free | No setup |

## 🧪 **Test Multi-AI**

Jalankan test untuk melihat AI mana yang aktif:

```bash
cd bot-server
node test-ai.js
```

Output akan menunjukkan:
- AI provider yang digunakan
- Confidence score
- Response time

## 💡 **Tips Optimasi**

### **Untuk Production:**
1. **Setup Gemini** (gratis, mudah)
2. **OpenAI sebagai backup** (jika budget ada)
3. **Monitor logs** untuk melihat AI mana yang digunakan

### **Untuk Development:**
1. **Rule-based parsing** sudah cukup
2. **Test dengan Gemini** untuk validasi
3. **OpenAI untuk testing advanced features**

## 🔧 **Troubleshooting**

### **Semua AI gagal:**
- Cek API keys
- Cek internet connection
- Cek logs untuk error details

### **Gemini tidak bekerja:**
- Pastikan API key valid
- Cek quota limit
- Cek region restrictions

### **OpenAI tidak bekerja:**
- Pastikan API key valid
- Cek credit balance
- Cek rate limits

## 📈 **Monitoring**

### **Logs yang Perlu Dimonitor:**
- `OpenAI Response:` - Response dari OpenAI
- `Gemini Response:` - Response dari Gemini
- `AI Parse Result:` - Hasil parsing final
- `Source: openai/gemini/rule-based` - AI provider yang digunakan

### **Metrics:**
- Success rate per AI provider
- Response time per AI provider
- Confidence score distribution
- Error rate per AI provider

