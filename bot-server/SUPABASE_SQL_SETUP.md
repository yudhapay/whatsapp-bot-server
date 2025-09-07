# Panduan Konfigurasi SQL Supabase

## Langkah 1: Buka Supabase Dashboard

1. Buka [supabase.com](https://supabase.com) di browser
2. Login ke akun kamu
3. Pilih project `pipin-AI-Wa`

## Langkah 2: Buka SQL Editor

1. Di sidebar kiri, klik **SQL Editor**
2. Klik **New Query**

## Langkah 3: Jalankan Script SQL

1. Copy semua isi file `setup-supabase-sql.sql`
2. Paste ke SQL Editor
3. Klik **Run** atau tekan `Ctrl+Enter`

## Langkah 4: Verifikasi Konfigurasi

### Cek Storage Bucket
1. Buka **Storage** di sidebar
2. Pastikan ada bucket `templates`
3. Klik bucket `templates`
4. Pastikan bisa akses

### Cek Storage Policies
1. Di Storage > `templates` > **Policies**
2. Pastikan ada 3 policies:
   - Allow authenticated users to upload templates
   - Allow authenticated users to read templates  
   - Allow authenticated users to delete templates

### Cek Tables
1. Buka **Table Editor** di sidebar
2. Pastikan ada tabel:
   - `webhook_logs`
   - `template_metadata`

## Langkah 5: Test Upload File

1. Buka **Storage** > `templates`
2. Klik **Upload file**
3. Upload file test (misalnya gambar kecil)
4. Pastikan upload berhasil

## Langkah 6: Buat User Admin

1. Buka **Authentication** > **Users**
2. Klik **Add user**
3. Isi:
   - **Email**: `admin@example.com`
   - **Password**: Buat password yang kuat
4. Klik **Create user**

## Langkah 7: Test Konfigurasi

Setelah semua selesai, test bot server:

```bash
npm start
```

## Troubleshooting

### Error "bucket already exists"
- Normal, artinya bucket sudah ada
- Lanjutkan ke langkah berikutnya

### Error "policy already exists"
- Normal, artinya policy sudah ada
- Lanjutkan ke langkah berikutnya

### Error "table already exists"
- Normal, artinya tabel sudah ada
- Lanjutkan ke langkah berikutnya

### Error "permission denied"
- Pastikan kamu login sebagai owner project
- Cek role permissions di Settings > API

## Next Steps

Setelah SQL dikonfigurasi:
1. Test bot server
2. Test admin web
3. Upload template test
4. Test integrasi lengkap
