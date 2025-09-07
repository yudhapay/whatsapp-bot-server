#!/bin/bash

# Test New Service Script
# Test the new whatsapp-bot-server-v2 service

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

# New service URL
SERVICE_URL="https://whatsapp-bot-server-v2.onrender.com"

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                 NEW SERVICE TESTING                         ║"
echo "║              whatsapp-bot-server-v2                        ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

print_info "Testing new service: $SERVICE_URL"
echo ""

# Test 1: Basic connectivity
print_info "1. Testing basic connectivity..."
if curl -s --max-time 10 "$SERVICE_URL" > /dev/null; then
    print_status "Service is accessible"
else
    print_error "Service is not accessible"
    exit 1
fi

# Test 2: Health endpoint
print_info "2. Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s --max-time 10 "$SERVICE_URL/health" 2>/dev/null || echo "ERROR")
if [[ "$HEALTH_RESPONSE" == *"ERROR"* ]] || [[ "$HEALTH_RESPONSE" == *"Cannot GET"* ]]; then
    print_warning "Health endpoint: Not ready yet"
    echo "Response: $HEALTH_RESPONSE"
else
    print_status "Health endpoint: Working!"
    echo "Response: $HEALTH_RESPONSE"
fi

# Test 3: Webhook endpoint
print_info "3. Testing webhook endpoint..."
WEBHOOK_RESPONSE=$(curl -s --max-time 10 -X POST "$SERVICE_URL/webhook" -H "Content-Type: application/json" -d '{"message": "test", "from": "test_user"}' 2>/dev/null || echo "ERROR")
if [[ "$WEBHOOK_RESPONSE" == *"ERROR"* ]] || [[ "$WEBHOOK_RESPONSE" == *"Cannot POST"* ]]; then
    print_warning "Webhook endpoint: Not ready yet"
    echo "Response: $WEBHOOK_RESPONSE"
else
    print_status "Webhook endpoint: Working!"
    echo "Response: $WEBHOOK_RESPONSE"
fi

# Test 4: Response time
print_info "4. Measuring response time..."
RESPONSE_TIME=$(curl -s --max-time 10 -w "%{time_total}" -o /dev/null "$SERVICE_URL" 2>/dev/null || echo "timeout")
if [ "$RESPONSE_TIME" != "timeout" ]; then
    print_status "Response time: ${RESPONSE_TIME}s"
else
    print_warning "Response time: Unable to measure"
fi

# Test 5: Service type verification
print_info "5. Verifying service type..."
ROOT_RESPONSE=$(curl -s --max-time 10 "$SERVICE_URL" 2>/dev/null || echo "ERROR")
if [[ "$ROOT_RESPONSE" == *"Client status"* ]]; then
    print_error "Wrong service type detected (WhatsApp client instead of bot server)"
elif [[ "$ROOT_RESPONSE" == *"Error"* ]]; then
    print_warning "Service error or still starting"
else
    print_status "Service type: Correct (bot server)"
fi

# Test 6: JSON response test
print_info "6. Testing JSON response..."
JSON_RESPONSE=$(curl -s --max-time 10 -H "Accept: application/json" "$SERVICE_URL/health" 2>/dev/null || echo "ERROR")
if echo "$JSON_RESPONSE" | jq . > /dev/null 2>&1; then
    print_status "JSON response: Valid"
    echo "Response: $JSON_RESPONSE"
else
    print_warning "JSON response: Not valid or not ready"
fi

echo ""
print_info "Test Summary:"
echo "============="
echo "Service URL: $SERVICE_URL"
echo "Health: $SERVICE_URL/health"
echo "Webhook: $SERVICE_URL/webhook"
echo ""

# Final recommendation
if [[ "$HEALTH_RESPONSE" == *"OK"* ]] || [[ "$HEALTH_RESPONSE" == *"status"* ]]; then
    print_status "Service is working correctly! 🎉"
    print_info "You can now use the new service endpoints"
else
    print_warning "Service is still starting up..."
    print_info "Wait 2-5 minutes and run this script again"
    print_info "Or check Render dashboard for deployment status"
fi

echo ""
print_info "Manual test commands:"
echo "curl -s $SERVICE_URL/health"
echo "curl -s -X POST $SERVICE_URL/webhook -H 'Content-Type: application/json' -d '{\"test\": \"ping\"}'"
