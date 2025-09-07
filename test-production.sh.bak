#!/bin/bash

# Production Testing Script
# Test deployed services and verify functionality

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

# Production URLs
BOT_SERVER_URL="https://whatsapp-bot-server-v2.onrender.com"
HEALTH_ENDPOINT="$BOT_SERVER_URL/health"
WEBHOOK_ENDPOINT="$BOT_SERVER_URL/webhook"

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                 PRODUCTION TESTING                          ║"
echo "║                   WhatsApp Bot Server                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

print_info "Testing Production Services..."
echo ""

# Test 1: Health Check
print_info "1. Testing Health Check Endpoint..."
if curl -s --max-time 10 "$HEALTH_ENDPOINT" > /dev/null; then
    print_status "Health Check: Service is running"
    HEALTH_RESPONSE=$(curl -s --max-time 10 "$HEALTH_ENDPOINT")
    echo "Response: $HEALTH_RESPONSE"
else
    print_error "Health Check: Service not responding"
    print_warning "This might be normal if deployment is still in progress"
fi
echo ""

# Test 2: Webhook Endpoint
print_info "2. Testing Webhook Endpoint..."
if curl -s --max-time 10 -X POST "$WEBHOOK_ENDPOINT" -H "Content-Type: application/json" -d '{"test": "ping"}' > /dev/null; then
    print_status "Webhook: Endpoint is accessible"
else
    print_warning "Webhook: Endpoint not responding (might require authentication)"
fi
echo ""

# Test 3: Service Status
print_info "3. Checking Service Status..."
if curl -s --max-time 10 "$BOT_SERVER_URL" > /dev/null; then
    print_status "Main Service: Accessible"
else
    print_error "Main Service: Not accessible"
fi
echo ""

# Test 4: Response Time
print_info "4. Measuring Response Time..."
RESPONSE_TIME=$(curl -s --max-time 10 -w "%{time_total}" -o /dev/null "$HEALTH_ENDPOINT" 2>/dev/null || echo "timeout")
if [ "$RESPONSE_TIME" != "timeout" ]; then
    print_status "Response Time: ${RESPONSE_TIME}s"
else
    print_warning "Response Time: Unable to measure (service might be starting)"
fi
echo ""

# Test 5: Check if service is ready
print_info "5. Service Readiness Check..."
if curl -s --max-time 5 "$HEALTH_ENDPOINT" | grep -q "ok\|healthy\|running"; then
    print_status "Service Status: Ready for production"
else
    print_warning "Service Status: Starting up or not ready"
fi
echo ""

print_info "Production Test Summary:"
echo "=========================="
echo "Bot Server URL: $BOT_SERVER_URL"
echo "Health Check: $HEALTH_ENDPOINT"
echo "Webhook: $WEBHOOK_ENDPOINT"
echo ""

print_info "Manual Testing Commands:"
echo "curl -s $HEALTH_ENDPOINT"
echo "curl -s -X POST $WEBHOOK_ENDPOINT -H 'Content-Type: application/json' -d '{\"test\": \"ping\"}'"
echo ""

print_status "Production testing completed! 🎉"
