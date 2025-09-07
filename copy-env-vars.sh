#!/bin/bash

# Copy Environment Variables Script
# One-click copy for Render Dashboard

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                 COPY ENVIRONMENT VARIABLES                  ║"
echo "║                   WhatsApp Bot Server                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

print_info "This script will copy environment variables to clipboard"
echo ""

# Check if pbcopy is available (macOS)
if command -v pbcopy > /dev/null; then
    COPY_CMD="pbcopy"
    print_status "macOS detected - using pbcopy"
elif command -v xclip > /dev/null; then
    COPY_CMD="xclip -selection clipboard"
    print_status "Linux detected - using xclip"
elif command -v clip > /dev/null; then
    COPY_CMD="clip"
    print_status "Windows detected - using clip"
else
    print_warning "No clipboard command found - will display for manual copy"
    COPY_CMD=""
fi

# Environment variables
ENV_VARS="NODE_ENV=production
PORT=3000
LOG_LEVEL=info
WHATSAPP_API_URL=https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id
WHATSAPP_USERNAME=0iK2Kv4m
WHATSAPP_PASSWORD=QUWlXsiaTHFBoSBM0WPtzRdQ
WHATSAPP_WEBHOOK_TOKEN=test_webhook_token_123
SUPABASE_URL=https://cwixdvfffqjeyhbvxsph.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzkzNTEsImV4cCI6MjA3Mjg1NTM1MX0.m6VyCTNUuxEsSbDb7v0fem_wx7rlTjiyrg1Yoym04x8
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzI3OTM1MSwiZXhwIjoyMDcyODU1MzUxfQ.IJSWJBcQLtnctjVArr9UeN-bcd_gDzUlUXKqIHOoeMA
GEMINI_API_KEY=AIzaSyAAds8Bj0-0xY7n9ZEk4jYeCFdYfYzVZmk"

# Copy to clipboard
if [ -n "$COPY_CMD" ]; then
    echo "$ENV_VARS" | $COPY_CMD
    print_status "Environment variables copied to clipboard! 📋"
    echo ""
    print_info "Now go to Render Dashboard and paste them:"
    echo "1. Open: https://dashboard.render.com"
    echo "2. Select service: whatsapp-bot-88061"
    echo "3. Go to Environment tab"
    echo "4. Paste (Cmd+V) and save"
else
    print_warning "Manual copy required:"
    echo ""
    echo "Copy the following environment variables:"
    echo "=========================================="
    echo "$ENV_VARS"
    echo "=========================================="
fi

echo ""
print_info "Environment Variables Summary:"
echo "================================="
echo "Total: 11 variables"
echo "Required: 8 variables"
echo "Optional: 3 variables"
echo ""

print_info "Variables included:"
echo "- NODE_ENV, PORT, LOG_LEVEL (Basic config)"
echo "- WHATSAPP_API_URL, USERNAME, PASSWORD, WEBHOOK_TOKEN (WhatsApp)"
echo "- SUPABASE_URL, ANON_KEY, SERVICE_ROLE_KEY (Database)"
echo "- GEMINI_API_KEY (AI)"
echo ""

print_warning "Next steps:"
echo "1. Paste environment variables in Render Dashboard"
echo "2. Save changes"
echo "3. Redeploy service"
echo "4. Run ./monitor-after-setup.sh to test"
echo ""

print_status "Ready to paste! 🚀"
