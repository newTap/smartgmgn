import "reflect-metadata";
import { DataSource } from "typeorm";
import { Token } from "./src/entity/Token";
import { HoldToken } from "./src/entity/HoldToken";

export interface DB_CONFIG_TYPE {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export class InitializeDB {
  isInitialized: boolean = false;
  dbConfig: DB_CONFIG_TYPE;
  AppDataSource: DataSource;
  constructor(config: DB_CONFIG_TYPE) {
    this.dbConfig = config;
    const { host, port, username, password, database } = config;
    this.AppDataSource = new DataSource({
      host: host || "localhost",
      port: port || 3306,
      username: username || "root",
      password: password,
      database: database || "token_db",
      type: "mysql",
      synchronize: true,
      logging: false,
      entities: [Token, HoldToken],
      migrations: [],
      subscribers: [],
    });
  }

  async initializeDB() {
    await this.AppDataSource.initialize();
    this.isInitialized = this.AppDataSource.isInitialized;
    console.log("AppDataSource", this.AppDataSource.isInitialized);
    console.log("ok");
  }

  async setToken(data: Token) {
    console.log("isInitialized", this.isInitialized);
    const token = new Token();
    token.address = data.address;
    token.created_timestamp = data.created_timestamp;
    token.holders = data.holders;
    token.name = data.name;
    token.open_timestamp = data.open_timestamp;
    token.price = data.price;
    token.symbol = data.symbol;
    return await this.AppDataSource.manager.save(token);
  }
}
