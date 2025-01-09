import "reflect-metadata";
import { DataSource } from "typeorm";
import { Token } from "./entity/Token";
import { HoldToken } from "./entity/HoldToken";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "674415990",
  database: "token_db",
  synchronize: true,
  logging: false,
  // entities: ["entity/*.ts"],
  entities: [Token, HoldToken],
  migrations: [],
  subscribers: [],
});
