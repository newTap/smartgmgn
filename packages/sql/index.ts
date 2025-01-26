import "reflect-metadata";
import { DataSource, Repository } from "typeorm";
import { Token } from "./src/entity/Token";
import { HoldToken, BUY_REASON } from "./src/entity/HoldToken";
import { NewCreationToken } from "./src/entity/NewCreationToken";

export {Token, HoldToken, BUY_REASON, NewCreationToken};

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
      entities: [Token, HoldToken, NewCreationToken],
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

    // 查询token
  async getToken(address: string){
    return await this.tokenRepository.createQueryBuilder('token').where("token.address = :address", { address:address }).getOne();
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

  // 查询买入token
  async getHoldToken(address: string){
    return await this.holdTokenRepository.createQueryBuilder('holdToken').where("holdToken.address = :address", { address:address }).getOne();
  }

  // 存贮买入token记录
  async setHoldToken(data: HoldToken) {
    const holdToken = new HoldToken();
    for (const key in data) {
      holdToken[key] = data[key] 
    }
    return await this.AppDataSource.manager.save(holdToken);
  }

  // 查询已买入,但是未出售的token
  async getNotSellHoldTokens(id?:string) {
    const tokens = await this.holdTokenRepository
      .createQueryBuilder("holdToken")
      .where("holdToken.sell_id = :id", { id: id || '' })
      .leftJoinAndSelect("holdToken.token", "token.pair_id")
      .limit(20)
      .getMany();
    return tokens;
  }

  // 更新买入的token记录
  async updatesHoldToken(data:HoldToken){
    const {id, ...config} = data
    await this.AppDataSource.createQueryBuilder().update(HoldToken).set(config).where('id = :id', {id}).execute()
  }

  // 获取小时内未卖出的token数据
  async getTokensBought(hours: number) {
    const now = Math.floor(Date.now()/1000);
    const hoursAgo = now - hours * 60 * 60 ;

    const tokens = await this.holdTokenRepository.createQueryBuilder('holdToken')
          // .leftJoinAndSelect('holdToken.token', 'token', 'holdToken.address = token.address')
      .where(`UNIX_TIMESTAMP(holdToken.buy_timestamp) > :hoursAgo`,{
        hoursAgo
      })
      .andWhere("holdToken.sell_id = :id", { id: '' })
      .getMany()
      
    return tokens;
  }


  // 记录新出token
  async setNewCreationToken(data: NewCreationToken) {
    const newCreationToken = new NewCreationToken();
    for (const key in data) {
      if(data[key] ){
        newCreationToken[key] = data[key] 
      }
    }
    return await this.AppDataSource.manager.save(newCreationToken);
  }
}