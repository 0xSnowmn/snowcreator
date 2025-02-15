const Mailbox = require('./mail');
const axios = require('axios')
const path =require("path")
const fs = require("fs")
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const active = require('./activate')
const chrome = require('chrome-paths')
var initEmail
var code = false
var codeNum = ''
var check = false
var options 
var info
module.exports.Stop = async function(page,browser) {
    await page.close()
    await browser.close()
}

module.exports.Create = async (page,alloptions,phone,email,event='') => {
    try {
    options = alloptions
    //await event.sender.send('progress','createMail')
    //await event.sender.send('done','createMail')
    //await event.sender.send('progress','generateInfo')
    await generateInfo()
    //await event.sender.send('done','generateInfo')
    //await event.sender.send('progress','FillData')
    await page.goto("https://www.facebook.com/r.php")/*
    await page.waitForSelector('a[data-testid="open-registration-form-button"]')
    await page.click('a[data-testid="open-registration-form-button"]')*/
    await FillData(page,phone,email)
    console.log('manuel_done')
    if(check == true){
        //await event.sender.send('status','Check')
        check = false
        return
    }
    //return
    
    //await event.sender.send('done','FillData')
    //await event.sender.send('progress','getConfirmCode')
    if(!options.settings.sms_mail && !options.settings.manuel){
        await getConfirmCodeSms()
        code = false
        await typeConfirmCode(page)
    } else if(options.settings.sms_mail){
        await getConfirmCodeSms()
        code = false
        await typeConfirmCode(page)
    } else if(options.settings.manuel) {
        await page.waitForFunction(() => document.URL.includes('man_done') || document.URL.includes('checkpoint'));
    }
    if(page.url().includes('checkpoint')){
        await event.sender.send('status','Check')
        return
    } 
    //await event.sender.send('done','getConfirmCode')
    //await event.sender.send('progress','typeConfirmCode')
    //await event.sender.send('done','typeConfirmCode')
    //await event.sender.send('progress','chnageCover')
    //await event.sender.send('done','chnageCover')
    //await event.sender.send('progress','newPost')
    //await event.sender.send('done','newPost')
    //await event.sender.send('progress','chnageProfile')
    await changeProfile(page)
    await chnageCover(page)
    await newPost(page,options.accountSettings.numPosts,event)
    //await event.sender.send('done','chnageProfile')
    //await event.sender.send('progress','ExtractCookie')
    info.cookies = await saveCookies(page)
    //await event.sender.send('done','ExtractCookie')
    saveData()
    const [pageid,post]  = await active.Activate(page,options)
    info.page = pageid
    info.post = post
    info.country = options.accountSettings.country
    info.curr = options.accountSettings.currency
    //await event.sender.send('progress','Finish')
    //await event.sender.send('done','Finish')
    await event.sender.send('push',info)
    await clearCookies(page)
    } catch(err) {console.log(err)
        return
    }
}

module.exports.initBrowser = async () => {
    const pathToExtension = setPath("config/jpgljfpmoofbmlieejglhonfofmahini/3.0.25_0/")
    const browser = await puppeteer.launch({
        executablePath:chrome.chrome,//path.join(process.cwd(),path.normalize('resources/app.asar.unpacked/node_modules/puppeteer/.local-chromium/win64-938248/chrome-win/chrome.exe')),
        headless: false,
        args: ['--no-sandbox','--disable-blink-features=AutomationControlled','--media-cache-size=0','--disk-cache-size=0'],
        slowMo:25,
    })
    const [page] = await browser.pages();
    /* await page.setViewport({
      width:800,
      height:1000,
      deviceScaleFactor:1,
    }) */
    page.setDefaultTimeout(0);
    page.setDefaultNavigationTimeout(160 * 1000)
    return [browser,page]
}

const setPath = (newPath) => {
    return path.join(process.cwd(),path.normalize('app/' + newPath))
}

const saveData = () => {
    try {
    var date = new Date().toLocaleDateString().split('/')
    var folder = ''
    var ff = true
    date.forEach(el => {
        if(!ff){
        folder = folder + '-' + el
        } else {
        folder = el
        ff = false
        }
    })
    const folderName = 'data/' +  folder
    var inf = info.email + ':' + info.password + ':' + new Date().toLocaleString() +  ':' + info.cookies + '\r\n'
    !fs.existsSync(setPath(folderName)) && fs.mkdirSync(setPath(folderName), { recursive: true })
    fs.appendFileSync(setPath(folderName + '/data.txt'),inf)
    fs.appendFileSync(setPath(folderName + '/cookies.txt'),info.cookies + '\r\n')
    return
    } catch(err) {console.log(err)
        return
    }
}

