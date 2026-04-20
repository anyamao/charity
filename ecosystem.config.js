module.exports = {
  apps: [{
    name: 'rastidobro.ru',
    cwd: '/home/vika/charity',
    script: 'pnpm',
    args: 'start', // 👈 Keep 'start' for Next.js. Change to 'preview' ONLY if using Vite/React
    exec_mode: 'fork', // ⚠️ Required for Next.js/Node
    instances: 1,
    autorestart: true,
    max_memory_restart: '500M',
    env: {
      API_INTERNAL_URL: 'http://127.0.0.1:8002',  // 👈 Explicitly set correct value
      NEXT_PUBLIC_API_URL: '/api',
      NODE_ENV: 'production',
      PORT: '3002'
    }
    // ✅ No custom log paths. PM2 will auto-save to ~/.pm2/logs/
  }]
}
