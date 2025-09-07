#!/bin/bash

# Update Configuration Script
# Update all configuration files for the new service

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
echo "║                 CONFIGURATION UPDATE                        ║"
echo "║                   WhatsApp Bot Server                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Update cursor-deploy.sh
print_info "Updating cursor-deploy.sh..."
sed -i.bak 's/whatsapp-bot\.onrender\.com/whatsapp-bot-server-v2.onrender.com/g' cursor-deploy.sh
print_status "cursor-deploy.sh updated"

# Update monitor-production.sh
print_info "Updating monitor-production.sh..."
sed -i.bak 's/whatsapp-bot\.onrender\.com/whatsapp-bot-server-v2.onrender.com/g' monitor-production.sh
print_status "monitor-production.sh updated"

# Update test-production.sh
print_info "Updating test-production.sh..."
sed -i.bak 's/whatsapp-bot\.onrender\.com/whatsapp-bot-server-v2.onrender.com/g' test-production.sh
print_status "test-production.sh updated"

# Update check-deployment.sh
print_info "Updating check-deployment.sh..."
sed -i.bak 's/whatsapp-bot\.onrender\.com/whatsapp-bot-server-v2.onrender.com/g' check-deployment.sh
print_status "check-deployment.sh updated"

# Update env.example
print_info "Updating env.example..."
sed -i.bak 's/RENDER_SERVICE_ID=/RENDER_SERVICE_ID_V2=/g' env.example
print_status "env.example updated"

# Create new environment template
print_info "Creating new environment template..."
cat > env.production.new << EOF
# Production Environment Variables for whatsapp-bot-server-v2
# Copy these to Render.com Environment Variables

NODE_ENV=production
PORT=3000
LOG_LEVEL=info

# WhatsApp Configuration
WHATSAPP_API_URL=https://gowa-gh2m5ozca4dh.wortel.sumopod.my.id
WHATSAPP_USERNAME=0iK2Kv4m
WHATSAPP_PASSWORD=QUWlXsiaTHFBoSBM0WPtzRdQ
WHATSAPP_WEBHOOK_TOKEN=test_webhook_token_123

# Supabase Configuration
SUPABASE_URL=https://cwixdvfffqjeyhbvxsph.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzkzNTEsImV4cCI6MjA3Mjg1NTM1MX0.m6VyCTNUuxEsSbDb7v0fem_wx7rlTjiyrg1Yoym04x8
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXhkdmZmZnFqZXloYnZ4c3BoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzI3OTM1MSwiZXhwIjoyMDcyODU1MzUxfQ.IJSWJBcQLtnctjVArr9UeN-bcd_gDzUlUXKqIHOoeMA

# AI Configuration
GEMINI_API_KEY=AIzaSyAAds8Bj0-0xY7n9ZEk4jYeCFdYfYzVZmk

# Render Configuration (for GitHub Actions)
RENDER_API_KEY=your_render_api_key_here
RENDER_SERVICE_ID_V2=your_new_service_id_here
RENDER_ADMIN_SERVICE_ID_V2=your_admin_service_id_here
EOF

print_status "New environment template created"

# Update documentation
print_info "Updating documentation..."
cat > DEPLOYMENT_FIX_GUIDE.md << EOF
# 🚀 Deployment Fix Guide

## Problem Identified
- Service name 'whatsapp-bot' was already in use
- Deployment was going to wrong service
- Health and webhook endpoints not accessible

## Solution Applied
- Changed service name to 'whatsapp-bot-server-v2'
- Updated all configuration files
- Created new deployment scripts
- Updated GitHub Actions workflow

## New Service URLs
- Main: https://whatsapp-bot-server-v2.onrender.com
- Health: https://whatsapp-bot-server-v2.onrender.com/health
- Webhook: https://whatsapp-bot-server-v2.onrender.com/webhook

## Required GitHub Secrets
- RENDER_API_KEY
- RENDER_SERVICE_ID_V2 (new service ID)
- RENDER_ADMIN_SERVICE_ID_V2 (if admin web needed)

## Testing Commands
\`\`\`bash
# Test new service
./test-new-service.sh

# Fix deployment
./fix-deployment.sh

# Monitor service
./monitor-production.sh
\`\`\`

## Next Steps
1. Update GitHub secrets with new service IDs
2. Run fix-deployment.sh
3. Test with test-new-service.sh
4. Monitor deployment progress
EOF

print_status "Documentation updated"

# Clean up backup files
print_info "Cleaning up backup files..."
rm -f *.bak
print_status "Backup files cleaned"

echo ""
print_status "Configuration update completed! 🎉"
echo ""
print_info "Updated files:"
echo "- cursor-deploy.sh"
echo "- monitor-production.sh" 
echo "- test-production.sh"
echo "- check-deployment.sh"
echo "- env.example"
echo "- Created env.production.new"
echo "- Created DEPLOYMENT_FIX_GUIDE.md"
echo ""
print_warning "Next steps:"
echo "1. Update GitHub secrets with new service IDs"
echo "2. Run ./fix-deployment.sh"
echo "3. Test with ./test-new-service.sh"
