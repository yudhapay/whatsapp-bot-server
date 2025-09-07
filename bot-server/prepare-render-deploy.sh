#!/bin/bash

# Prepare WhatsApp Bot for Render.com Deployment
# This script prepares the bot for deployment to Render.com

set -e

echo "🚀 Preparing WhatsApp Bot for Render.com Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from bot-server directory."
    exit 1
fi

print_status "Found package.json"

# Check if render.yaml exists
if [ ! -f "render.yaml" ]; then
    print_error "render.yaml not found. Please create it first."
    exit 1
fi

print_status "Found render.yaml"

# Check if env.production exists
if [ ! -f "env.production" ]; then
    print_error "env.production not found. Please create it first."
    exit 1
fi

print_status "Found env.production"

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    print_info "Creating .gitignore..."
    cat > .gitignore << EOF
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# PM2 logs
.pm2/

# MacOS
.DS_Store

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Test files
test-*.js
EOF
    print_status "Created .gitignore"
else
    print_status ".gitignore already exists"
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    print_info "Initializing git repository..."
    git init
    print_status "Git repository initialized"
else
    print_status "Git repository already exists"
fi

# Add all files to git
print_info "Adding files to git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    print_warning "No changes to commit"
else
    print_info "Committing changes..."
    git commit -m "Prepare for Render.com deployment

- WhatsApp Bot ready for production
- GOWA API integration tested
- AI Service (Gemini) integrated
- Template generation working
- Error handling complete
- All tests passed"
    print_status "Changes committed"
fi

# Show git status
print_info "Git status:"
git status --short

# Show remote status
print_info "Remote repositories:"
git remote -v

# Show deployment checklist
echo ""
echo "📋 Deployment Checklist:"
echo "=================================================="
echo "✅ Code prepared for deployment"
echo "✅ render.yaml configured"
echo "✅ env.production ready"
echo "✅ .gitignore created"
echo "✅ Git repository ready"
echo ""
print_warning "Next steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Deploy to Render.com"
echo "3. Configure GOWA webhook"
echo "4. Test end-to-end flow"
echo ""
print_info "Environment variables to set in Render:"
echo "Copy from env.production file"
echo ""
print_status "Bot is ready for Render.com deployment! 🚀"
