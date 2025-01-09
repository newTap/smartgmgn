import "reflect-metadata";

import { InitializeDB } from "sql";

async function main() {
  console.log(process.env);
  // 初始化数据库
  const db = new InitializeDB({
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  try {
    await db.initializeDB();
  } catch (error) {
    console.error("initializeDB error", error);
    return false;
  }
  // 爬虫初始化
  // 初始化之前需要校验相关的环境变量,防止爬虫启动失败
  // dev();
}

main();
