#!/bin/bash

echo "🔧 FIXING ROUTING ISSUE"
echo "======================"

# Check if service exists in Render
echo "1. Checking Render service status..."
echo "Go to: https://dashboard.render.com"
echo "Look for service: whatsapp-bot-server-v2"

# Check GitHub Actions
echo "2. Checking GitHub Actions..."
echo "Go to: https://github.com/yudhapay/whatsapp-bot-server/actions"

# Check environment variables
echo "3. Checking environment variables..."
echo "Verify these are set in Render:"
echo "- NODE_ENV=production"
echo "- PORT=3000"
echo "- All API keys and URLs"

# Check service logs
echo "4. Checking service logs..."
echo "In Render dashboard, check 'Logs' tab"

# Test local deployment
echo "5. Testing local deployment..."
cd bot-server
NODE_ENV=production PORT=3000 node src/server.js &
LOCAL_PID=$!
sleep 3

if kill -0 $LOCAL_PID 2>/dev/null; then
    echo "✅ Local server started successfully"
    kill $LOCAL_PID
else
    echo "❌ Local server failed to start"
fi

cd ..

echo ""
echo "If all checks pass, the issue is with Render deployment"
echo "Consider creating a new service or checking Render limits"
