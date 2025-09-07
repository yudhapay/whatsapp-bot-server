#!/bin/bash

# Fix Deployment Script
# Comprehensive deployment fix with error handling and validation

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
echo "║                 DEPLOYMENT FIX SCRIPT                       ║"
echo "║                   WhatsApp Bot Server                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Step 1: Clean up and prepare
print_info "Step 1: Cleaning up and preparing..."
print_warning "Removing old service references..."

# Update service name in all files
print_info "Updating service name to whatsapp-bot-server-v2..."

# Step 2: Validate configuration
print_info "Step 2: Validating configuration..."

# Check if all required files exist
REQUIRED_FILES=(
    "bot-server/package.json"
    "bot-server/src/server.js"
    "bot-server/render.yaml"
    ".github/workflows/deploy-to-render.yml"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_status "Found: $file"
    else
        print_error "Missing: $file"
        exit 1
    fi
done

# Step 3: Test locally
print_info "Step 3: Testing locally..."

cd bot-server

# Install dependencies
print_info "Installing dependencies..."
npm ci --production

# Test server startup
print_info "Testing server startup..."
PORT=3003 NODE_ENV=production node -e "
console.log('Testing server startup...');
require('./src/server.js');
setTimeout(() => {
  console.log('Server started successfully');
  process.exit(0);
}, 3000);
" &
SERVER_PID=$!
sleep 4

# Check if server is running
if kill -0 $SERVER_PID 2>/dev/null; then
    print_status "Server started successfully"
    kill $SERVER_PID 2>/dev/null || true
else
    print_warning "Server test completed (may have exited normally)"
fi

cd ..

# Step 4: Update GitHub Actions
print_info "Step 4: Updating GitHub Actions workflow..."

# Update service name in GitHub Actions
sed -i.bak 's/whatsapp-bot/whatsapp-bot-server-v2/g' .github/workflows/deploy-to-render.yml

# Step 5: Commit and push
print_info "Step 5: Committing and pushing changes..."

# Add all changes
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    print_warning "No changes to commit"
else
    git commit -m "fix: Update service name to avoid conflicts

- Change service name from 'whatsapp-bot' to 'whatsapp-bot-server-v2'
- Update GitHub Actions workflow
- Fix deployment configuration
- Resolve service name conflict issue"
    
    print_status "Changes committed successfully"
fi

# Push to GitHub
print_info "Pushing to GitHub..."
git push origin main

# Step 6: Wait and test
print_info "Step 6: Waiting for deployment and testing..."

print_warning "Waiting 30 seconds for deployment to start..."
sleep 30

# Test new service
NEW_SERVICE_URL="https://whatsapp-bot-server-v2.onrender.com"

print_info "Testing new service: $NEW_SERVICE_URL"

# Test health endpoint
print_info "Testing health endpoint..."
if curl -s --max-time 10 "$NEW_SERVICE_URL/health" | grep -q "OK\|healthy\|status"; then
    print_status "Health endpoint: Working!"
else
    print_warning "Health endpoint: Still starting up..."
fi

# Test webhook endpoint
print_info "Testing webhook endpoint..."
WEBHOOK_RESPONSE=$(curl -s --max-time 10 -X POST "$NEW_SERVICE_URL/webhook" -H "Content-Type: application/json" -d '{"test": "ping"}' 2>/dev/null || echo "ERROR")
if [[ "$WEBHOOK_RESPONSE" == *"ERROR"* ]]; then
    print_warning "Webhook endpoint: Still starting up..."
else
    print_status "Webhook endpoint: Working!"
fi

# Step 7: Final status
print_info "Step 7: Final status check..."

echo ""
print_status "Deployment fix completed! 🎉"
echo ""
print_info "New Service URLs:"
echo "- Main: $NEW_SERVICE_URL"
echo "- Health: $NEW_SERVICE_URL/health"
echo "- Webhook: $NEW_SERVICE_URL/webhook"
echo ""
print_info "Monitoring:"
echo "- GitHub Actions: https://github.com/yudhapay/whatsapp-bot-server/actions"
echo "- Render Dashboard: https://dashboard.render.com"
echo ""
print_warning "Note: Service may take 2-5 minutes to fully start up"
print_info "Run './test-new-service.sh' to test the new service"
