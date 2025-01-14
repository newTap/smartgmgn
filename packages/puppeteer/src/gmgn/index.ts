import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import BlockResourcesPlugin from "puppeteer-extra-plugin-block-resources";
import userAgent from "user-agents";
import * as path from "path";
import onboardingWallet from "./onboardingWallet";
import { COMPLETED, PUMP_LIST } from "../type";
import { InitializeDB } from "sql";
import { tokenDetail } from "./tokenDetail";
import { Browser, ResourceType } from "puppeteer";
import { haveWalletProcess } from "../utils";
import { loginWallet } from "./loginWallet";
import { Cluster } from "puppeteer-cluster";

puppeteer.use(StealthPlugin());
puppeteer.use(
  BlockResourcesPlugin({
    blockedTypes: new Set<ResourceType>(["image", "stylesheet", "font"]),
  })
);

export const dev = async (db: InitializeDB) => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 1,
    puppeteer,
    puppeteerOptions: {
      headless: false,
      devtools: true,
      // 注入浏览器插件
      args: [
        "--no-sandbox",
        "--disable-ipc-flooding-protection",
        "--no-first-run",
      ],
    },
  });

  cluster.on("taskerror", (err, data, willRetry) => {
    if (willRetry) {
      console.warn(
        `Encountered an error while crawling ${data}. ${err.message}\nThis job will be retried`
      );
    } else {
      console.error(`Failed to crawl ${data}: ${err.message}`);
    }
  });

  cluster.queue(
    "https://gmgn.ai/meme/uwc7zMHc?chain=sol&tab=home",
    async ({ page, data: url }) => {
      const browser = page.browser();
      let token_completeds: COMPLETED[];
      const agent = new userAgent(
        {
          platform: "MacIntel",
        },
        {
          platform: "macOS",
        }
      );
      // await page.goto("https://gmgn.ai/meme/uwc7zMHc?chain=sol&tab=home");
      const [homePage] = await browser.pages();
      await homePage.setUserAgent(agent.toString());
      await homePage.setViewport({ width: 1580, height: 1024 });
      await homePage.goto("https://gmgn.ai/meme/uwc7zMHc?chain=sol&tab=home");
      await homePage.bringToFront();
      // 确保在pump内
      let pumpBtn = await homePage.waitForSelector(
        "div[class='css-gstdun'] div:first-child"
      );
      await pumpBtn.click({ delay: 500 });

      // 查数据库,是否含有没有监听完的token列表
      // 监听响应
      homePage.on("response", async (response) => {
        const baseUrl =
          "https://gmgn.ai/defi/quotation/v1/rank/sol/pump_ranks/1h";
        const url = response.url();
        // console.log('url', url)
        if (url.indexOf(baseUrl) === -1) return false;
        const status = response.status();
        if (status !== 200) {
          console.error("sol/pump_ranks/1h api error", status);
          return false;
        }
        const json = (await response.json()).data as PUMP_LIST;
        const completeds = json.completeds;
        // 第一次记录token
        if (!token_completeds) {
          token_completeds = completeds;
          console.log("第一次记录");
          return false;
        }
        console.log("开始校验");
        // 校验新的token列表与旧token列表区别
        for (let i = 0; i < completeds.length; i++) {
          const token = completeds[i];
          // 当遇到相同token时,说明后续都是旧数据
          if (token_completeds.find((t) => t.address === token.address)) {
            token_completeds = completeds;
            return false;
          }

          console.log("新数据来了");
          // 服务器中存储需要跟踪的数据
          await db.setToken({
            address: token.address,
            created_timestamp: new Date(token.created_timestamp * 1000),
            holders: token.holder_count,
            name: token.name,
            timestamp: token.open_timestamp,
            open_timestamp: new Date(token.open_timestamp * 1000),
            price: token.price,
            symbol: token.symbol,
          });
          try {
            // 打开token详情页
            await tokenDetail(browser, db, token.address);
            console.log(`现在一共有${(await browser.pages())?.length}个页面`);
            // !当token详情页打开后,主页的response事件将会无响应
            // !必须重新激活gmgn首页
            await homePage.bringToFront();
          } catch (error) {
            console.error("open token detail error", error);
          }
        }
      });
    }
  );
};

