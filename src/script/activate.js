const path = require("path")
const fs = require("fs")

const setPath = (newPath) => {
    return path.join(process.cwd(),path.normalize('app/' + newPath))
}

module.exports.Activate = async function(page,options) {
    try {
        await Policys(page)
        const name = options.page.name
        const cat = options.page.cat
            if(options.accountSettings.fullActive){
            if(options.fullActive.pages.send)   await LikePages(page,options.fullActive.pages.num)
            if(options.fullActive.groups.send)  await JoinGroups(page,options.fullActive.groups.num)
            if(options.fullActive.friends.send) await addFriend(page,options.fullActive.friends.num) 
        }
        var page_url
        var page_id
        if(options.page.type == 'm'){
            [page_url,page_id] = await createMobilePage(page,name)
             
        } else {
            page_url = await createPage(page,name,cat)
            page_id = page_url.split('-')[1].replace(/[^0-9]/g, "")
        }
        
        var post_id = await page_post(page,page_url,options.page.postsNum,options.boost.post)
        await like_comment(page,post_id)
        
        await changeCurrCountry(page,options.accountSettings.country,options.accountSettings.currency,options.accountSettings.timezone,page_id,post_id,options.boost.post)
        await boostPost(page,String(options.boost.budget))
        await acceptFriends(page)
        if(options.accountSettings.fullActive){
            await whiteHat(page)
        }
        return [page_id,post_id]
    } catch (err) { console.log(err)
        return
    }
}
const Policys = async (page) => {
    try {
        await page.goto('https://m.facebook.com/certification/nondiscrimination',{waitUntil:'domcontentloaded'})
        try {
            await page.waitForSelector('button[label="I accept"]',{timeout:4 * 1000})
        } catch {
            return
        }
        await page.click('button[label="I accept"]')
        await page.waitForTimeout(3000)
        await page.click('button[label="I accept"]')
        await page.waitForTimeout(3000)
        await page.waitForXPath('//div[contains(text(),"Agreement signed")]',{timeout:7000})
    } catch (error) {
        console.log("Policies accepted before")
        return
    }

}

const createMobilePage = async (page,name) => {
    try {
        await page.goto('https://m.facebook.com/pages/creation_flow/?step=name&ref_type=launch_point');
        await page.waitForSelector('input[type="text"]')
        await page.type('input[type="text"]',String(name))
        await page.click('button[type="submit"]')
        await page.waitForSelector('[name="super_category_selector"]')
        //let optionValue = await page.$$eval('option', options => options.find(o => o.innerText === "Music")?.value)
        await page.select('select[name="super_category_selector"]', '1000');
        await page.waitForTimeout(3000)
        let $elemHandler = await page.$('select[name="sub_category_selector"]');
        let properties = await $elemHandler.getProperties();
        for (const property of properties.values()) {
            const element = property.asElement();
            if (element){
            let hText = await element.getProperty("text");
            let text = await hText.jsonValue();
            let hValue = await element.getProperty("value");
            let value = await hValue.jsonValue();
                if(text.toLocaleLowerCase()==="musician/band"){
                    await page.select('select[name="sub_category_selector"]',value);
                }
            }
        }
        //
        await page.click('button[type="submit"]')
        await page.waitForFunction(() => document.URL.includes('page_id='),{timeout:120 * 1000})
        const page_id = await page.url().split('page_id=')[1].split('&')[0]
        return ['https://mbasic.facebook.com/' + String(page_id),page_id]
    } catch (error) {
        console.log(error)
        return
    }
}
const createPage = async (page,name,cat) => {
    try {
    await page.goto("https://www.facebook.com/pages/creation/?ref_type=launch_point")
    await (await page.waitForXPath('//span[contains(text(),"name")]')).click()
    await page.keyboard.type(name)
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")
    await page.keyboard.type(cat)
    await (await page.waitForSelector('[role=option]')).click()
    await page.keyboard.press("Tab")
    await page.keyboard.type('test')
    await page.click('[aria-label="Create Page"]')
    await (await page.waitForXPath('//span[contains(text(),"Save")]')).click()
    await page.waitForNavigation()
    return page.url().replace('www.','mbasic.')
    } catch (err) { 
        return
    }
}

