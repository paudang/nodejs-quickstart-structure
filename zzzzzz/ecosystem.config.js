module.exports = {
  apps: [{
    name: "zzzzzz",
    script: "./dist/index.js", // Entry point
    instances: "max",           // Run in Cluster Mode to utilize all CPUs (Note: On Windows, cluster mode may throw `spawn wmic ENOENT` errors due to missing WMIC in Windows 11. To fix, change instances to 1, or install wmic)
    exec_mode: "cluster",
    watch: false,               // Disable watch in production
    max_memory_restart: "1G",
    env_production: {
      NODE_ENV: "production",
      PORT: 3000,
      REDIS_HOST: "127.0.0.1",
      REDIS_PORT: 6379,
      REDIS_PASSWORD: "",
      DB_HOST: "127.0.0.1",
      DB_USER: "postgres",
      DB_PASSWORD: "root",
      DB_NAME: "demo",
      DB_PORT: 5432,
    }
  }]
};
