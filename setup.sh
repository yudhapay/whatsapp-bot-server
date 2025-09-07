#!/bin/bash

# WhatsApp Template Bot Setup Script
echo "🚀 Setting up WhatsApp Template Bot System..."

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

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js $(node -v) detected"

# Setup Bot Server
echo ""
echo "📦 Setting up Bot Server..."
cd bot-server

if [ ! -f "package.json" ]; then
    print_error "package.json not found in bot-server directory"
    exit 1
fi

npm install
if [ $? -eq 0 ]; then
    print_status "Bot Server dependencies installed"
else
    print_error "Failed to install Bot Server dependencies"
    exit 1
fi

# Create logs directory
mkdir -p logs
print_status "Logs directory created"

# Check if .env exists
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_warning "Created .env file from .env.example"
        print_warning "Please edit .env file with your actual configuration"
    else
        print_error ".env.example not found"
    fi
else
    print_status ".env file already exists"
fi

cd ..

# Setup Admin Web
echo ""
echo "📦 Setting up Admin Web..."
cd admin-web

if [ ! -f "package.json" ]; then
    print_error "package.json not found in admin-web directory"
    exit 1
fi

npm install
if [ $? -eq 0 ]; then
    print_status "Admin Web dependencies installed"
else
    print_error "Failed to install Admin Web dependencies"
    exit 1
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_warning "Created .env file from .env.example"
        print_warning "Please edit .env file with your actual configuration"
    else
        print_error ".env.example not found"
    fi
else
    print_status ".env file already exists"
fi

cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Configure your environment variables:"
echo "   - Edit bot-server/.env with WhatsApp Go API and Supabase credentials"
echo "   - Edit admin-web/.env with Supabase credentials"
echo ""
echo "2. Setup Supabase:"
echo "   - Create a new project at https://supabase.com"
echo "   - Enable Authentication"
echo "   - Create a 'templates' bucket in Storage"
echo "   - Set appropriate policies for the bucket"
echo ""
echo "3. Start the development servers:"
echo "   - Bot Server: cd bot-server && npm run dev"
echo "   - Admin Web: cd admin-web && npm run dev"
echo ""
echo "4. Deploy to production:"
echo "   - Bot Server: Deploy to Render"
echo "   - Admin Web: Deploy to Vercel"
echo ""
echo "📚 For detailed instructions, see the README.md files in each directory"

