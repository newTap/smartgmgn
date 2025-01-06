import { AppDataSource } from "./data-source"
import { Token } from "./entity/Token"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new Token()
    await AppDataSource.manager.save(user)

    console.log("Loading users from the database...")

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
