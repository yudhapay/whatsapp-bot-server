#!/bin/bash

# Diagnose Deployment Issues
# Comprehensive diagnosis of deployment problems

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
echo "║                 DEPLOYMENT DIAGNOSIS                       ║"
echo "║                   WhatsApp Bot Server                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check service status
print_info "1. Checking service status..."
SERVICE_URL="https://whatsapp-bot-server-v2.onrender.com"

# Check if service is accessible
if curl -s --max-time 10 "$SERVICE_URL" > /dev/null; then
    print_status "Service is accessible"
else
    print_error "Service is not accessible"
    exit 1
fi

# Check headers for routing issues
print_info "2. Checking routing headers..."
HEADERS=$(curl -I --max-time 10 "$SERVICE_URL" 2>/dev/null)
echo "$HEADERS"

if echo "$HEADERS" | grep -q "x-render-routing: no-server"; then
    print_error "ROUTING ISSUE: Render cannot find running server"
    print_warning "This indicates deployment failed or service crashed"
elif echo "$HEADERS" | grep -q "x-render-routing: server"; then
    print_status "Routing: Server found"
else
    print_warning "Routing status: Unknown"
fi

# Check HTTP status
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$SERVICE_URL")
print_info "3. HTTP Status: $HTTP_STATUS"

if [ "$HTTP_STATUS" = "404" ]; then
    print_error "404 Not Found - Service not properly deployed"
elif [ "$HTTP_STATUS" = "200" ]; then
    print_status "200 OK - Service is running"
else
    print_warning "HTTP Status: $HTTP_STATUS - Service may be starting"
fi

# Check if it's a different service
print_info "4. Checking service type..."
ROOT_RESPONSE=$(curl -s --max-time 10 "$SERVICE_URL" 2>/dev/null || echo "ERROR")
if [[ "$ROOT_RESPONSE" == *"Client status"* ]]; then
    print_error "Wrong service type: WhatsApp client instead of bot server"
elif [[ "$ROOT_RESPONSE" == *"Not Found"* ]]; then
    print_warning "Service responding but endpoints not found"
elif [[ "$ROOT_RESPONSE" == *"ERROR"* ]]; then
    print_error "Service error or not accessible"
else
    print_status "Service type: Unknown but responding"
fi

# Check GitHub Actions status
print_info "5. Checking GitHub Actions status..."
echo "GitHub Actions: https://github.com/yudhapay/whatsapp-bot-server/actions"
echo "Check if deployment workflow is running or failed"

# Check Render dashboard
print_info "6. Checking Render dashboard..."
echo "Render Dashboard: https://dashboard.render.com"
echo "Look for service 'whatsapp-bot-server-v2'"

# Diagnose possible causes
print_info "7. Possible causes analysis..."

if echo "$HEADERS" | grep -q "x-render-routing: no-server"; then
    print_warning "LIKELY CAUSES:"
    echo "1. Service deployment failed"
    echo "2. Service crashed during startup"
    echo "3. Environment variables not set correctly"
    echo "4. Build process failed"
    echo "5. Port configuration issue"
    echo "6. Service name conflict"
elif [ "$HTTP_STATUS" = "404" ]; then
    print_warning "LIKELY CAUSES:"
    echo "1. Routes not properly configured"
    echo "2. Server not listening on correct port"
    echo "3. Middleware issues"
    echo "4. Express app not properly configured"
fi

# Provide solutions
print_info "8. Recommended solutions..."

echo ""
print_warning "IMMEDIATE ACTIONS:"
echo "1. Check Render dashboard for deployment logs"
echo "2. Verify environment variables are set"
echo "3. Check if service is actually running"
echo "4. Look for build errors in logs"

echo ""
print_warning "DEBUGGING STEPS:"
echo "1. Check Render service logs"
echo "2. Verify service configuration"
echo "3. Test locally with production environment"
echo "4. Check for port conflicts"

echo ""
print_warning "ALTERNATIVE SOLUTIONS:"
echo "1. Create new service with different name"
echo "2. Delete and recreate service"
echo "3. Check Render service limits"
echo "4. Verify GitHub Actions secrets"

# Create fix script
print_info "9. Creating fix script..."
cat > fix-routing-issue.sh << 'EOF'
#!/bin/bash

echo "🔧 FIXING ROUTING ISSUE"
echo "======================"

# Check if service exists in Render
echo "1. Checking Render service status..."
echo "Go to: https://dashboard.render.com"
echo "Look for service: whatsapp-bot-server-v2"

# Check GitHub Actions
echo "2. Checking GitHub Actions..."
echo "Go to: https://github.com/yudhapay/whatsapp-bot-server/actions"

# Check environment variables
echo "3. Checking environment variables..."
echo "Verify these are set in Render:"
echo "- NODE_ENV=production"
echo "- PORT=3000"
echo "- All API keys and URLs"

# Check service logs
echo "4. Checking service logs..."
echo "In Render dashboard, check 'Logs' tab"

# Test local deployment
echo "5. Testing local deployment..."
cd bot-server
NODE_ENV=production PORT=3000 node src/server.js &
LOCAL_PID=$!
sleep 3

if kill -0 $LOCAL_PID 2>/dev/null; then
    echo "✅ Local server started successfully"
    kill $LOCAL_PID
else
    echo "❌ Local server failed to start"
fi

cd ..

echo ""
echo "If all checks pass, the issue is with Render deployment"
echo "Consider creating a new service or checking Render limits"
EOF

chmod +x fix-routing-issue.sh
print_status "Fix script created: fix-routing-issue.sh"

echo ""
print_status "Diagnosis completed! 🔍"
echo ""
print_info "Next steps:"
echo "1. Check Render dashboard for service status"
echo "2. Check GitHub Actions for deployment status"
echo "3. Run ./fix-routing-issue.sh for detailed fixes"
echo "4. Consider creating new service if current one is broken"