export const start_gmgn = async (db: InitializeDB) => {
  const isHavePhantom = haveWalletProcess();

  const metamaskExtension = path.join(process.cwd(), "fil/phantom");
  // Phantom 插件路径
  if (!isHavePhantom) {
    console.log("not have wallet secret or password");
  }
  const browser = await puppeteer.launch({
    headless: true,
    devtools: true,
    // 注入浏览器插件
    args: isHavePhantom
      ? [
          "--no-sandbox",
          "--no-first-run",
          `--disable-extensions-except=${metamaskExtension}`,
          `--load-extension=${metamaskExtension}`,
        ]
      : ["--no-sandbox", "--disable-ipc-flooding-protection", "--no-first-run"],
  });

  // 根据是否含有钱包地址的环境变量,判断是否要处理钱包的绑定
  if (isHavePhantom) {
    // 执行导入钱包操作
    await onboardingWallet(browser, () => easy_gmgn(browser, db));
  } else {
    easy_gmgn(browser, db);
  }
};

export async function easy_gmgn(browser: Browser, db: InitializeDB) {
  const isHavePhantom = haveWalletProcess();

  let token_completeds: COMPLETED[];
  const [page] = await browser.pages();
  const agent = new userAgent(
    {
      platform: "MacIntel",
    },
    {
      platform: "macOS",
    }
  );
  await page.setUserAgent(agent.toString());
  await page.goto("https://gmgn.ai/meme/uwc7zMHc?chain=sol&tab=home");
  await page.setViewport({ width: 1080, height: 1024 });
  console.log("页面打开了");
  // 更新了可能有两个窗口
  // 关闭弹窗
  // const closeBtn = await page.waitForSelector(
  //   ".chakra-modal__content-container .chakra-modal__close-btn"
  // );
  // const closeBtn = await page.waitForSelector(".css-12rtj2z .css-pt4g3d");
  // await closeBtn.click({ delay: 1000 });

  // !处理钱包登陆操作
  if (isHavePhantom) {
    await loginWallet(browser, page);
  }
  // 确保在pump内
  let pumpBtn = await page.waitForSelector(
    "div[class='css-gstdun'] div:first-child"
  );
  await pumpBtn.click({ delay: 500 });

  // 查数据库,是否含有没有监听完的token列表
  // 监听响应
  page.on("response", async (response) => {
    const baseUrl = "https://gmgn.ai/defi/quotation/v1/rank/sol/pump_ranks/1h";
    const url = response.url();
    // console.log('url', url)
    if (url.indexOf(baseUrl) === -1) return false;
    const status = response.status();
    if (status !== 200) {
      console.error("sol/pump_ranks/1h api error", status);
      return false;
    }
    const json = (await response.json()).data as PUMP_LIST;
    const completeds = json.completeds;
    // 第一次记录token
    if (!token_completeds) {
      token_completeds = completeds;
      console.log("第一次记录");
      return false;
    }
    console.log("开始校验");
    // 校验新的token列表与旧token列表区别
    for (let i = 0; i < completeds.length; i++) {
      const token = completeds[i];
      // 当遇到相同token时,说明后续都是旧数据
      if (token_completeds.find((t) => t.address === token.address)) {
        token_completeds = completeds;
        return false;
      }

      console.log("新数据来了");
      // 服务器中存储需要跟踪的数据
      await db.setToken({
        address: token.address,
        created_timestamp: new Date(token.created_timestamp * 1000),
        holders: token.holder_count,
        name: token.name,
        timestamp: token.open_timestamp,
        open_timestamp: new Date(token.open_timestamp * 1000),
        price: token.price,
        symbol: token.symbol,
      });
      try {
        // 打开token详情页
        await tokenDetail(browser, db, token.address);
        console.log(`现在一共有${(await browser.pages())?.length}个页面`);
        // !当token详情页打开后,主页的response事件将会无响应
        // !必须重新激活gmgn首页
        await page.bringToFront();
      } catch (error) {
        console.error("open token detail error", error);
      }
    }
  });
}
