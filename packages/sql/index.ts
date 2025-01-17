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
  holdTokenRepository: Repository<HoldToken>;
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
    this.holdTokenRepository = this.AppDataSource.getRepository(HoldToken);
    this.isInitialized = this.AppDataSource.isInitialized;
    console.log("AppDataSource", this.AppDataSource.isInitialized);
    console.log("ok");
  }

  // 存储token
  async setToken(data: Token) {
    const token = new Token();

    for (const key in data) {
      token[key] = data[key]
    }

    return await this.AppDataSource.manager.save(token);
  }

  // 更新token
  async updateToken(data?: Token){
    const {address, ...config} = data
    await this.AppDataSource.createQueryBuilder().update(Token).set(config).where('address = :address', {address: data.address}).execute()
  }

  // 获取指定时间内,还未购买的token
  async getNotByTokens(value: string | number) {
    const tokens = await this.tokenRepository
      .createQueryBuilder("token")
      .leftJoin(HoldToken, "holdToken", "token.address = holdToken.address")
      .where("token.timestamp > :value", { value })
      .andWhere("holdToken.address IS NULL")
      .getMany();
    return tokens;
  }

  // 存贮买入token记录
  async setHoldToken(data: HoldToken) {
    console.log("isInitialized", this.isInitialized);
    const holdToken = new HoldToken();
    for (const key in data) {
      holdToken[key] = data[key] 
    }
    return await this.AppDataSource.manager.save(holdToken);
  }

  // 更新买入的token记录
  async updatesHoldToken(data:HoldToken){
    const {id, ...config} = data
    await this.AppDataSource.createQueryBuilder().update(HoldToken).set(config).where('id = :id', {id}).execute()
  }
}
