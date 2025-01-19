import log4js, { Logger } from 'log4js';

export class Loggers {
  logger: Logger;
  constructor(){
    const log4 = log4js.configure({
      appenders: {
          // 控制台输出
          consoleOut: {
            type: 'console', // 控制台输出
            layout: {
              type: 'colored', // 使用color模式让控制台输出分类更加鲜明
            },
          },
          // 文件输出
          fileOut: {
            type: 'dateFile',
            filename: `log/log`, //日志文件的存储名
            alwaysIncludePattern: true,  //（可选，默认false）将模式包含在当前日志文件的名称以及备份中
            pattern: "yyyy-MM-dd.log",
            daysToKeep: 7,// 保留 7 天的日志文件
            encoding: 'utf-8', //（可选，默认为utf-8）文件数据的存储编码
            maxLogSize: 1024 * 1024 * 1 // 文件最大存储空间
          }
      },
      categories: {
        // 设置默认所有日志都记录
        default: { 
          appenders: ['fileOut', 'consoleOut'], 
          level: 'all' 
        } 
      }
    });
    this.logger = log4.getLogger('default')
  }
  log(...arr){
    this.logger.log.apply(this.logger, arr)
  }
  info(...arr){
    this.logger.info.apply(this.logger, arr)
  }
  error(...arr){
    this.logger.error.apply(this.logger,arr)
  }
  warn(...arr){
    this.logger.warn.apply(this.logger, arr)
  }
//   logger.log('log')
// logger.info('info')
// logger.error('error')
// logger.debug('debug')
// logger.warn('warn')
// logger.trace('trace')
// logger.fatal('fatal')
// logger.mark('mark')
}