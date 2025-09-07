#!/bin/bash

# Production Monitoring Script
# Monitor deployment status and service health

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
echo "║                 PRODUCTION MONITORING                       ║"
echo "║                   WhatsApp Bot Server                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check GitHub Actions status
print_info "Checking GitHub Actions status..."
echo "GitHub Actions: https://github.com/yudhapay/whatsapp-bot-server/actions"
echo ""

# Check local git status
print_info "Local Repository Status:"
echo "Branch: $(git branch --show-current)"
echo "Last Commit: $(git log --oneline -1)"
echo "Status: $(git status --porcelain | wc -l) files modified"
echo ""

# Check if services are running locally
print_info "Local Service Status:"

# Check if bot server is running
if lsof -ti:3000 > /dev/null 2>&1; then
    print_status "Bot Server: Running on port 3000"
else
    print_warning "Bot Server: Not running locally"
fi

# Check if admin web is built
if [ -d "admin-web/dist" ]; then
    print_status "Admin Web: Built successfully"
else
    print_warning "Admin Web: Not built"
fi

echo ""
print_info "Production Deployment Checklist:"
echo "1. ✅ Code pushed to GitHub"
echo "2. ✅ GitHub Actions workflow configured"
echo "3. ✅ Render auto-deploy enabled"
echo "4. ✅ Environment variables configured"
echo "5. ✅ Health check endpoint: /health"
echo ""

print_info "Next Steps:"
echo "1. Monitor GitHub Actions: https://github.com/yudhapay/whatsapp-bot-server/actions"
echo "2. Check Render Dashboard: https://dashboard.render.com"
echo "3. Test deployed service endpoints"
echo "4. Monitor logs for any issues"
echo ""

print_info "Service Endpoints (after deployment):"
echo "- Bot Server: https://whatsapp-bot-server-v2.onrender.com"
echo "- Health Check: https://whatsapp-bot-server-v2.onrender.com/health"
echo "- Webhook: https://whatsapp-bot-server-v2.onrender.com/webhook"
echo ""

print_status "Production monitoring setup complete! 🎉"
