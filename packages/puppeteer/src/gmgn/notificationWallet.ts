import { Browser } from "puppeteer";

// 钱包消息的确认
export default async function notificationWallet(browser: Browser) {
  let notificationTarget = await browser.waitForTarget(
    (target) =>
      target.url() ===
      "chrome-extension://bfnaelmomeimhlpmgjnjophhpkkoljpa/notification.html"
  );
  let notificationPage = await notificationTarget.page();
  let connectBtn = await notificationPage.waitForSelector(
    "button[class='sc-fFeiMQ gbIHNA']"
  );
  await connectBtn.click({ delay: 1000 });
  notificationTarget = null;
  notificationPage = null;
  connectBtn = null;
}
