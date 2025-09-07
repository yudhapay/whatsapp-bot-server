#!/bin/bash

# Switch to Production Mode Script
# This script switches the bot from development to production mode

set -e

echo "🔄 Switching WhatsApp Bot to Production Mode..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Backup current messageService
print_status "Backing up current messageService..."
cp src/services/messageService.js src/services/messageService.dev.js

# Replace with production version
print_status "Switching to production messageService..."
cp src/services/messageService.prod.js src/services/messageService.js

# Update .env to production mode
print_status "Updating environment to production..."
if [ -f .env ]; then
    # Backup current .env
    cp .env .env.dev
    
    # Update NODE_ENV to production
    sed -i.bak 's/NODE_ENV=development/NODE_ENV=production/' .env
    
    print_status "Environment updated to production mode"
else
    print_error ".env file not found. Please create it first."
    exit 1
fi

# Update package.json scripts if needed
print_status "Checking package.json scripts..."
if grep -q "dev" package.json; then
    print_warning "Development scripts found in package.json"
    print_warning "Consider updating start script for production"
fi

# Restart PM2 if running
if command -v pm2 &> /dev/null; then
    print_status "Restarting PM2 processes..."
    pm2 restart whatsapp-bot 2>/dev/null || print_warning "PM2 not running or whatsapp-bot not found"
fi

print_status "Production mode switch completed!"
echo ""
print_warning "IMPORTANT: Production mode changes:"
echo "  - Messages will be sent to actual WhatsApp numbers"
echo "  - No development mode logging"
echo "  - Real GOWA API calls"
echo ""
print_warning "Make sure to:"
echo "  1. Test with a real WhatsApp number"
echo "  2. Verify GOWA API configuration"
echo "  3. Check all environment variables"
echo "  4. Monitor logs: pm2 logs whatsapp-bot"
echo ""
print_status "Bot is now in PRODUCTION MODE! 🚀"
