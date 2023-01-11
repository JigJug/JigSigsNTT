import puppeteer, {Puppeteer, PuppeteerNode} from 'puppeteer'


export class WebScraper{

    

}
console.log('hello')

const url = 'https://www.binance.com/en/futures-activity/leaderboard/user?encryptedUid=EE56F412D7DAB7DBAFCEC2147FA2D223'

puptest(url)

async function puptest(url: string){
    //const p = new PuppeteerNode();
    //const p1 = puppeteer.launch

    try{
        const browser = await puppeteer.launch();
        console.log('opened brower')
        const page = await browser.newPage();
        console.log('opened page')
        await page.goto(url);
        //console.log(page)
        console.log('opened url')
        const arr = await page.evaluate(  => Array.from(document.getElementsByTagName('th')),)
        console.log('got tr')
        if(arr)
            arr.map((v, i) =>{
                console.log(v.innerHTML);
            })
        //const element = await page.waitForSelector('.bn-table-tbody');
        //console.log(element)
        console.log('getting td elements');
        //await element?.$$eval('tr td', el => {console.log(el)})
        //await page.$eval('table', element => {let h1 = element.innerHTML; console.log(h1)})
        
        
        await browser.close();
    }
    catch(err){
        console.log(err)
    }
    
}