const ipcMain = require('electron').ipcMain
import FB from './script/create.js'
const path = require("path")
const fs = require("fs")

const setPath = (newPath) => {
    return path.join(process.cwd(),path.normalize('app/' + newPath))
}
export default async () => {
    const phones = fs.readFileSync(setPath('configs/phones.txt'),'utf-8').trim().split('\n')
    const emails = fs.readFileSync(setPath('configs/emails.txt'),'utf-8').trim().split('\n')
        ipcMain.on('Start',async (event,arg) => {
            event.returnValue = '';
            var stopped = false
            var num = arg.settings.numOfAccounts
            for (let index = 0; index < parseInt(num); index++) {
                try {
                    ipcMain.on('Stop',async (event) => {
                        event.returnValue = '';
                        try {
                            stopped = true
                            await FB.Stop(page,browser)
                        } catch  {
                            return
                        }
                        event.sender.send('done')
                    })
                    if(stopped == true) break
                    if(stopped == true) return
                    const [browser,page] = await FB.initBrowser()
                    if(stopped == true) return
                    const account = await FB.Create(page,arg,phones[index],emails[index],event)
                    await FB.Stop(page,browser)
                    await new Promise(resolve => setTimeout(resolve, 60 * 1000)); // 3 sec
                    console.log('done waiting')
                    if(index == parseInt(arg) - 1){
                        event.sender.send('finishedAll')
                    }
                } catch {
                    return
                }
            }
        })
}