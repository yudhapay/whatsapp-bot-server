module.exports = {
  apps: [{
    name: 'whatsapp-bot-server',
    script: 'src/server.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    // Auto restart configuration
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    
    // Logging
    log_file: 'logs/combined.log',
    out_file: 'logs/out.log',
    error_file: 'logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Restart policy
    min_uptime: '10s',
    max_restarts: 10,
    
    // Health check
    health_check_grace_period: 3000,
    
    // Environment variables
    env_file: '.env'
  }]
};

