#!/bin/bash

# One-Click Setup Script
# Complete setup with one command

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
echo "║                 ONE-CLICK SETUP                            ║"
echo "║                   WhatsApp Bot Server                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

print_info "This script will help you setup everything with one click!"
echo ""

# Step 1: Copy environment variables
print_info "Step 1: Copying environment variables to clipboard..."
if command -v pbcopy > /dev/null; then
    cat << 'EOF' | pbcopy
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
WHATSAPP_API_URL=https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id
WHATSAPP_USERNAME=0iK2Kv4m
WHATSAPP_PASSWORD=QUWlXsiaTHFBoSBM0WPtzRdQ
WHATSAPP_WEBHOOK_TOKEN=test_webhook_token_123
SUPABASE_URL=https://cwixdvfffqjeyhbvxsph.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzkzNTEsImV4cCI6MjA3Mjg1NTM1MX0.m6VyCTNUuxEsSbDb7v0fem_wx7rlTjiyrg1Yoym04x8
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzI3OTM1MSwiZXhwIjoyMDcyODU1MzUxfQ.IJSWJBcQLtnctjVArr9UeN-bcd_gDzUlUXKqIHOoeMA
GEMINI_API_KEY=AIzaSyAAds8Bj0-0xY7n9ZEk4jYeCFdYfYzVZmk
EOF
    print_status "Environment variables copied to clipboard! 📋"
else
    print_warning "Clipboard not available - will display for manual copy"
    echo ""
    echo "Copy these environment variables:"
    echo "================================="
    cat << 'EOF'
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
WHATSAPP_API_URL=https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id
WHATSAPP_USERNAME=0iK2Kv4m
WHATSAPP_PASSWORD=QUWlXsiaTHFBoSBM0WPtzRdQ
WHATSAPP_WEBHOOK_TOKEN=test_webhook_token_123
SUPABASE_URL=https://cwixdvfffqjeyhbvxsph.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzkzNTEsImV4cCI6MjA3Mjg1NTM1MX0.m6VyCTNUuxEsSbDb7v0fem_wx7rlTjiyrg1Yoym04x8
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzI3OTM1MSwiZXhwIjoyMDcyODU1MzUxfQ.IJSWJBcQLtnctjVArr9UeN-bcd_gDzUlUXKqIHOoeMA
GEMINI_API_KEY=AIzaSyAAds8Bj0-0xY7n9ZEk4jYeCFdYfYzVZmk
EOF
    echo "================================="
fi

echo ""
print_info "Step 2: Render Dashboard Setup Instructions"
echo "================================================"
echo ""
echo "🔗 OPEN RENDER DASHBOARD: https://dashboard.render.com"
echo ""
echo "📋 FOLLOW THESE STEPS:"
echo ""
echo "1. LOGIN to Render Dashboard"
echo "2. Click 'New +' → 'Web Service'"
echo "3. Connect GitHub Repository: yudhapay/whatsapp-bot-server"
echo "4. Configure Service:"
echo "   - Name: whatsapp-bot-88061"
echo "   - Environment: Node"
echo "   - Region: Singapore"
echo "   - Branch: main"
echo "   - Root Directory: bot-server"
echo "   - Build Command: npm ci --production"
echo "   - Start Command: npm start"
echo "   - Health Check Path: /health"
echo ""
echo "5. ADD ENVIRONMENT VARIABLES:"
echo "   - Go to Environment tab"
echo "   - Paste (Cmd+V) the copied variables"
echo "   - Save changes"
echo ""
echo "6. DEPLOY:"
echo "   - Click 'Create Web Service'"
echo "   - Wait for deployment to complete"
echo ""

# Step 3: Wait for user
print_info "Step 3: Waiting for you to complete setup..."
echo ""
read -p "Press Enter when you have completed the Render setup..."

# Step 4: Test service
print_info "Step 4: Testing service after setup..."
echo ""

print_warning "Waiting 30 seconds for service to deploy..."
sleep 30

# Test service
SERVICE_URL="https://whatsapp-bot-88061.onrender.com"
print_info "Testing service: $SERVICE_URL"

# Test basic connectivity
if curl -s --max-time 10 "$SERVICE_URL" > /dev/null; then
    print_status "Service is accessible"
else
    print_warning "Service not yet accessible, may still be deploying"
fi

# Test health endpoint
print_info "Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s --max-time 10 "$SERVICE_URL/health" 2>/dev/null || echo "ERROR")
if [[ "$HEALTH_RESPONSE" == *"OK"* ]] || [[ "$HEALTH_RESPONSE" == *"status"* ]] || [[ "$HEALTH_RESPONSE" == *"WhatsApp Bot Server"* ]]; then
    print_status "Health endpoint: Working! 🎉"
    echo "Response: $HEALTH_RESPONSE"
elif [[ "$HEALTH_RESPONSE" == *"Not Found"* ]]; then
    print_warning "Health endpoint: Not Found (service may still be starting)"
else
    print_warning "Health endpoint: Unexpected response"
    echo "Response: $HEALTH_RESPONSE"
fi

# Test webhook endpoint
print_info "Testing webhook endpoint..."
WEBHOOK_RESPONSE=$(curl -s --max-time 10 -X POST "$SERVICE_URL/webhook" -H "Content-Type: application/json" -d '{"message": "test", "from": "test_user"}' 2>/dev/null || echo "ERROR")
if [[ "$WEBHOOK_RESPONSE" == *"ERROR"* ]]; then
    print_warning "Webhook endpoint: Error or not accessible"
elif [[ "$WEBHOOK_RESPONSE" == *"Not Found"* ]]; then
    print_warning "Webhook endpoint: Not Found (service may still be starting)"
else
    print_status "Webhook endpoint: Working! 🎉"
    echo "Response: $WEBHOOK_RESPONSE"
fi

# Final summary
echo ""
print_info "SETUP SUMMARY:"
echo "==============="
echo "Service URL: $SERVICE_URL"
echo "Health: $SERVICE_URL/health"
echo "Webhook: $SERVICE_URL/webhook"
echo ""

if [[ "$HEALTH_RESPONSE" == *"OK"* ]] || [[ "$HEALTH_RESPONSE" == *"status"* ]]; then
    print_status "🎉 SETUP COMPLETED SUCCESSFULLY!"
    echo ""
    print_info "Your WhatsApp Bot Server is now running!"
    print_info "You can now integrate it with your WhatsApp application."
else
    print_warning "⚠️  SETUP IN PROGRESS"
    echo ""
    print_warning "Service may still be starting up. Wait 2-5 minutes and run:"
    print_info "./monitor-after-setup.sh"
fi

echo ""
print_info "Monitoring:"
echo "- Render Dashboard: https://dashboard.render.com"
echo "- GitHub Actions: https://github.com/yudhapay/whatsapp-bot-server/actions"
echo ""
print_status "One-click setup completed! 🚀"
