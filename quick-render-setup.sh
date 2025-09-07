#!/bin/bash

# Quick Render Setup Script
# Guide user through Render setup process

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
echo "║                 QUICK RENDER SETUP                         ║"
echo "║                   WhatsApp Bot Server                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

print_info "This script will guide you through Render setup process"
echo ""

# Step 1: Check current status
print_info "Step 1: Checking current status..."
SERVICE_URL="https://whatsapp-bot-88061.onrender.com"

if curl -s --max-time 5 "$SERVICE_URL" > /dev/null; then
    print_warning "Service is accessible but may not be properly configured"
else
    print_error "Service is not accessible"
fi

# Step 2: Provide setup instructions
print_info "Step 2: Render Dashboard Setup Instructions"
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
echo "   - NODE_ENV=production"
echo "   - PORT=3000"
echo "   - LOG_LEVEL=info"
echo "   - WHATSAPP_API_URL=https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id"
echo "   - WHATSAPP_USERNAME=0iK2Kv4m"
echo "   - WHATSAPP_PASSWORD=QUWlXsiaTHFBoSBM0WPtzRdQ"
echo "   - WHATSAPP_WEBHOOK_TOKEN=test_webhook_token_123"
echo "   - SUPABASE_URL=https://cwixdvfffqjeyhbvxsph.supabase.co"
echo "   - SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzkzNTEsImV4cCI6MjA3Mjg1NTM1MX0.m6VyCTNUuxEsSbDb7v0fem_wx7rlTjiyrg1Yoym04x8"
echo "   - SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzI3OTM1MSwiZXhwIjoyMDcyODU1MzUxfQ.IJSWJBcQLtnctjVArr9UeN-bcd_gDzUlUXKqIHOoeMA"
echo "   - GEMINI_API_KEY=AIzaSyAAds8Bj0-0xY7n9ZEk4jYeCFdYfYzVZmk"
echo ""
echo "6. Click 'Create Web Service'"
echo ""

# Step 3: Wait for user input
print_info "Step 3: Waiting for you to complete setup..."
echo ""
read -p "Press Enter when you have completed the Render setup..."

# Step 4: Test service
print_info "Step 4: Testing service after setup..."
echo ""

print_warning "Waiting 30 seconds for service to deploy..."
sleep 30

# Test service
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
if [[ "$HEALTH_RESPONSE" == *"OK"* ]] || [[ "$HEALTH_RESPONSE" == *"status"* ]]; then
    print_status "Health endpoint: Working!"
    echo "Response: $HEALTH_RESPONSE"
else
    print_warning "Health endpoint: Still starting up..."
    echo "Response: $HEALTH_RESPONSE"
fi

# Test webhook endpoint
print_info "Testing webhook endpoint..."
WEBHOOK_RESPONSE=$(curl -s --max-time 10 -X POST "$SERVICE_URL/webhook" -H "Content-Type: application/json" -d '{"message": "test"}' 2>/dev/null || echo "ERROR")
if [[ "$WEBHOOK_RESPONSE" == *"ERROR"* ]]; then
    print_warning "Webhook endpoint: Still starting up..."
else
    print_status "Webhook endpoint: Working!"
    echo "Response: $WEBHOOK_RESPONSE"
fi

# Step 5: Final instructions
print_info "Step 5: Final instructions"
echo ""
print_warning "If service is still not working:"
echo "1. Check Render dashboard for deployment logs"
echo "2. Verify all environment variables are set"
echo "3. Check if service is actually running"
echo "4. Wait 2-5 minutes for full deployment"
echo ""
print_info "Service URLs:"
echo "- Main: $SERVICE_URL"
echo "- Health: $SERVICE_URL/health"
echo "- Webhook: $SERVICE_URL/webhook"
echo ""
print_info "Monitoring:"
echo "- Render Dashboard: https://dashboard.render.com"
echo "- GitHub Actions: https://github.com/yudhapay/whatsapp-bot-server/actions"
echo ""
print_status "Setup guide completed! 🎉"
