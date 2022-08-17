const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const main = async () => {
    const browser = await puppeteer.launch({
        executablePath:'google-chrome',//path.join(process.cwd(),path.normalize('resources/app.asar.unpacked/node_modules/puppeteer/.local-chromium/win64-938248/chrome-win/chrome.exe')),
        headless: false,
        args: [ '--ignore-certificate-errors', '--ignore-certificate-errors-spki-list','--window-size=800,800','--no-sandbox','--incognito','--disable-blink-features=AutomationControlled','--media-cache-size=0','--disk-cache-size=0'],
        ignoreHTTPSErrors: true,
        acceptInsecureCerts: true,
        //headless:true
    })
    const [page] = await browser.pages();
    page.setDefaultTimeout(220000);
    page.setDefaultNavigationTimeout(160 * 1000)
    await page.goto("https://192.168.1.1/")
    await page.waitForSelector('#Frm_Username')
    await page.type('#Frm_Username','admin')
    await page.type('#Frm_Password','K7G06569')
    await page.keyboard.press('Enter')
    await page.waitForSelector('#mmManagDiag')
    await page.click('#mmManagDiag')
    await page.waitForSelector('a[title="System Management"]')
    await page.click('a[title="System Management"]')
    await page.waitForSelector('#Btn_restart')
    await page.click('#Btn_restart')
    await page.waitForSelector('#confirmOK')
    await page.click('#confirmOK')
    await page.close()
    await browser.close()

}

main()

