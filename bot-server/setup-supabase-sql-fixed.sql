-- Script SQL untuk Setup Supabase WhatsApp Bot (FIXED VERSION)
-- Jalankan script ini di Supabase SQL Editor

-- 1. Buat bucket 'templates' jika belum ada
INSERT INTO storage.buckets (id, name, public)
VALUES ('templates', 'templates', false)
ON CONFLICT (id) DO NOTHING;

-- 2. Hapus policy lama jika ada (untuk menghindari error)
DROP POLICY IF EXISTS "Allow authenticated users to upload templates" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to read templates" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete templates" ON storage.objects;

-- 3. Buat policy baru untuk bucket 'templates'
-- Policy untuk upload file
CREATE POLICY "Allow authenticated users to upload templates"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'templates' AND auth.role() = 'authenticated');

-- Policy untuk read file
CREATE POLICY "Allow authenticated users to read templates"
ON storage.objects
FOR SELECT
USING (bucket_id = 'templates' AND auth.role() = 'authenticated');

-- Policy untuk delete file
CREATE POLICY "Allow authenticated users to delete templates"
ON storage.objects
FOR DELETE
USING (bucket_id = 'templates' AND auth.role() = 'authenticated');

-- 4. Buat tabel untuk log webhook (optional)
CREATE TABLE IF NOT EXISTS webhook_logs (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    webhook_data JSONB,
    processed BOOLEAN DEFAULT FALSE
);

-- 5. Buat tabel untuk template metadata (optional)
CREATE TABLE IF NOT EXISTS template_metadata (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    file_name TEXT NOT NULL,
    file_size BIGINT,
    file_type TEXT,
    uploader_email TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- 6. Buat index untuk performa
CREATE INDEX IF NOT EXISTS idx_webhook_logs_created_at ON webhook_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_template_metadata_file_name ON template_metadata(file_name);
CREATE INDEX IF NOT EXISTS idx_template_metadata_is_active ON template_metadata(is_active);

-- 7. Buat function untuk cleanup log lama (optional)
CREATE OR REPLACE FUNCTION cleanup_old_webhook_logs()
RETURNS void AS $$
BEGIN
    DELETE FROM webhook_logs
    WHERE created_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- 8. Test query untuk memastikan semuanya berjalan
SELECT 'Supabase setup completed successfully!' as status;
