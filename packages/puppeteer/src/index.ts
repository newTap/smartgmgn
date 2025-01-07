import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import userAgent from "user-agents";
import * as path from "path";
import onboardingWallet from "./onboardingWallet";
import notificationWallet from "./notificationWallet";

puppeteer.use(StealthPlugin());

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const metamaskExtension = path.join(process.cwd(), "fil/phantom");

  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    // 注入浏览器插件
    args: [
      `--disable-extensions-except=${metamaskExtension}`,
      `--load-extension=${metamaskExtension}`,
    ],
  });
  // await page.goto(`chrome-extension://${EXTENSION_ID}/popup.html`);
  // 钱包绑定页面的注册

  const onboardingTarget = await browser.waitForTarget(
    (target) =>
      target.url() ===
      "chrome-extension://bfnaelmomeimhlpmgjnjophhpkkoljpa/onboarding.html"
  );
  // 插件注入浏览器后会自动打开导入钱包的地址
  const onboardingPage = await onboardingTarget.page();
  // 执行导入钱包操作
  await onboardingWallet(onboardingPage);

  onboardingPage.on("close", async () => {
    // Navigate the page to a URL
    const page = await browser.newPage();
    const agent = new userAgent(
      {
        platform: "MacIntel",
      },
      {
        platform: "macOS",
      }
    );
    page.setUserAgent(agent.toString());
    await page.goto("https://gmgn.ai/meme/uwc7zMHc?chain=sol&tab=home");
    await page.setViewport({ width: 1080, height: 1024 });

    // 关闭弹窗
    const closeBtn = await page.waitForSelector(
      ".chakra-modal__content-container .chakra-modal__close-btn"
    );
    await closeBtn.click();

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
  });

  // 选择钱包之后,确认钱包的登陆操作
  await notificationWallet(browser);
  await sleep(4000);
  await notificationWallet(browser);
  // // 钱包消息确认
  // const notificationTarget2 = await browser.waitForTarget(
  //   (target) =>
  //     target.url() ===
  //     "chrome-extension://bfnaelmomeimhlpmgjnjophhpkkoljpa/notification.html"
  // );
  // const notificationPage2 = await notificationTarget2.page();
  // const connectBtn2 = await notificationPage2.waitForSelector(
  //   "button[class='sc-fFeiMQ gbIHNA']"
  // );
  // await connectBtn2.click({ delay: 1000 });
  // 监听响应
  // page.on('response', async (response) => {
  //   const baseUrl = 'https://gmgn.ai/defi/quotation/v1/rank/sol/pump_ranks/1h'
  //   const url = response.url()
  //   // console.log('url', url)
  //   if (url.indexOf(baseUrl) > -1) {
  //     const json = await response.json()
  //     console.log('Response:', json);

  //   }
  // });

  // await page.screenshot({ path: 'testresult.png', fullPage: true })
})();
