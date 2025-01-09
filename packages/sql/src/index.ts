import { AppDataSource } from "./data-source";

async function main() {
  await AppDataSource.initialize();
  console.log("AppDataSource", AppDataSource.isInitialized);
}

main();
