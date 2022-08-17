const axios = require('axios')



const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const pathToExtension = require('path').join(__dirname, 'configs/jpgljfpmoofbmlieejglhonfofmahini/3.0.25_0/');
const cats = ["Beauty services",
"Books magazines",
"Brands products",
"Companies organisations",
"Event sources",
"Films",
"Local businesses",
"Music",
"Other",
"People",
"Sports",
"Television",
"Websites blogs"]
puppeteer.use(StealthPlugin())
/*
document.querySelector('[rel="dialog"]')
page.keyboard.type('email')
page.keyboard.press('Enter')

  document.querySelector('[type="text"]')
*/
const main = async ()=> {
  const browser = await puppeteer.launch({
    executablePath:'google-chrome',//path.join(process.cwd(),path.normalize('resources/app.asar.unpacked/node_modules/puppeteer/.local-chromium/win64-938248/chrome-win/chrome.exe')),
    headless: false,
    args: [
    '--no-sandbox','--disable-blink-features=AutomationControlled','--media-cache-size=0','--disk-cache-size=0'],
    slowMo:25,
})
const [page] = await browser.pages();
  await page.goto("https://fb.com/login")
  await page.waitForSelector("input[name='email']")
  await page.type("input[name='email']","jokerherlo683@workmail.com")
  await page.type("input[name='pass']","100100A")
  await page.keyboard.press("Enter")
  await page.waitForTimeout(5000)
  await page.goto('https://m.facebook.com/profile.php')
    await page.waitForXPath('//a[contains(text(),"Like")]')
    await page.evaluate(() => {
      document.querySelectorAll('[aria-pressed="false"]').forEach(el => el.click())
    })
    await page.waitForTimeout(2000)

    /* document.querySelectorAll('[aria-selected="false"]')[6].click()

     const likes_buttons = await page.$x('//a[contains(text(),"Like")]')
    await likes_buttons[0].click
    await likes_buttons.forEach(async (el) => {await el.click()}) */
    await page.waitForTimeout(2000)
  await page.goto('https://www.facebook.com/ad_center/create/boostpost/?entry_point=new_timeline&page_id=100665822740797&target_id=100666312740748')
  await page.waitForSelector('[aria-label="Website URL"]')
  await page.click('[aria-haspopup="listbox"]')
  await page.waitForFunction(() => document.querySelectorAll('[aria-selected="false"]').length > 4)
  await page.evaluate(() => {
    document.querySelectorAll('[aria-selected="false"]')[6].click()
  })
  await page.waitForFunction(() => document.querySelectorAll('[aria-label="Change"]').length > 1)
  var change = await page.$$('[aria-label="Change"]')
  await change[1].click()
  await page.waitForFunction(() => document.querySelectorAll('label[role="combobox"]').length > 1)
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')
  await (await page.waitForXPath(`//span[contains(text(),"Paraguay")]`)).click()
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')
  await (await page.waitForXPath(`//span[contains(text(),"South African Rand")]`)).click()
  await page.waitForTimeout(2000)
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')
  await page.waitForFunction(() => document.querySelectorAll('[role="dialog"]').length <= 1)
  await page.waitForSelector('input[maxlength="12"]')
  const input = await page.$('input[maxlength="12"]');
  await input.click({clickCount: 3})
  await input.type(String("500"));
  await (await page.waitForXPath("//div[starts-with(@aria-label, 'Boost')]")).click()
  await page.waitForTimeout(2000)
  await (await page.waitForXPath("//div[starts-with(@aria-label, 'Boost')]")).click()
  await page.waitForTimeout(2000)
  await (await page.waitForXPath("//div[starts-with(@aria-label, 'Boost')]")).click()
  for (let index = 0; index < 5; index++) {
      await page.waitForSelector('[aria-label="Next"]')
      await page.click('[aria-label="Next"]')
      await page.waitForSelector('[aria-label="Save"]')
      await page.click('[aria-label="Save"]')
      await page.waitForSelector('[aria-label="Close"]')
      await page.click('[aria-label="Close"]')
      await (await page.waitForXPath("//div[starts-with(@aria-label, 'Boost')]")).click()
      await page.waitForTimeout(1000)
  }
  const dismissBeforeUnload = dialog => 
  dialog.type() === "beforeunload" && dialog.dismiss();
page.on("dialog", dismissBeforeUnload); 
await page.evaluate(() => {
  window.onbeforeunload = null;
});
page.off("dialog", dismissBeforeUnload); 

// next unload, we'll accept the dialog
page.on("dialog", dialog => 
  dialog.type() === "beforeunload" && dialog.accept()
);
  await page.goto('https://mbasic.facebook.com/friends/center/requests/')
  page.on('dialog', async dialog => {
      await dialog.dismiss();
  });

    await page.waitForSelector('#friends_center_main')
    const acceptFriends = await page.$$('#friends_center_main table')
    if(acceptFriends.length > 0){
        for (let index = 0; index < acceptFriends.length; index++) {
            var [confirm] = await page.$x('//span[contains(text(),"Confirm")]');
            await confirm.click()
            await page.waitForFunction(() => document.URL.includes('rdr'))   
        }
    }
    await page.goto('https://www.facebook.com/whitehat/accounts')
    await (await page.waitForXPath("//span[contains(text() ,'Create')]")).click()
    await page.waitForSelector('[aria-label="Close"]')
/*
https://en.sms-online.pro/api/orders/cancel/333/?api_token=yyaetjy16yau0b8dyfobazogxjifqxqs6cmzuwvqnhxkpiivuk5digx5kkst
https://en.sms-online.pro/api/orders/create/3705?api_token=yyaetjy16yau0b8dyfobazogxjifqxqs6cmzuwvqnhxkpiivuk5digx5kkst
[   "Beauty services",
    "Books magazines",
    "Brands products",
    "Companies organisations",
    "Event sources",
    "Films",
    "Local businesses",
    "Music",
    "Other",
    "People",
    "Sports",
    "Television",
    "Websites blogs"]
await page.goto('chrome-extension://jpgljfpmoofbmlieejglhonfofmahini/popup/popup.html')
var pp = await browser.pages()
await pp[1].close()
await page.waitForSelector('input[type="text"]')
await page.type('input[type="text"]','mayadamohamed069@gmail.com')
await page.type('input[type="password"]','s7h2wj5dps')
await page.click( 'a.gray' ) // ... action
await page.waitForSelector('div.premium')
await page.click('input[type="checkbox"]')
await page.waitForXPath('//div[contains(text(),"RESIDENTIAL")]')
/* const resid = await page.$x('//div[contains(text(),"RESIDENTIAL")]')
await resid[0].click()
await page.waitForSelector('div.custom-select')
await page.click('div.custom-select')
await page.waitForSelector('div.select-item')
const country = await page.$x('//div[contains(text(),"Canada")]')
await country[0].click() */
}

main()