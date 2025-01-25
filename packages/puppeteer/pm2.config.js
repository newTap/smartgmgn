module.exports = {
    apps: [
        {
            name: 'puppeteer',
            script: './build/index.js',
            env_dev: {
                PORT: 6015,
                NODE_ENV: 'development',
                 ...require('dotenv').config({ path: './.env' }).parsed
            },
            instances: 1, // 一次性只启动一个实例
            "max_restarts": 8, // 最大的自动重启次数
            "time": true,
            "log_date_format": "YYYY-MM-DD HH:mm Z", // 日志日期格式，Z 为时区
            "pid_file": "./logs/pid/pid_file.log", // 日志日期格式，Z 为时区
            "error_file": "./logs/error/error_log.log", // 错误日志目录
            "out_file": "./logs/log.log", // 普通日志目录
            "ignore_watch" : [  // 从监控目录中排除
              "node_modules", 
              "log",
            ],
            //  "watch": [  // 监控变化的目录，一旦变化，自动重启
            //   "build",
            // ],
        },
    ],
};
