import "reflect-metadata"
import { DataSource } from "typeorm"
import { Token } from "./entity/Token"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "db-name",
    password: "db-password",
    database: "database",
    synchronize: true,
    logging: false,
    entities: [Token],
    migrations: [],
    subscribers: [],
})
