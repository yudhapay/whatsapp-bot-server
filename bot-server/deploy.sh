#!/bin/bash

# WhatsApp Bot Deployment Script
# Usage: ./deploy.sh [production|development]

set -e

ENVIRONMENT=${1:-production}
echo "🚀 Deploying WhatsApp Bot in $ENVIRONMENT mode..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Node.js and npm are available"

# Install dependencies
print_status "Installing dependencies..."
npm install --production

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        print_warning "Please edit .env file with your production values"
    else
        print_error ".env.example not found. Please create .env file manually."
        exit 1
    fi
fi

# Set environment
export NODE_ENV=$ENVIRONMENT
print_status "Environment set to: $NODE_ENV"

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    print_warning "PM2 not found. Installing PM2..."
    npm install -g pm2
fi

# Stop existing process if running
print_status "Stopping existing processes..."
pm2 stop whatsapp-bot 2>/dev/null || true
pm2 delete whatsapp-bot 2>/dev/null || true

# Start the application
print_status "Starting WhatsApp Bot..."
pm2 start ecosystem.config.js --env $ENVIRONMENT

# Save PM2 configuration
pm2 save

# Show status
print_status "Deployment completed!"
echo ""
echo "📊 Application Status:"
pm2 status

echo ""
echo "📝 Useful Commands:"
echo "  View logs: pm2 logs whatsapp-bot"
echo "  Monitor: pm2 monit"
echo "  Restart: pm2 restart whatsapp-bot"
echo "  Stop: pm2 stop whatsapp-bot"

echo ""
echo "🔗 Health Check:"
echo "  http://localhost:3000/health"

echo ""
echo "📱 Webhook URL:"
echo "  http://localhost:3000/webhook"

if [ "$ENVIRONMENT" = "production" ]; then
    echo ""
    print_warning "Production mode enabled. Make sure to:"
    echo "  1. Configure your domain and SSL"
    echo "  2. Update GOWA API webhook URL"
    echo "  3. Upload templates to Supabase"
    echo "  4. Test end-to-end flow"
fi

print_status "Deployment script completed successfully! 🎉"
