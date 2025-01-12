import "reflect-metadata";

import { InitializeDB } from "sql";
import { start_gmgn } from "./gmgn";

async function main() {
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
  // 启动gmgn爬虫
  start_gmgn(db);
}

main();
