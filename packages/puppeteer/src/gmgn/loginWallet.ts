import { Browser, Page } from "puppeteer";
import notificationWallet from "./notificationWallet";
import { sleep } from "../utils";

// 钱包登陆操作
export async function loginWallet(browser: Browser, page: Page) {
  // 钱包登陆
  const loginBtn = await page.waitForSelector("#loginBtn");
  await loginBtn.click({ delay: 1000 });
  await (
    await page.waitForSelector(".css-12rtj2z .css-apmwho")
  ).click({ delay: 1000 });
  // 选择需要登陆的钱包
  await page
    .waitForSelector('div[class="chakra-modal__body css-izywcm"]')
    .then(async (dialog) => {
      const dom = await dialog.$(".css-1hdbc19 > .css-1pe21av:nth-child(1)");
      await dom.click({ delay: 1000 });
    });
  // 选择钱包之后,确认钱包的登陆操作
  // !钱包的首次登陆时需要确认操作,以及后续的消息确认
  // !后续再登陆之需要消息的确认,每次都需要重新注入插件,所以可以排除非初次登陆
  await notificationWallet(browser);
  await sleep(4000);
  await notificationWallet(browser);
}
