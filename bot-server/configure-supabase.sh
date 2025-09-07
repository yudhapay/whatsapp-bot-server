#!/bin/bash

# Script Konfigurasi Supabase untuk WhatsApp Bot Server
# Jalankan script ini untuk mengkonfigurasi Supabase dengan aman

echo "🗄️  Supabase Configuration Script"
echo "================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if .env exists
if [ ! -f ".env" ]; then
    print_error "File .env tidak ditemukan!"
    print_info "Jalankan configure.sh terlebih dahulu"
    exit 1
fi

echo ""
print_info "Konfigurasi Supabase untuk WhatsApp Bot Server"
echo ""

# Backup existing .env
print_info "Membuat backup .env..."
cp .env .env.backup
print_success "Backup .env berhasil dibuat"

echo ""
print_info "Silakan isi konfigurasi Supabase:"
echo ""

# Supabase Configuration
echo "🗄️  SUPABASE CONFIGURATION"
echo "=========================="
read -p "Supabase URL (contoh: https://your-project.supabase.co): " SUPABASE_URL
read -p "Supabase Anon Key: " SUPABASE_ANON_KEY
read -p "Supabase Service Role Key: " SUPABASE_SERVICE_ROLE_KEY

echo ""
print_info "Validasi konfigurasi..."

# Validate URLs
if [[ $SUPABASE_URL =~ ^https://.*\.supabase\.co$ ]]; then
    print_success "Supabase URL format valid"
else
    print_error "Supabase URL format tidak valid"
    print_info "Format yang benar: https://your-project.supabase.co"
    exit 1
fi

# Check if keys are not empty
if [ -z "$SUPABASE_ANON_KEY" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    print_error "Anon Key dan Service Role Key tidak boleh kosong"
    exit 1
fi

print_success "Konfigurasi Supabase valid"

echo ""
print_info "Menyimpan konfigurasi ke .env..."

# Update .env file
cat > .env << EOF
# GOWA API Configuration
WHATSAPP_API_URL=https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id
WHATSAPP_USERNAME=0iK2Kv4m
WHATSAPP_PASSWORD=QUWlXsiaTHFBoSBM0WPtzRdQ
WHATSAPP_WEBHOOK_TOKEN=test_webhook_token_123

# Supabase Configuration
SUPABASE_URL=${SUPABASE_URL}
SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}

# Server Configuration
PORT=3000
NODE_ENV=development

# Logging
LOG_LEVEL=info
EOF

print_success "Konfigurasi Supabase berhasil disimpan ke .env"

echo ""
print_info "Langkah selanjutnya:"
echo "1. Test server: npm start"
echo "2. Test health check: curl http://localhost:3000/health"
echo "3. Test webhook: curl http://localhost:3000/webhook"
echo ""
print_success "Konfigurasi Supabase selesai! 🎉"

