#!/bin/bash

# Monitor After Setup Script
# Monitor service after Render setup completion

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

SERVICE_URL="https://whatsapp-bot-88061.onrender.com"

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                 POST-SETUP MONITORING                      ║"
echo "║                   WhatsApp Bot Server                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

print_info "Monitoring service after Render setup..."
echo "Service URL: $SERVICE_URL"
echo ""

# Test 1: Basic connectivity
print_info "1. Testing basic connectivity..."
if curl -s --max-time 10 "$SERVICE_URL" > /dev/null; then
    print_status "Service is accessible"
else
    print_error "Service is not accessible"
    exit 1
fi

# Test 2: Check headers for routing status
print_info "2. Checking routing status..."
HEADERS=$(curl -I --max-time 10 "$SERVICE_URL" 2>/dev/null)
echo "$HEADERS"

if echo "$HEADERS" | grep -q "x-render-routing: no-server"; then
    print_error "ROUTING ISSUE: Render cannot find running server"
    print_warning "Service may not be properly deployed or crashed"
elif echo "$HEADERS" | grep -q "x-render-routing: server"; then
    print_status "Routing: Server found and running"
else
    print_warning "Routing status: Unknown"
fi

# Test 3: Health endpoint
print_info "3. Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s --max-time 10 "$SERVICE_URL/health" 2>/dev/null || echo "ERROR")
if [[ "$HEALTH_RESPONSE" == *"OK"* ]] || [[ "$HEALTH_RESPONSE" == *"status"* ]] || [[ "$HEALTH_RESPONSE" == *"WhatsApp Bot Server"* ]]; then
    print_status "Health endpoint: Working!"
    echo "Response: $HEALTH_RESPONSE"
elif [[ "$HEALTH_RESPONSE" == *"Not Found"* ]]; then
    print_warning "Health endpoint: Not Found (service may still be starting)"
else
    print_warning "Health endpoint: Unexpected response"
    echo "Response: $HEALTH_RESPONSE"
fi

# Test 4: Webhook endpoint
print_info "4. Testing webhook endpoint..."
WEBHOOK_RESPONSE=$(curl -s --max-time 10 -X POST "$SERVICE_URL/webhook" -H "Content-Type: application/json" -d '{"message": "test", "from": "test_user"}' 2>/dev/null || echo "ERROR")
if [[ "$WEBHOOK_RESPONSE" == *"ERROR"* ]]; then
    print_warning "Webhook endpoint: Error or not accessible"
elif [[ "$WEBHOOK_RESPONSE" == *"Not Found"* ]]; then
    print_warning "Webhook endpoint: Not Found (service may still be starting)"
else
    print_status "Webhook endpoint: Working!"
    echo "Response: $WEBHOOK_RESPONSE"
fi

# Test 5: Root endpoint
print_info "5. Testing root endpoint..."
ROOT_RESPONSE=$(curl -s --max-time 10 "$SERVICE_URL/" 2>/dev/null || echo "ERROR")
if [[ "$ROOT_RESPONSE" == *"Client status"* ]]; then
    print_error "Wrong service type: WhatsApp client instead of bot server"
elif [[ "$ROOT_RESPONSE" == *"Not Found"* ]]; then
    print_warning "Root endpoint: Not Found (service may still be starting)"
elif [[ "$ROOT_RESPONSE" == *"ERROR"* ]]; then
    print_error "Root endpoint: Error"
else
    print_status "Root endpoint: Working!"
    echo "Response preview: $(echo "$ROOT_RESPONSE" | head -3)"
fi

# Test 6: Response time
print_info "6. Measuring response time..."
RESPONSE_TIME=$(curl -s --max-time 10 -w "%{time_total}" -o /dev/null "$SERVICE_URL" 2>/dev/null || echo "timeout")
if [ "$RESPONSE_TIME" != "timeout" ]; then
    print_status "Response time: ${RESPONSE_TIME}s"
else
    print_warning "Response time: Unable to measure"
fi

# Test 7: HTTP status
print_info "7. Checking HTTP status..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$SERVICE_URL")
print_info "HTTP Status: $HTTP_STATUS"

if [ "$HTTP_STATUS" = "200" ]; then
    print_status "HTTP Status: OK"
elif [ "$HTTP_STATUS" = "404" ]; then
    print_warning "HTTP Status: 404 - Service may not be properly configured"
else
    print_warning "HTTP Status: $HTTP_STATUS - Service may be starting"
fi

# Summary
echo ""
print_info "MONITORING SUMMARY:"
echo "==================="

# Check if service is working properly
if echo "$HEADERS" | grep -q "x-render-routing: server" && [[ "$HEALTH_RESPONSE" == *"OK"* ]]; then
    print_status "🎉 SERVICE IS WORKING CORRECTLY!"
    echo ""
    print_info "All endpoints are functional:"
    echo "- Health: $SERVICE_URL/health"
    echo "- Webhook: $SERVICE_URL/webhook"
    echo "- Main: $SERVICE_URL"
    echo ""
    print_info "You can now use the service for WhatsApp bot integration!"
    
elif echo "$HEADERS" | grep -q "x-render-routing: no-server"; then
    print_error "❌ SERVICE NOT PROPERLY DEPLOYED"
    echo ""
    print_warning "Troubleshooting steps:"
    echo "1. Check Render dashboard for deployment logs"
    echo "2. Verify all environment variables are set"
    echo "3. Check if service is actually running"
    echo "4. Look for build errors in logs"
    echo "5. Try redeploying the service"
    
else
    print_warning "⚠️  SERVICE IS STARTING UP"
    echo ""
    print_info "Service is accessible but may still be starting up"
    print_warning "Wait 2-5 minutes and run this script again"
    print_info "Or check Render dashboard for deployment status"
fi

echo ""
print_info "Monitoring completed! 🔍"
echo ""
print_info "Next steps:"
echo "1. If working: Test with your WhatsApp integration"
echo "2. If not working: Check Render dashboard logs"
echo "3. If starting: Wait and test again in a few minutes"
echo ""
print_info "Useful commands:"
echo "curl -s $SERVICE_URL/health"
echo "curl -s -X POST $SERVICE_URL/webhook -H 'Content-Type: application/json' -d '{\"test\": \"ping\"}'"
