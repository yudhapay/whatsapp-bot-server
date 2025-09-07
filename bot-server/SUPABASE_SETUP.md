# Panduan Setup Supabase untuk WhatsApp Bot

## Langkah 1: Buat Akun Supabase

1. Kunjungi [supabase.com](https://supabase.com)
2. Klik "Start your project"
3. Login dengan GitHub atau email
4. Klik "New Project"

## Langkah 2: Buat Project Baru

1. **Organization**: Pilih organization atau buat baru
2. **Project Name**: `pipin-AI-Wa`
3. **Database Password**: Buat password yang kuat (simpan baik-baik!)
4. **Region**: Pilih region terdekat (Singapore untuk Indonesia)
5. Klik "Create new project"

## Langkah 3: Tunggu Project Selesai

- Proses setup memakan waktu 2-3 menit
- Tunggu sampai status "Ready"

## Langkah 4: Dapatkan Credentials

1. **Project URL**: 
   - Buka Settings > API
   - Copy "Project URL" (format: `https://your-project-id.supabase.co`)

2. **API Keys**:
   - **anon/public key**: Copy "anon public" key
   - **service_role key**: Copy "service_role" key (JANGAN SHARE!)

## Langkah 5: Setup Storage

1. Buka **Storage** di sidebar kiri
2. Klik **New Bucket**
3. **Name**: `templates`
4. **Public**: `false` (private)
5. Klik **Create bucket**

## Langkah 6: Setup Storage Policies

1. Buka **Storage** > **Policies**
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

## Langkah 7: Setup Authentication

1. Buka **Authentication** > **Settings**
2. **Site URL**: `http://localhost:3000` (untuk development)
3. **Redirect URLs**: `http://localhost:3000/dashboard`
4. **Enable Email**: ✅ (centang)

## Langkah 8: Buat User Admin

1. Buka **Authentication** > **Users**
2. Klik **Add user**
3. **Email**: `admin@example.com`
4. **Password**: Buat password yang kuat
5. Klik **Create user**

## Langkah 9: Test Konfigurasi

1. Jalankan script konfigurasi:
   ```bash
   ./configure-supabase.sh
   ```

2. Test server:
   ```bash
   npm start
   ```

3. Test health check:
   ```bash
   curl http://localhost:3000/health
   ```

## Troubleshooting

### Error "Invalid URL"
- Pastikan URL Supabase format: `https://your-project-id.supabase.co`
- Pastikan tidak ada spasi di awal/akhir

### Error "Invalid API Key"
- Pastikan key yang benar (anon vs service_role)
- Pastikan tidak ada spasi di awal/akhir

### Error "Storage not found"
- Pastikan bucket `templates` sudah dibuat
- Pastikan policies sudah di-set

### Error "Authentication failed"
- Pastikan user admin sudah dibuat
- Pastikan email dan password benar

## Security Notes

- **JANGAN** commit file `.env` ke Git
- **JANGAN** share service_role key
- **Gunakan** environment variables di production
- **Rotate** keys secara berkala

## Next Steps

Setelah Supabase dikonfigurasi:
1. Test bot server
2. Test admin web
3. Upload template test
4. Test integrasi lengkap
