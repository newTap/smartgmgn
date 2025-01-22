import { Browser } from "puppeteer";
import schedule from "node-schedule";

declare global {
  interface Window {
    puppeteerLogMutation: (val: string) => void;
  }
}
import userAgent from "user-agents";
import { splitValueAndUnit, UNIT_TYPE, unitValue } from "../utils";
import { InitializeDB } from "sql";
// import { BUY_REASON } from "sql/src/entity/HoldToken";
import { BUY_REASON } from "sql/build/src/entity/HoldToken";

import { TOKEN_INFO } from "../type";

// 48小时内监听市值
// 达到买入点之后,就可以不再监听其市值变化注销相关的内容
export const tokenDetail = async (
  browser: Browser,
  db: InitializeDB,
  address
) => {
  const vioMarketCap = process.env.VIO_MARKET_CAP;
  const page = await browser.newPage();
  let isBuy = false;
  
  const agent = new userAgent(
    {
      platform: "MacIntel",
    },
    {
      platform: "macOS",
    }
  );
  await page.setUserAgent(agent.toString());
  await page.goto(`https://gmgn.ai/sol/token/${address}`, { timeout: 900_000 });
  // 获取token的基础信息
  const json = await page.waitForResponse(
    (res) => res.url() === `https://gmgn.ai/api/v1/token_info/sol/${address}`,
    { timeout: 90_000 }
  );
  const data = (await json.json()).data as TOKEN_INFO;

  await page.setViewport({ width: 1080, height: 1024 });
  async function closePage() {
    await page.close();
    const pages = await browser.pages();
    // job.cancel();
    console.log(`token ${address} 页面关闭.当前还有${pages.length}个页面`);
  }

  // async function reload() {
  //   console.log("三小时重新加载一次页面", address);
  //   try {
  //     await page.reload({ timeout: 90_000 });
  //     reloadErrNum = 0;
  //   } catch (error) {
  //     reloadErrNum++;
  //     console.error(`${address} token detail新加载失败`, error);
  //     if (reloadErrNum >= 3) {
  //       console.log(`${address} token detail 多次加载失败,关闭页面`);
  //       closePage();
  //     } else {
  //       reload();
  //       console.error(`再次${reloadErrNum}尝试重新加载`, address);
  //     }
  //   }
  // }

  // 每一小时刷新一次页面
  // let job = schedule.scheduleJob(
  //   `${openDate.getMinutes()} */3 * * *`,
  //   async () => {
  //     reload();
  //   }
  // );

  // 将方法挂在到window下
  await page.exposeFunction(
    "puppeteerLogMutation",
    async (textValue: string) => {
      // 防止入库时间内多次插入
      if (isBuy) return;
      // textValue 132.4k
      // unit K or M
      const [val, unit] = splitValueAndUnit(textValue);
      let tokenMarketCap = unitValue(val, unit as UNIT_TYPE);
      console.log(address, textValue);
      if (vioMarketCap >= tokenMarketCap) {
        isBuy = true;
        // 达到了暴力购买的数值
        await db.setHoldToken({
          address: address,
          name: data?.name || "--",
          symbol: data?.symbol || "--",
          buy_price: `${tokenMarketCap}`,
          buy_amount: `${vioMarketCap}`,
          buy_reason: BUY_REASON.VIOLENCE,
          buy_timestamp: new Date(),
        });

        // 当购买完成之后,则不再做监听的操作直接关闭当前页面
        console.log(`${address} 以达到买入的市值: ${tokenMarketCap}`);
        closePage();
      }
    }
  );

  // 监听市值的变化
  await page.evaluate(() => {
    const target = document.getElementsByClassName("css-1jbdlot")[0];
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        // 文案修改
        if (mutation.type === "characterData") {
          const textValue = mutation.target.textContent.slice(1);

          if (!!window.puppeteerLogMutation) {
            window.puppeteerLogMutation(textValue);
          }
        }
      }
    });
    if (target) {
      observer.observe(target, { characterData: true, subtree: true });
    } else {
      console.log("observer target is null", target);
    }
  });
};
