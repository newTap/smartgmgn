import { Browser, Page } from "puppeteer";
import notificationWallet from "./notificationWallet";
import { sleep } from "../utils";

const key = process.env.WALLET_SECRET;
const pwd = process.env.WALLET_PASSWORD;

// 初始钱包的导入
export default async function onboardingWallet(
  browser: Browser,
  pageClosed: () => void
) {
  // 钱包绑定页面的注册
  const onboardingTarget = await browser.waitForTarget(
    (target) =>
      target.url() ===
      "chrome-extension://bfnaelmomeimhlpmgjnjophhpkkoljpa/onboarding.html"
  );
  // 插件注入浏览器后会自动打开导入钱包的地址
  const onboardingPage = await onboardingTarget.page();

  // 选择钱包登陆
  const loginWallet = await onboardingPage.waitForSelector(
    'button[class="ai2qbc9 t8qixv0 t8qixv1 t8qixv6 t8qixve _51gazn18q _51gazn1b4 _51gazn1ar _51gazn468 _51gazn476 _51gazn1hp _51gazn1lb _51gazn1j9 _51gazn332 _51gaznmv _51gaznnt _51gaznpp _51gaznor _51gazn1x _51gazn37 _51gaznt _51gazn12t _51gazngh _51gazn129 _51gazn129 _51gazn1by"]'
  );
  await loginWallet.click();
  // 选择使用密钥输入
  const useSecret = await onboardingPage.waitForSelector(
    'div[class="t8qixv0 t8qixv1 _51gazn8 _51gazn18w _51gazn1ak _51gazn1c3 _51gazn129 _51gazngj"] button:nth-child(2)'
  );
  useSecret.click();

  // 输入密钥
  const firstSecretInput = await onboardingPage.waitForSelector(
    'input[data-testid="secret-recovery-phrase-word-input-0"]'
  );
  firstSecretInput.type(key, { delay: 100 });

  // 导入钱包
  const submitWallet = await onboardingPage.waitForSelector(
    'button[class="sc-furwcr cDFkMY"]'
  );
  submitWallet.click();

  // 进入账户
  // const viewWallet = await onboardingPage.waitForSelector('button[class="sc-furwcr kfOQMY sc-eDtABA jILaOU"]')
  // viewWallet.click()

  // !由于导入钱包按钮与进入账户按钮的class名字相同
  // !所以先匹配进入账户的其余元素,确保有了之后再去查询进入账户按钮
  onboardingPage
    .waitForSelector('div[class="sc-cZMNgc sc-jnSlpE gBbJwU"]')
    .then(async () => {
      const continueWallet = await onboardingPage.waitForSelector(
        'button[data-testid="onboarding-form-submit-button"]'
      );
      continueWallet.click();
    });

  // 设置钱包密码
  const setPassword = await onboardingPage.waitForSelector(
    'input[data-testid="onboarding-form-password-input"]'
  );
  const setConfirmPassword = await onboardingPage.waitForSelector(
    'input[data-testid="onboarding-form-confirm-password-input"]'
  );
  await setPassword.type(pwd, { delay: 100 });
  await setConfirmPassword.type(pwd, { delay: 100 });
  // 条款
  const checkboxTerms = await onboardingPage.waitForSelector(
    'input[data-testid="onboarding-form-terms-of-service-checkbox"]'
  );
  await checkboxTerms.click();

  const continueWallet2 = await onboardingPage.waitForSelector(
    'button[class="sc-furwcr cDFkMY"]'
  );
  await continueWallet2.click();

  await onboardingPage
    .waitForSelector('div[class="sc-cZMNgc sc-jnSlpE gBbJwU"]')
    .then(async () => {
      const continueWallet = await onboardingPage.waitForSelector(
        'button[data-testid="onboarding-form-submit-button"]'
      );
      continueWallet.click();
    });
  // 钱包绑定成功之后页面会退出,启动gmgn页面
  onboardingPage.on("close", async () => {
    pageClosed();
  });
  // onboardingPage.close()
}