const post_photo = async (page) => {
    try {
    const posts = fs.readFileSync(setPath('configs/posts.txt'),'utf-8').trim().split('\n')
    const postPic = String(Math.floor(Math.random() * 5 + 1) + '.jpg')
    await page.waitForSelector('textarea[name="xc_message"]')
    await page.click('[name="view_photo"]')
    await page.waitForSelector("input[type=file]")    
    const file = await page.$("input[name=file1]");
    await file.uploadFile(setPath('configs/profile/' + postPic) );
    await page.click('[name="add_photo_done"]')
    await page.waitForSelector('textarea[name="xc_message"]')
    await page.evaluate((posts) => {
        document.querySelector('textarea[name="xc_message"]').value = String(posts[Math.floor(Math.random() * posts.length)])
    },posts)
    await page.click('input[name="view_post"]')
    await page.waitForXPath('//a[contains(text(),"Share")]');
    var [post_link] = await page.$x('//a[contains(text(),"Share")]');
        post_link = await page.evaluate((post_link) => {
        return post_link.href;
    }, post_link);
    const pid = post_link.split('sid=')[1].split('&')[0]
    return pid
    } catch (err) { console.log(err)
        return
    }
}

const page_post = async (page,url,num,boostPhoto) => {
    try {
    await page.goto(url)
    var post_pic_id = ''
    var post_id = ''
    const posts = fs.readFileSync(setPath('configs/posts.txt'),'utf-8').trim().split('\n')
  for (let index = 0; index < parseInt(num); index++) {
    var post = posts[Math.floor(Math.random() * posts.length)]
      if(index == parseInt(num) - 1){
        post_pic_id = await post_photo(page,url)
      } else {
        await page.waitForSelector('textarea[name="xc_message"]')
        await page.evaluate((post) => {
            document.querySelector('textarea[name="xc_message"]').value = String(post)
        },post)
        await page.click('input[name="view_post"]')
        await page.waitForSelector('article')
        await page.waitForXPath('//a[contains(text(),"Share")]');
        var [post_link] = await page.$x('//a[contains(text(),"Share")]');
            post_link = await page.evaluate((post_link) => {
            return post_link.href;
        }, post_link);
        var post_id = post_link.split('sid=')[1].split('&')[0]
        }
  }
  if(boostPhoto == 'photo') {
    return post_pic_id
  } else {
    return post_id
  }
    } catch (err) { console.log(err)
        return
    }
}

const like_comment = async (page,post_id) => {
    try {
        await page.goto(`https://mbasic.facebook.com/mbasic/comment/advanced/?target_id=${post_id}&pap&at=compose`)
        for (let index = 0; index < 5; index++) {
            await page.waitForSelector('textarea[name="comment_text"]')
            await page.evaluate(() => {
                document.querySelector('textarea[name="comment_text"]').value = "mr snowman was here"
            })
            await page.click('[value="Comment"]')
            await page.waitForSelector('#root')   
        }
        await (await page.waitForXPath('//span[contains(text(),"Like")]')).click()
    } catch (err) { console.log(err)
        return
    }
}

const changeCurrCountry = async (page,country,curr,timezone,pageid,pid,boost) => {
try {
  await page.goto(`https://www.facebook.com/ad_center/create/boostpost/?entry_point=new_timeline&page_id=${pageid}&target_id=${pid}`)
  if(boost == 'photo'){
    await page.waitForSelector('[aria-haspopup="listbox"]')
    await page.waitForTimeout(2000)
    await page.click('[aria-haspopup="listbox"]')
    await page.waitForFunction(() => document.querySelectorAll('[aria-selected="false"]').length > 4)
    try {
        var bb = await page.$x("//span[contains(text(),'No button')]")
        await bb[0].click()
    } catch {
        var bb = await page.$x("//span[contains(text(),'No Button')]")
        await bb[0].click()
    }  
    await page.waitForFunction(() => document.querySelectorAll('[aria-label="Change"]').length > 1)
    var change = await page.$$('[aria-label="Change"]')
    await change[1].click()
  } else {
    await page.waitForSelector('[aria-label="Change"]')
    var change = await page.$$('[aria-label="Change"]')
    await change[0].click()
  }
  
  await page.waitForFunction(() => document.querySelectorAll('label[role="combobox"]').length > 1)
  await page.waitForTimeout(2000)
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')
  await (await page.waitForXPath(`//span[contains(text(),"${country}")]`)).click()
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')
  await (await page.waitForXPath(`//span[contains(text(),"${curr}")]`)).click()
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')
  await (await page.waitForXPath(`//span[contains(text(),"${timezone}")]`)).click()
  await page.waitForTimeout(2000)
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')
  await page.waitForFunction(() => document.querySelectorAll('[role="dialog"]').length <= 1)
    } catch (err) { console.log(err)
        return
    }
}

