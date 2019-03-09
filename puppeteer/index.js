const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--window-size=1440,900']
  });

  const page = await browser.newPage();

  await page._client.send('Emulation.clearDeviceMetricsOverride');

  await page.goto('https://google.com');

  await page.waitFor('#hplogo');

  await page.$eval('.gLFyf.gsfi', el => el.value = 'Google Chrome Puppeteer');
  //await page.$$eval('.gLFyf.gsfi', el => el[0].value = 'Google Chrome Puppeteer');

  await Promise.all([page.waitForNavigation(), page.click('.FPdoLc.VlcLAe input[name="btnK"]')]);

  await Promise.all([page.waitForNavigation(), page.click('a[href="https://github.com/GoogleChrome/puppeteer"]')]);

  const author = await page.$eval('.author', el => el.innerText);

  console.log(author);

  await page.waitFor(2500);

  await browser.close();
})();