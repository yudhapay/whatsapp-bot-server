# Deployment Guide

Panduan lengkap untuk deploy WhatsApp Template Bot System ke production.

## 🚀 Overview

Sistem ini terdiri dari 2 komponen yang perlu dideploy:
1. **Bot Server** → Render (Free tier)
2. **Admin Web** → Vercel (Free tier)
3. **Database & Storage** → Supabase (Free tier)

## 📋 Prerequisites

- Akun GitHub (untuk repository)
- Akun Render (untuk bot server)
- Akun Vercel (untuk admin web)
- Akun Supabase (untuk database & storage)

## 🔧 Setup Supabase

### 1. Buat Project Supabase
1. Kunjungi [supabase.com](https://supabase.com)
2. Klik "New Project"
3. Pilih organization
4. Isi nama project: `whatsapp-template-bot`
5. Set password untuk database
6. Pilih region terdekat
7. Klik "Create new project"

### 2. Setup Authentication
1. Go to **Authentication** > **Settings**
2. Enable **Email** provider
3. Set **Site URL** ke domain admin web (akan diupdate setelah deploy)
4. Set **Redirect URLs** ke domain admin web + `/dashboard`

### 3. Setup Storage
1. Go to **Storage**
2. Klik **New Bucket**
3. Nama bucket: `templates`
4. Set **Public** ke `false`
5. Klik **Create bucket**

### 4. Set Storage Policies
1. Go to **Storage** > **Policies**
2. Klik **New Policy** untuk bucket `templates`
3. Copy-paste policy berikut:

```sql
-- Policy untuk upload file
CREATE POLICY "Allow authenticated users to upload templates" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'templates' AND auth.role() = 'authenticated');

-- Policy untuk read file
CREATE POLICY "Allow authenticated users to read templates" ON storage.objects
FOR SELECT USING (bucket_id = 'templates' AND auth.role() = 'authenticated');

-- Policy untuk delete file
CREATE POLICY "Allow authenticated users to delete templates" ON storage.objects
FOR DELETE USING (bucket_id = 'templates' AND auth.role() = 'authenticated');
```

### 5. Buat User Admin
1. Go to **Authentication** > **Users**
2. Klik **Add user**
3. Isi email dan password untuk admin
4. Klik **Create user**

### 6. Catat Credentials
Catat informasi berikut:
- **Project URL**: `https://your-project.supabase.co`
- **Anon Key**: `eyJ...` (dari Settings > API)
- **Service Role Key**: `eyJ...` (dari Settings > API)

## 🚀 Deploy Bot Server ke Render

### 1. Push ke GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Connect ke Render
1. Kunjungi [render.com](https://render.com)
2. Klik **New** > **Web Service**
3. Connect ke GitHub repository
4. Pilih repository dan branch `main`
5. Set **Root Directory** ke `bot-server`
6. Klik **Create Web Service**

### 3. Konfigurasi Environment Variables
Di Render dashboard, set environment variables:
```
NODE_ENV=production
PORT=3000
WHATSAPP_API_URL=https://api.whatsapp-go.com
WHATSAPP_API_KEY=your_whatsapp_api_key
WHATSAPP_WEBHOOK_TOKEN=your_webhook_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
LOG_LEVEL=info
```

### 4. Deploy
1. Klik **Create Web Service**
2. Tunggu build selesai (5-10 menit)
3. Catat URL yang diberikan: `https://your-app.onrender.com`

## 🌐 Deploy Admin Web ke Vercel

### 1. Connect ke Vercel
1. Kunjungi [vercel.com](https://vercel.com)
2. Klik **New Project**
3. Import dari GitHub repository
4. Set **Root Directory** ke `admin-web`
5. Klik **Deploy**

### 2. Konfigurasi Environment Variables
Di Vercel dashboard, set environment variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_NAME=WhatsApp Template Admin
VITE_APP_VERSION=1.0.0
```

### 3. Redeploy
1. Klik **Redeploy** setelah set environment variables
2. Tunggu build selesai
3. Catat URL yang diberikan: `https://your-app.vercel.app`

## 🔗 Setup WhatsApp Go API

### 1. Konfigurasi Webhook
1. Login ke WhatsApp Go dashboard
2. Go to **Webhooks**
3. Set **Webhook URL** ke: `https://your-bot-server.onrender.com/webhook`
4. Set **Verify Token** ke token yang sama dengan `WHATSAPP_WEBHOOK_TOKEN`
5. Enable webhook

### 2. Test Webhook
1. Kirim pesan test ke WhatsApp
2. Cek logs di Render dashboard
3. Pastikan webhook menerima pesan

## 🔄 Update Supabase Settings

### 1. Update Site URL
1. Go to Supabase > **Authentication** > **Settings**
2. Set **Site URL** ke URL admin web: `https://your-admin-web.vercel.app`
3. Set **Redirect URLs** ke: `https://your-admin-web.vercel.app/dashboard`

## ✅ Testing

### 1. Test Admin Web
1. Buka admin web: `https://your-admin-web.vercel.app`
2. Login dengan akun admin
3. Upload template test
4. Pastikan template muncul di daftar

### 2. Test Bot Server
1. Kirim pesan ke WhatsApp: `buat surat undangan untuk Test di Jakarta 8 September 2024`
2. Pastikan bot merespon
3. Pastikan dokumen terkirim

## 🔍 Monitoring

### 1. Bot Server Logs
- Render dashboard > **Logs**
- Cek error dan warning
- Monitor response time

### 2. Admin Web Logs
- Vercel dashboard > **Functions** > **Logs**
- Cek build logs
- Monitor performance

### 3. Supabase Logs
- Supabase dashboard > **Logs**
- Cek API calls
- Monitor storage usage

## 🐛 Troubleshooting

### Bot tidak merespon
1. Cek webhook URL di WhatsApp Go
2. Cek logs di Render
3. Pastikan environment variables benar
4. Test webhook endpoint: `https://your-bot-server.onrender.com/health`

### Admin web tidak bisa login
1. Cek environment variables di Vercel
2. Cek Supabase authentication settings
3. Pastikan user admin sudah dibuat
4. Cek browser console untuk error

### Template tidak ditemukan
1. Cek Supabase storage bucket `templates`
2. Pastikan policy sudah benar
3. Cek logs di Supabase
4. Test upload template via admin web

### Upload gagal
1. Cek file format dan ukuran
2. Cek Supabase storage quota
3. Cek network connection
4. Cek browser console untuk error

## 📊 Performance Optimization

### 1. Bot Server
- Monitor memory usage di Render
- Optimize template processing
- Implement caching jika perlu

### 2. Admin Web
- Optimize bundle size
- Implement lazy loading
- Use CDN untuk static assets

### 3. Supabase
- Monitor database performance
- Optimize queries
- Set up monitoring alerts

## 🔒 Security

### 1. Environment Variables
- Jangan commit `.env` files
- Gunakan strong passwords
- Rotate API keys secara berkala

### 2. Supabase
- Set up RLS policies
- Monitor access logs
- Use service role key hanya untuk server

### 3. WhatsApp Go
- Protect webhook endpoint
- Validate webhook signatures
- Monitor API usage

## 📈 Scaling

### 1. Bot Server
- Upgrade ke paid plan di Render jika perlu
- Implement load balancing
- Use PM2 cluster mode

### 2. Admin Web
- Use Vercel Pro untuk custom domain
- Implement CDN
- Optimize images dan assets

### 3. Supabase
- Upgrade ke paid plan jika perlu
- Implement database optimization
- Set up backup strategy

## 📞 Support

Jika ada masalah:
1. Cek logs di semua platform
2. Test setiap komponen secara terpisah
3. Cek documentation masing-masing platform
4. Buat issue di repository GitHub

