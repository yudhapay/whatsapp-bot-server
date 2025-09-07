# Cursor AI + Render Integration Guide

Panduan lengkap untuk mengintegrasikan Cursor AI dengan Render untuk deployment otomatis.

## 🚀 Overview

Integrasi ini memungkinkan Anda untuk:
- Deploy otomatis dari Cursor AI ke Render
- Menggunakan GitHub Actions untuk CI/CD
- Deploy manual dengan script yang mudah digunakan
- Monitoring dan logging yang terintegrasi

## 📋 Prerequisites

1. **GitHub Repository** - Pastikan project sudah di-push ke GitHub
2. **Render Account** - Daftar di [render.com](https://render.com)
3. **Render CLI** - Install Render CLI untuk deployment manual
4. **Environment Variables** - Setup secrets di GitHub

## 🔧 Setup Awal

### 1. GitHub Secrets Configuration

Tambahkan secrets berikut di GitHub Repository Settings > Secrets and variables > Actions:

```
RENDER_API_KEY=your_render_api_key
RENDER_SERVICE_ID=your_bot_server_service_id
RENDER_ADMIN_SERVICE_ID=your_admin_web_service_id
```

### 2. Render Service Configuration

#### Bot Server Service
- **Type**: Web Service
- **Environment**: Node.js
- **Build Command**: `npm ci --production`
- **Start Command**: `npm start`
- **Auto Deploy**: Enabled
- **Branch**: main

#### Admin Web Service (Optional)
- **Type**: Static Site
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Auto Deploy**: Enabled
- **Branch**: main

## 🛠️ Deployment Methods

### Method 1: Automatic Deployment (Recommended)

1. **Push ke GitHub**:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **GitHub Actions akan otomatis**:
   - Install dependencies
   - Run tests
   - Deploy ke Render

### Method 2: Manual Deployment dengan Script

1. **Jalankan script deployment**:
   ```bash
   ./cursor-deploy.sh
   ```

2. **Pilih opsi deployment**:
   - Bot Server only
   - Admin Web only
   - Both services
   - Just commit and push

### Method 3: Render CLI

1. **Install Render CLI**:
   ```bash
   curl -fsSL https://cli.render.com/install | sh
   ```

2. **Login ke Render**:
   ```bash
   render auth login
   ```

3. **Deploy service**:
   ```bash
   render services deploy --service-id YOUR_SERVICE_ID
   ```

## 📁 File Structure

```
project-root/
├── .github/
│   └── workflows/
│       └── deploy-to-render.yml    # GitHub Actions workflow
├── bot-server/
│   ├── render.yaml                 # Render configuration
│   └── ...
├── admin-web/
│   └── ...
├── cursor-deploy.sh                # Manual deployment script
└── CURSOR_RENDER_INTEGRATION.md   # This documentation
```

## 🔄 Workflow Process

### Automatic Deployment Flow

1. **Code Push** → GitHub
2. **GitHub Actions Triggered** → Install dependencies, run tests
3. **Deploy to Render** → Using Render API
4. **Health Check** → Verify deployment success

### Manual Deployment Flow

1. **Run Script** → `./cursor-deploy.sh`
2. **Choose Options** → Select what to deploy
3. **Git Operations** → Commit and push changes
4. **Render Deploy** → Deploy selected services

## 🐛 Troubleshooting

### Common Issues

1. **Deployment Failed**
   - Check Render logs
   - Verify environment variables
   - Check build commands

2. **GitHub Actions Failed**
   - Check secrets configuration
   - Verify service IDs
   - Check workflow permissions

3. **Script Permission Denied**
   ```bash
   chmod +x cursor-deploy.sh
   ```

### Debug Commands

```bash
# Check Render service status
render services list

# View service logs
render logs --service-id YOUR_SERVICE_ID

# Check GitHub Actions
# Go to GitHub > Actions tab

# Test local build
cd bot-server && npm ci --production
cd admin-web && npm run build
```

## 📊 Monitoring

### Render Dashboard
- Service status
- Resource usage
- Logs and metrics
- Environment variables

### GitHub Actions
- Build status
- Deployment history
- Error logs

### Health Checks
- Bot Server: `https://your-app.onrender.com/health`
- Admin Web: `https://your-admin.onrender.com`

## 🔐 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use GitHub Secrets for sensitive data
   - Rotate API keys regularly

2. **API Keys**
   - Use least privilege principle
   - Monitor API usage
   - Set up alerts for unusual activity

3. **Git Security**
   - Use SSH keys for authentication
   - Enable branch protection
   - Require pull request reviews

## 🚀 Advanced Features

### Custom Domains
1. Add custom domain in Render dashboard
2. Update DNS records
3. Configure SSL certificate

### Environment-specific Deployments
1. Create separate Render services for staging/production
2. Use different GitHub branches
3. Configure different environment variables

### Monitoring and Alerts
1. Set up uptime monitoring
2. Configure error alerts
3. Monitor performance metrics

## 📞 Support

- **Render Documentation**: https://render.com/docs
- **GitHub Actions**: https://docs.github.com/en/actions
- **Project Issues**: Create issue in GitHub repository

## 🎯 Next Steps

1. **Setup GitHub Secrets** - Add required API keys
2. **Test Deployment** - Run manual deployment script
3. **Configure Monitoring** - Set up alerts and monitoring
4. **Customize Workflow** - Modify GitHub Actions as needed
5. **Documentation** - Update team documentation

---

**Happy Deploying! 🚀**
