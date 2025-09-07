#!/bin/bash

# Script Konfigurasi Admin Web
# Jalankan script ini untuk mengkonfigurasi environment variables

echo "🌐 Admin Web Configuration Script"
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
    print_warning "File .env tidak ditemukan. Membuat dari .env.example..."
    cp .env.example .env
    print_success "File .env dibuat"
fi

echo ""
print_info "Silakan isi konfigurasi berikut:"
echo ""

# Supabase Configuration
echo "🗄️  SUPABASE CONFIGURATION"
echo "=========================="
read -p "Supabase URL (contoh: https://your-project.supabase.co): " SUPABASE_URL
read -p "Supabase Anon Key: " SUPABASE_ANON_KEY

echo ""
echo "📱 APP CONFIGURATION"
echo "==================="
read -p "App Name (default: WhatsApp Template Admin): " APP_NAME
read -p "App Version (default: 1.0.0): " APP_VERSION

# Set defaults
APP_NAME=${APP_NAME:-"WhatsApp Template Admin"}
APP_VERSION=${APP_VERSION:-"1.0.0"}

echo ""
print_info "Menyimpan konfigurasi ke .env..."

# Create .env file
cat > .env << EOF
# Supabase Configuration
VITE_SUPABASE_URL=${SUPABASE_URL}
VITE_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}

# App Configuration
VITE_APP_NAME=${APP_NAME}
VITE_APP_VERSION=${APP_VERSION}
EOF

print_success "Konfigurasi berhasil disimpan ke .env"

echo ""
print_info "Validasi konfigurasi..."

# Validate URLs
if [[ $SUPABASE_URL =~ ^https://.*\.supabase\.co$ ]]; then
    print_success "Supabase URL format valid"
else
    print_error "Supabase URL format tidak valid"
fi

echo ""
print_info "Konfigurasi selesai!"
print_info "Untuk menjalankan development server: npm run dev"
print_info "Untuk build production: npm run build"

