#!/bin/bash

# Deployment Status Checker
# Check deployment status and troubleshoot issues

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
echo "║                 DEPLOYMENT STATUS CHECK                     ║"
echo "║                   WhatsApp Bot Server                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check GitHub Actions
print_info "1. Checking GitHub Actions Status..."
echo "GitHub Actions: https://github.com/yudhapay/whatsapp-bot-server/actions"
echo ""

# Check Render service status
print_info "2. Checking Render Service Status..."
echo "Render Dashboard: https://dashboard.render.com"
echo ""

# Test different endpoints
print_info "3. Testing Service Endpoints..."

BOT_URL="https://whatsapp-bot-server-v2.onrender.com"

# Test root endpoint
echo "Testing root endpoint: $BOT_URL"
ROOT_RESPONSE=$(curl -s --max-time 10 "$BOT_URL" 2>/dev/null || echo "ERROR")
if [[ "$ROOT_RESPONSE" == *"Error"* ]]; then
    print_error "Root endpoint: Not accessible"
else
    print_status "Root endpoint: Accessible"
    echo "Response preview: $(echo "$ROOT_RESPONSE" | head -3)"
fi
echo ""

# Test health endpoint
echo "Testing health endpoint: $BOT_URL/health"
HEALTH_RESPONSE=$(curl -s --max-time 10 "$BOT_URL/health" 2>/dev/null || echo "ERROR")
if [[ "$HEALTH_RESPONSE" == *"Error"* ]] || [[ "$HEALTH_RESPONSE" == *"Cannot GET"* ]]; then
    print_warning "Health endpoint: Not configured or service starting"
else
    print_status "Health endpoint: Working"
    echo "Response: $HEALTH_RESPONSE"
fi
echo ""

# Test webhook endpoint
echo "Testing webhook endpoint: $BOT_URL/webhook"
WEBHOOK_RESPONSE=$(curl -s --max-time 10 -X POST "$BOT_URL/webhook" -H "Content-Type: application/json" -d '{"test": "ping"}' 2>/dev/null || echo "ERROR")
if [[ "$WEBHOOK_RESPONSE" == *"Error"* ]] || [[ "$WEBHOOK_RESPONSE" == *"Cannot POST"* ]]; then
    print_warning "Webhook endpoint: Not configured or service starting"
else
    print_status "Webhook endpoint: Working"
    echo "Response: $WEBHOOK_RESPONSE"
fi
echo ""

# Check if service is still deploying
print_info "4. Deployment Status Analysis..."
if [[ "$ROOT_RESPONSE" == *"Error"* ]]; then
    print_warning "Service appears to be still deploying or has issues"
    echo "Common causes:"
    echo "- Service is still starting up (can take 2-5 minutes)"
    echo "- Build failed during deployment"
    echo "- Environment variables not configured"
    echo "- Port configuration issues"
else
    print_status "Service is accessible"
fi
echo ""

# Provide troubleshooting steps
print_info "5. Troubleshooting Steps:"
echo "1. Check Render Dashboard for deployment logs"
echo "2. Verify environment variables are set correctly"
echo "3. Check if build completed successfully"
echo "4. Wait 2-5 minutes for service to fully start"
echo "5. Check GitHub Actions for any build errors"
echo ""

print_info "6. Next Actions:"
echo "- Monitor Render Dashboard: https://dashboard.render.com"
echo "- Check GitHub Actions: https://github.com/yudhapay/whatsapp-bot-server/actions"
echo "- Wait a few minutes and run this script again"
echo ""

print_status "Deployment check completed! 🔍"
