#!/bin/bash

# Script to test deployment after setup
# This script will test the deployed services

echo "=== Deployment Test Script ==="
echo ""
echo "This script will help you test your deployed services."
echo ""

# Function to test URL
test_url() {
    local url=$1
    local service_name=$2
    
    echo "Testing $service_name..."
    echo "URL: $url"
    
    if curl -s --max-time 10 "$url" > /dev/null; then
        echo "✅ $service_name is accessible"
        return 0
    else
        echo "❌ $service_name is not accessible"
        return 1
    fi
}

echo "=== Testing Instructions ==="
echo ""
echo "1. Get your service URLs from Render dashboard:"
echo "   - Bot Server: https://dashboard.render.com"
echo "   - Admin Web: https://dashboard.render.com"
echo ""
echo "2. Test the services:"
echo ""
echo "# Test Bot Server Health Check"
echo "curl https://your-bot-server-url.onrender.com/health"
echo ""
echo "# Test Admin Web"
echo "curl https://your-admin-web-url.onrender.com"
echo ""
echo "3. Expected responses:"
echo "   - Bot Server /health: {\"status\":\"OK\",\"timestamp\":\"...\",\"service\":\"WhatsApp Bot Server\"}"
echo "   - Admin Web: HTML page with admin interface"
echo ""
echo "=== Manual Testing ==="
echo "You can also test manually by:"
echo "1. Opening the URLs in your browser"
echo "2. Checking the Render dashboard logs"
echo "3. Monitoring the GitHub Actions workflow"
echo ""
echo "=== Troubleshooting ==="
echo "If services are not working:"
echo "1. Check Render dashboard for errors"
echo "2. Verify environment variables are set correctly"
echo "3. Check GitHub Actions workflow logs"
echo "4. Ensure Service IDs are correct"
echo ""
