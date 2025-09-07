#!/bin/bash

# Script Konfigurasi WhatsApp Bot Server
# Jalankan script ini untuk mengkonfigurasi environment variables

echo "🔧 WhatsApp Bot Server Configuration Script"
echo "=========================================="
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

# WhatsApp API Configuration
echo "📱 WHATSAPP API CONFIGURATION"
echo "=============================="
read -p "WhatsApp API URL (contoh: https://api.whatsapp-go.com): " WHATSAPP_API_URL
read -p "WhatsApp API Key: " WHATSAPP_API_KEY
read -p "WhatsApp Webhook Token: " WHATSAPP_WEBHOOK_TOKEN
read -p "WhatsApp Phone Number ID: " WHATSAPP_PHONE_NUMBER_ID

echo ""
echo "🗄️  SUPABASE CONFIGURATION"
echo "=========================="
read -p "Supabase URL (contoh: https://your-project.supabase.co): " SUPABASE_URL
read -p "Supabase Anon Key: " SUPABASE_ANON_KEY
read -p "Supabase Service Role Key: " SUPABASE_SERVICE_ROLE_KEY

echo ""
echo "⚙️  SERVER CONFIGURATION"
echo "======================="
read -p "Port (default: 3000): " PORT
read -p "Environment (development/production): " NODE_ENV
read -p "Log Level (info/debug/error): " LOG_LEVEL

# Set defaults
PORT=${PORT:-3000}
NODE_ENV=${NODE_ENV:-development}
LOG_LEVEL=${LOG_LEVEL:-info}

echo ""
print_info "Menyimpan konfigurasi ke .env..."

# Create .env file
cat > .env << EOF
# WhatsApp Go API Configuration
WHATSAPP_API_URL=${WHATSAPP_API_URL}
WHATSAPP_API_KEY=${WHATSAPP_API_KEY}
WHATSAPP_WEBHOOK_TOKEN=${WHATSAPP_WEBHOOK_TOKEN}
WHATSAPP_PHONE_NUMBER_ID=${WHATSAPP_PHONE_NUMBER_ID}

# Supabase Configuration
SUPABASE_URL=${SUPABASE_URL}
SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}

# Server Configuration
PORT=${PORT}
NODE_ENV=${NODE_ENV}

# Logging
LOG_LEVEL=${LOG_LEVEL}
EOF

print_success "Konfigurasi berhasil disimpan ke .env"

echo ""
print_info "Validasi konfigurasi..."

# Validate URLs
if [[ $WHATSAPP_API_URL =~ ^https?:// ]]; then
    print_success "WhatsApp API URL format valid"
else
    print_error "WhatsApp API URL format tidak valid"
fi

if [[ $SUPABASE_URL =~ ^https://.*\.supabase\.co$ ]]; then
    print_success "Supabase URL format valid"
else
    print_error "Supabase URL format tidak valid"
fi

echo ""
print_info "Konfigurasi selesai!"
print_info "Untuk menjalankan server: npm start"
print_info "Untuk development: npm run dev"

