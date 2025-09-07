#!/bin/bash

# Cursor AI + Render Deployment Script
# Script ini memudahkan deployment dari Cursor AI ke Render

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Banner
echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    CURSOR AI + RENDER                       ║"
echo "║                   DEPLOYMENT HELPER                         ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    print_error "Not in a git repository. Please run this from the project root."
    exit 1
fi

# Check if git is configured
if ! git config user.name > /dev/null 2>&1; then
    print_warning "Git user not configured. Setting up..."
    read -p "Enter your name: " git_name
    read -p "Enter your email: " git_email
    git config user.name "$git_name"
    git config user.email "$git_email"
    print_status "Git configured successfully"
fi

# Check current branch
current_branch=$(git branch --show-current)
print_info "Current branch: $current_branch"

# Ask what to deploy
echo ""
echo "What would you like to deploy?"
echo "1) Bot Server only"
echo "2) Admin Web only" 
echo "3) Both (Bot Server + Admin Web)"
echo "4) Just commit and push (no deployment)"
read -p "Choose option (1-4): " deploy_option

case $deploy_option in
    1)
        deploy_bot=true
        deploy_admin=false
        ;;
    2)
        deploy_bot=false
        deploy_admin=true
        ;;
    3)
        deploy_bot=true
        deploy_admin=true
        ;;
    4)
        deploy_bot=false
        deploy_admin=false
        ;;
    *)
        print_error "Invalid option. Exiting."
        exit 1
        ;;
esac

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted changes."
    echo "Files with changes:"
    git status --short
    
    echo ""
    read -p "Do you want to commit these changes? (y/n): " commit_changes
    
    if [ "$commit_changes" = "y" ] || [ "$commit_changes" = "Y" ]; then
        read -p "Enter commit message: " commit_message
        git add .
        git commit -m "$commit_message"
        print_status "Changes committed successfully"
    else
        print_warning "Skipping commit. Make sure to commit changes manually."
    fi
fi

# Push to GitHub
print_info "Pushing to GitHub..."
git push origin $current_branch
print_status "Code pushed to GitHub successfully"

if [ "$deploy_bot" = false ] && [ "$deploy_admin" = false ]; then
    print_status "Code pushed to GitHub. Render will auto-deploy if configured."
    exit 0
fi

# Check if Render CLI is installed
if ! command -v render &> /dev/null; then
    print_warning "Render CLI not found. Installing..."
    curl -fsSL https://cli.render.com/install | sh
    export PATH="$PATH:$HOME/.render"
fi

# Deploy Bot Server
if [ "$deploy_bot" = true ]; then
    print_info "Deploying Bot Server..."
    
    # Check if bot server has changes
    if git diff --quiet HEAD~1 HEAD -- bot-server/; then
        print_warning "No changes detected in bot-server directory"
    else
        print_status "Changes detected in bot-server directory"
    fi
    
    # Deploy using Render CLI
    cd bot-server
    if render services deploy --service-id $RENDER_SERVICE_ID; then
        print_status "Bot Server deployed successfully!"
    else
        print_error "Bot Server deployment failed"
    fi
    cd ..
fi

# Deploy Admin Web
if [ "$deploy_admin" = true ]; then
    print_info "Deploying Admin Web..."
    
    # Check if admin web has changes
    if git diff --quiet HEAD~1 HEAD -- admin-web/; then
        print_warning "No changes detected in admin-web directory"
    else
        print_status "Changes detected in admin-web directory"
    fi
    
    # Build admin web
    cd admin-web
    print_info "Building admin web..."
    npm run build
    
    # Deploy using Render CLI
    if render services deploy --service-id $RENDER_ADMIN_SERVICE_ID; then
        print_status "Admin Web deployed successfully!"
    else
        print_error "Admin Web deployment failed"
    fi
    cd ..
fi

echo ""
print_status "Deployment process completed! 🎉"
echo ""
echo "📊 Next steps:"
echo "  1. Check Render dashboard for deployment status"
echo "  2. Test your deployed services"
echo "  3. Monitor logs if needed"
echo ""
echo "🔗 Useful links:"
echo "  - Render Dashboard: https://dashboard.render.com"
echo "  - GitHub Repository: $(git remote get-url origin)"
