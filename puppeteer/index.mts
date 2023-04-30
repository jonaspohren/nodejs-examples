import { Browser, Page, launch } from "puppeteer";

let browser: Browser | null = null;
let page: Page | null = null;

const SEARCH_INPUT = `input[name="q"]`;
const FIRST_SEARCH_RESULT_LINK = `.repo-list > li:first-child a`;
const COMMITS_LINK = `div.Details > div:last-child a`;
const LAST_COMMIT_ITEM = `ol > li:first-child`;
const LAST_COMMIT_MESSAGE_LINK = `${LAST_COMMIT_ITEM} a:first-child`;

try {
  browser = await launch({
    headless: true,
    timeout: 10000,
    args: [],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  page = await browser.newPage();

  await Promise.all([page.goto("https://github.com"), page.waitForSelector(SEARCH_INPUT)]);

  await page.focus(SEARCH_INPUT);
  await page.keyboard.type("puppeteer");
  await page.keyboard.press("Enter");

  await Promise.all([page.waitForNavigation(), page.waitForSelector(FIRST_SEARCH_RESULT_LINK)]);

  const href = await page.$eval(FIRST_SEARCH_RESULT_LINK, (el) => el.getAttribute("href"));

  console.log(`href: ${href || ""}`);

  await page.waitForSelector(FIRST_SEARCH_RESULT_LINK);
  await page.click(FIRST_SEARCH_RESULT_LINK);

  await page.waitForSelector(COMMITS_LINK);
  await page.click(COMMITS_LINK);

  await page.waitForSelector(LAST_COMMIT_ITEM);

  const commitMessage = await page.$eval(LAST_COMMIT_MESSAGE_LINK, (el) => (el as HTMLElement).innerText);

  console.log(`Last commit message: ${commitMessage.substring(0, commitMessage.length - 2)}`);
} catch (err) {
  console.log(err);
} finally {
  if (page) {
    await page.close();
  }

  if (browser) {
    await browser.close();
  }
}