const generatePassword = () => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/*-+@!#$%&';
    var charactersLength = characters.length;
    for ( var i = 0; i < 9; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

const generateInfo = async () => {
    info = {first:'',last:'',email:'',password:'',day:'',month:'',year:'',cookies:'',order:'order'}
    var namesFile = fs.readFileSync(setPath('configs/names.txt'),'utf-8').trim().split('\n')
    var name = namesFile[Math.floor(Math.random() * namesFile.length)].split(':')
    info.first  = name[0]
    info.last   = name[1]
    info.password = generatePassword()
    info.day = String(Math.floor(Math.random() * 26 + 1))
    info.month = String(Math.floor(Math.random() * 10 + 1))
    info.year = String('198' + Math.floor(Math.random() * 9))
    return info
}

const createMail = async () => {
    var mail = await Mailbox.createMailbox()
    return String(mail.name + '@developermail.com')
}

const createPhone = async () => {
    var phone = ''
    var order = ''
    await axios.get('https://en.sms-online.pro/api/orders/create/3705/?api_token=' + options.settings.apiKey).
    then(res => {
        phone = res.data.data.phone
        order = res.data.data.id
    })
    console.log(phone,order)
    return [order,phone]
}

const cancelPhone = async (order) => {
    await axios.get(`https://en.sms-online.pro/api/orders/cancel/${order}/?api_token= ${options.settings.apiKey}`)
    return
}


const FillData = async (page,phone,email) => {
    try {
    await page.waitForSelector('[name="firstname"]')
    await page.type('[name="firstname"]',info.first)
    await page.type('[name="lastname"]',info.last)
    await page.waitForSelector('[name="birthday_day"]')
    await page.select('[name="birthday_day"]',info.day)
    await page.select('[name="birthday_year"]',info.year)
    await page.select('[name="birthday_month"]',info.month)
    await page.click('input[name="sex"][value="2"]')
    await page.type('[name="reg_passwd__"]',info.password)
    await page.type('[name="reg_email__"]', phone)
    await page.click('button[name="websubmit"]')
    await page.waitForFunction(() => document.URL.includes('confirm') || document.URL.includes('checkpoint')); 
    await page.waitForSelector('[rel="dialog"]')
    await page.click('[rel="dialog"]')
    await page.waitForSelector('[name="contactpoint"]')
    await page.keyboard.type(email)
    await page.keyboard.press('Enter')
    await page.waitForSelector('[type="text"]')
    if(!options.settings.manuel){
        var [order,phone] = await createPhone()
        info.email = phone
        await page.type('[name="reg_email__"]', phone)
        await page.click('button[name="websubmit"]')
        await page.waitForFunction(() => document.URL.includes('confirm') || document.URL.includes('checkpoint')); 
    }

    if(page.url().includes('check')){
        if(!options.settings.manuel) await cancelPhone(order)
        check = true
        return
    }

    if(options.settings.sms_mail && !options.settings.manuel){
        await cancelPhone(options.settings.apiKey,order)
        var email = await createMail()
        info.email = email
        await page.waitForSelector('[rel="dialog"]')
        await page.click('[rel="dialog"]')
        await page.waitForSelector('[name="contactpoint"]')
        await page.keyboard.type(email)
        await page.keyboard.press('Enter')
        if(page.url().includes('check')){
            check = true
            return
        }
        await page.waitForSelector('[type="text"]')
    }
    return
    } catch(err) {console.log(err)
        return
    }
}

const getConfirmCodeMail = async () => {
    while (code == false){
        var msgs = await Mailbox.getAllMessages()
          if(msgs.length > 1){
            console.log(msgs)
            const rr = msgs[1].value.split('\n')
              for (let index = 0; index < rr.length; index++) {
                if(rr[index].includes('Subject: ')){
                    codeNum = rr[index].replace(/[^0-9]/g, "")
                    code = true
                    break
                }
            }
            break
      }
    }
}

const getConfirmCodeSms = async () => {
    while (code == false){
        if(code !== false) break
        await axios.get('https://en.sms-online.pro/api/orders/status/230767353?api_token=yyaetjy16yau0b8dyfobazogxjifqxqs6cmzuwvqnhxkpiivuk5digx5kkst').
        then(res => {
            var data = res.data.data
            console.log(data)
            if(data.state.includes('success')){
                codeNum = data.state_descripted.replace(/[^0-9]/g, "")
                code = true
                console.log(codeNum)
            }
        })
    }
}

const typeConfirmCode = async (page) => {
    await page.waitForTimeout(500)
    await page.keyboard.type(codeNum,{delay:10})
    await page.waitForTimeout(1000)
    await page.keyboard.press('Enter');
    await page.waitForXPath('//div[contains(text(),"confirmed")]')
}

const newPost = async (page,num,event) => {
    try {
    var url= "https://mbasic.facebook.com/profile.php?ref_component=mbasic_bookmark&ref_page=XMenuController"
    var profile_id = ''
    const posts = fs.readFileSync(setPath('configs/posts.txt'),'utf-8').trim().split('\n')
    try {
    for (let index = 0; index < parseInt(num); index++) {
        if(index == 1)await page.goto(url)
        try{
            var [profile] = await page.$x('//a[contains(text(),"Activity")]');
            profile = await page.evaluate((profile) => {
            return profile.href;
        }, profile);
        profile_id = profile.split('/')[3]
            await page.waitForSelector('textarea[name="xc_message"]',{timeout:40 * 1000})
        } catch(err) {console.log(err)
            await page.goto(url)
        }
        var randomPost = Math.floor(Math.random() * posts.length)
        await page.evaluate((posts,randomPost) => {
            document.querySelector('textarea[name="xc_message"]').value = String(posts[randomPost])
        },posts,randomPost)
        await page.click('input[name="view_post"]')
        await page.waitForNavigation({ waitUntil: 'networkidle0' })
    }
    await likePosts(page)
    event.sender.send('profile_id',profile_id)
    } catch (error) {
        console.log(error)
        return
    }
    } catch(err) {console.log(err)
        return
    }
}

const likePosts = async (page) => {
    try {
    await page.goto('https://m.facebook.com/profile.php')
    await page.waitForXPath('//a[contains(text(),"Like")]')
    await page.evaluate(() => {
      document.querySelectorAll('[aria-pressed="false"]').forEach(el => el.click())
    })
    await page.waitForTimeout(2000)
    } catch(err) {console.log(err)
        return
    }
}


const chnageCover = async (page) => {
    try {
        const cover = String(Math.floor(Math.random() * 5 + 1) + '.jpg')
        await page.goto("https://mbasic.facebook.com/photos/upload/?cover_photo",{ waitUntil: 'domcontentloaded' })
        await page.goto("https://mbasic.facebook.com/photos/upload/?cover_photo",{ waitUntil: 'domcontentloaded' })
        await page.waitForSelector("input[type=file]")    
        const file = await page.$("input[type=file]");
        await file.uploadFile(setPath(`configs/cover/${cover}`) );
        await Promise.all([
            page.click('input[value="Upload"]'),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ]);
    } catch(err) {console.log(err)
        return
    }
}

const changeProfile = async (page) => {
    try {
        const prof = String(Math.floor(Math.random() *  5 + 1) + '.jpg')
        try{
            await page.goto("https://mbasic.facebook.com/profile_picture")
        } catch {
            await page.goto("https://mbasic.facebook.com/profile_picture")
        }
        await page.waitForSelector("input[type=file]")    
        const file2 = await page.$("input[type=file]");
        await file2.uploadFile(setPath(`configs/profile/${prof}`));
        await Promise.all([
            page.click('input[value="Save"]'),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ])
    } catch (error) {
        console.log(error)
        return
    } 
}

const saveCookies = async (page) => {
    try {
    var data = await page._client.send('Network.getAllCookies');
    var cookies = data['cookies']
    var login_cookie =''
    const cookie_names = [
      'c_user',
      'sb',
      'datr',
      'fr',
      'spin',
      'xs',
      'wd'
    ]
        for (const key in cookies) {
            const element = cookies[key];
            for (const k in element) {
                cookie_names.forEach(el => {
                if(element[k] == el) {
                  login_cookie += el + '=' + element['value'] + ';'
                 }
              });           
            }
        }
        return login_cookie
    } catch (error) {
        console.log("error in save cookies",error)
    }
}

const clearCookies = async (page) => {
    try {
  
        const client = await page.target().createCDPSession();
        await client.send('Network.clearBrowserCookies');
        await client.send('Network.clearBrowserCache');
          } catch (error) {
              console.log("error in clear cookies")
          }
  }