const boostPost = async (page,budget) => {
    try {
    await page.waitForSelector('input[maxlength="12"]')
    const input = await page.$('input[maxlength="12"]');
    await page.waitForTimeout(4000)
    await input.click({clickCount: 3})
    await input.type(String(budget));
    await (await page.waitForXPath("//div[starts-with(@aria-label, 'Boost')]")).click()
    await page.waitForTimeout(2000)
    await (await page.waitForXPath("//div[starts-with(@aria-label, 'Boost')]")).click()
    await page.waitForTimeout(1000)
    for (let index = 0; index < 5; index++) {
        await page.waitForSelector('[aria-label="Next"]')
        if (index == 0)  await page.waitForTimeout(2500)
        try {
            await page.click('[aria-label="Next"]')
        } catch {
            await page.click('[aria-label="Next"]')
        }
        await page.waitForSelector('[aria-label="Save"]')
        await page.click('[aria-label="Save"]')
        await page.waitForSelector('[aria-label="Close"]')
        await page.click('[aria-label="Close"]')
        if(index !== 4){
            await (await page.waitForXPath("//div[starts-with(@aria-label, 'Boost')]")).click()
        }
    }
    } catch (err) { console.log(err)
        return
    }
}

const addFriend = async (page,num) => {
    try {
    const friends = fs.readFileSync(setPath('configs/friends.txt'),'utf-8').trim().split('\n')
    for (let index = 0; index < parseInt(num) ;index++) {
    var friend = friends[Math.floor(Math.random() * friends.length)]
    await page.goto(friend)
    await page.waitForSelector('table a')
    const add = await page.$$('table a')
    await add[1].click()
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    }
    } catch (err) { console.log(err)
        return
    }
}

const LikePages = async (page,num) => {
    const joinedPg = []
    try {
        const pages = fs.readFileSync(setPath('configs/pages.txt'),'utf-8').trim().split('\n')
        for (let index = 0; index < parseInt(num) ;index++) {
            var pg = pages[Math.floor(Math.random() * pages.length)]
            if(joinedPg.includes(pg)) {
                continue
            }
            joinedPg.push(pg)
            await page.goto(pg)
            await page.waitForSelector('[style="width:25%"]')
            await page.click('[style="width:25%"]')
            await page.waitForFunction(() => document.URL.includes('rdr'))
        }
    } catch (err) { console.log(err)
        return
    }
}

const JoinGroups = async (page,num) => {
    const joinedPg = []
    try {
        const groups = fs.readFileSync(setPath('configs/groups.txt'),'utf-8').trim().split('\n')
        for (let index = 0; index < parseInt(num) ;index++) {
        var group = groups[Math.floor(Math.random() * groups.length)]
        if(joinedPg.includes(group)) {
            continue
        }
        joinedPg.push(group)
        await page.goto(group)
        await page.waitForSelector('[size="0"]')
        await page.click('[size="0"]')
        await page.waitForFunction(() => document.URL.includes('rdr'))
        }
    } catch  {
        return
    }
}

const acceptFriends = async (page) => {
    try{
        const dismissBeforeUnload = dialog => 
    dialog.type() === "beforeunload" && dialog.dismiss();
    page.on("dialog", dismissBeforeUnload); 
    await page.evaluate(() => {
    window.onbeforeunload = null;
    });
    page.off("dialog", dismissBeforeUnload); 
    page.on("dialog", dialog => 
    dialog.type() === "beforeunload" && dialog.accept()
    );
    await page.goto('https://mbasic.facebook.com/friends/center/requests/')
    await page.waitForSelector('#friends_center_main')
    const acceptFriends = await page.$$('#friends_center_main table')
    if(acceptFriends.length > 0){
        for (let index = 0; index < acceptFriends.length; index++) {
            var [confirm] = await page.$x('//span[contains(text(),"Confirm")]');
            await confirm.click()
            await page.waitForFunction(() => document.URL.includes('rdr'))   
        }
    }
    } catch(err){
        console.log(err)
        return
    }
}

const whiteHat = async (page) => {
    try {
        await page.goto('https://www.facebook.com/whitehat/accounts')
        await (await page.waitForXPath("//span[contains(text() ,'Create')]")).click()
        await page.waitForSelector('[aria-label="Close"]')
    } catch (err) { console.log(err)
        return
    }
}
