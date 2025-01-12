import "reflect-metadata";
import { DataSource, Repository } from "typeorm";
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
  tokenRepository: Repository<Token>;
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
      charset: "utf8mb4",
      synchronize: true,
      logging: false,
      entities: [Token, HoldToken],
      migrations: [],
      subscribers: [],
    });
  }

  async initializeDB() {
    await this.AppDataSource.initialize();
    this.tokenRepository = this.AppDataSource.getRepository(Token);
    this.isInitialized = this.AppDataSource.isInitialized;
    console.log("AppDataSource", this.AppDataSource.isInitialized);
    console.log("ok");
  }

  // 存储token
  async setToken(data: Token) {
    console.log("isInitialized", this.isInitialized);
    console.log("存储", data.address);
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

  // 获取指定时间内token
  async getTokens(timestamp: string | number) {
    const currentTime = new Date();
    const twoHoursAgo = new Date(
      currentTime.getTime() - +timestamp * 60 * 60 * 1000
    );
    console.log(twoHoursAgo, currentTime);
    const tokens = await this.tokenRepository
      .createQueryBuilder("token")
      .where(`token.open_timestamp BETWEEN ${twoHoursAgo} AND ${currentTime}`);
    console.log(tokens.getSql());
    return await tokens.getMany();
  }

  // 存贮买入token记录
  async setHoldToken(data: HoldToken) {
    console.log("isInitialized", this.isInitialized);
    const holdToken = new HoldToken();
    holdToken.address = data.address;
    holdToken.name = data.name;
    holdToken.symbol = data.symbol;
    holdToken.buy_price = data.buy_price;
    holdToken.buy_amount = data.buy_amount;
    holdToken.buy_reason = data.buy_reason;
    holdToken.buy_timestamp = data.buy_timestamp;
    return await this.AppDataSource.manager.save(holdToken);
  }
}
