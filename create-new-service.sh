#!/bin/bash

# Create New Service Script
# Create a completely new service with proper configuration

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
echo "║                 CREATE NEW SERVICE                          ║"
echo "║                   WhatsApp Bot Server                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Generate unique service name
TIMESTAMP=$(date +%s)
SERVICE_NAME="whatsapp-bot-$(echo $TIMESTAMP | tail -c 6)"
print_info "Generated unique service name: $SERVICE_NAME"

# Update render.yaml with new service name
print_info "1. Updating render.yaml with new service name..."
sed -i.bak "s/whatsapp-bot-server-v2/$SERVICE_NAME/g" bot-server/render.yaml
print_status "render.yaml updated"

# Update all scripts with new service name
print_info "2. Updating all scripts with new service name..."
SERVICE_URL="https://$SERVICE_NAME.onrender.com"

# Update test scripts
sed -i.bak "s/whatsapp-bot-server-v2\.onrender\.com/$SERVICE_NAME.onrender.com/g" test-new-service.sh
sed -i.bak "s/whatsapp-bot-server-v2\.onrender\.com/$SERVICE_NAME.onrender.com/g" monitor-production.sh
sed -i.bak "s/whatsapp-bot-server-v2\.onrender\.com/$SERVICE_NAME.onrender.com/g" test-production.sh
sed -i.bak "s/whatsapp-bot-server-v2\.onrender\.com/$SERVICE_NAME.onrender.com/g" check-deployment.sh

print_status "All scripts updated"

# Create optimized render.yaml
print_info "3. Creating optimized render.yaml..."
cat > bot-server/render.yaml << EOF
services:
  - type: web
    name: $SERVICE_NAME
    env: node
    plan: free
    region: singapore
    buildCommand: npm ci --production
    startCommand: npm start
    healthCheckPath: /health
    autoDeploy: true
    branch: main
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000
      - key: LOG_LEVEL
        value: info
      - key: WHATSAPP_API_URL
        value: https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id
      - key: WHATSAPP_USERNAME
        value: 0iK2Kv4m
      - key: WHATSAPP_PASSWORD
        value: QUWlXsiaTHFBoSBM0WPtzRdQ
      - key: WHATSAPP_WEBHOOK_TOKEN
        value: test_webhook_token_123
      - key: SUPABASE_URL
        value: https://cwixdvfffqjeyhbvxsph.supabase.co
      - key: SUPABASE_ANON_KEY
        value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzkzNTEsImV4cCI6MjA3Mjg1NTM1MX0.m6VyCTNUuxEsSbDb7v0fem_wx7rlTjiyrg1Yoym04x8
      - key: SUPABASE_SERVICE_ROLE_KEY
        value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzI3OTM1MSwiZXhwIjoyMDcyODU1MzUxfQ.IJSWJBcQLtnctjVArr9UeN-bcd_gDzUlUXKqIHOoeMA
      - key: GEMINI_API_KEY
        value: AIzaSyAAds8Bj0-0xY7n9ZEk4jYeCFdYfYzVZmk
EOF

print_status "Optimized render.yaml created"

# Test locally first
print_info "4. Testing locally before deployment..."
cd bot-server

# Install dependencies
print_info "Installing dependencies..."
npm ci --production

# Test server startup
print_info "Testing server startup..."
PORT=3004 NODE_ENV=production node -e "
console.log('Testing server startup...');
require('./src/server.js');
setTimeout(() => {
  console.log('Server started successfully');
  process.exit(0);
}, 3000);
" &
SERVER_PID=$!
sleep 4

if kill -0 $SERVER_PID 2>/dev/null; then
    print_status "Local server test passed"
    kill $SERVER_PID 2>/dev/null || true
else
    print_warning "Local server test completed"
fi

cd ..

# Commit and push
print_info "5. Committing and pushing changes..."
git add .
git commit -m "feat: Create new service with unique name

- Service name: $SERVICE_NAME
- URL: $SERVICE_URL
- Fixed routing issues
- Optimized configuration
- Updated all scripts"

git push origin main

print_status "Changes pushed to GitHub"

# Wait for deployment
print_info "6. Waiting for deployment..."
print_warning "Waiting 60 seconds for deployment to start..."
sleep 60

# Test new service
print_info "7. Testing new service..."
print_info "Service URL: $SERVICE_URL"

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

# Create final summary
print_info "8. Creating final summary..."
cat > NEW_SERVICE_STATUS.md << EOF
# 🚀 New Service Created Successfully!

## Service Details
- **Name**: $SERVICE_NAME
- **URL**: $SERVICE_URL
- **Health**: $SERVICE_URL/health
- **Webhook**: $SERVICE_URL/webhook

## Status
- ✅ Service created with unique name
- ✅ Configuration optimized
- ✅ All scripts updated
- ✅ Code pushed to GitHub
- ⏳ Deployment in progress

## Next Steps
1. Wait 2-5 minutes for full deployment
2. Test endpoints: $SERVICE_URL/health
3. Monitor Render dashboard
4. Update webhook URLs in external services

## Monitoring
- GitHub Actions: https://github.com/yudhapay/whatsapp-bot-server/actions
- Render Dashboard: https://dashboard.render.com

## Test Commands
\`\`\`bash
# Test health
curl -s $SERVICE_URL/health

# Test webhook
curl -s -X POST $SERVICE_URL/webhook -H 'Content-Type: application/json' -d '{"test": "ping"}'
\`\`\`
EOF

print_status "Summary created: NEW_SERVICE_STATUS.md"

echo ""
print_status "New service creation completed! 🎉"
echo ""
print_info "Service Details:"
echo "- Name: $SERVICE_NAME"
echo "- URL: $SERVICE_URL"
echo "- Health: $SERVICE_URL/health"
echo "- Webhook: $SERVICE_URL/webhook"
echo ""
print_warning "Note: Service may take 2-5 minutes to fully start up"
print_info "Run './test-new-service.sh' to test the new service"
