#!/bin/bash

# Script Konfigurasi Master untuk WhatsApp Template Bot System
# Jalankan script ini untuk mengkonfigurasi semua komponen

echo "🚀 WhatsApp Template Bot System - Master Configuration"
echo "====================================================="
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

print_header() {
    echo ""
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
}

# Check if we're in the right directory
if [ ! -d "bot-server" ] || [ ! -d "admin-web" ]; then
    print_error "Script harus dijalankan dari direktori root proyek"
    print_info "Pastikan ada folder 'bot-server' dan 'admin-web'"
    exit 1
fi

print_header "KONFIGURASI BOT SERVER"
echo "Mengkonfigurasi bot server..."
cd bot-server
if [ -f "configure.sh" ]; then
    ./configure.sh
    print_success "Bot server dikonfigurasi"
else
    print_error "Script konfigurasi bot server tidak ditemukan"
fi

print_header "KONFIGURASI ADMIN WEB"
echo "Mengkonfigurasi admin web..."
cd ../admin-web
if [ -f "configure.sh" ]; then
    ./configure.sh
    print_success "Admin web dikonfigurasi"
else
    print_error "Script konfigurasi admin web tidak ditemukan"
fi

print_header "KONFIGURASI SELESAI"
echo "Semua komponen telah dikonfigurasi!"
echo ""
print_info "Langkah selanjutnya:"
echo "1. Test bot server: cd bot-server && npm start"
echo "2. Test admin web: cd admin-web && npm run dev"
echo "3. Deploy ke production sesuai panduan di DEPLOYMENT.md"
echo ""
print_success "Konfigurasi selesai! 🎉"

