//import * as axios from 'axios'
//import { HttpsGetRequest } from './https';
/*import * as fs from 'fs/promises'

class NewTrade{
    name
    entry
    side
    leverage
    time
    
    constructor(){
        this.name = ''
        this.entry = ''
        this.side = ''
        this.leverage = ''
        this.time = ''
    }
}

interface Trade {
    name: string;
    entry: string;
    side: string;
    leverage: string;
    time: string;
}

let trade = {
    name: '',
    entry: '',
    side: '',
    leverage: '',
    time: ''
}

let tradeArr: Trade[] = []



export async function getBinanceTopTraderData(){

    const url = `https://www.binance.com/en/futures-activity/leaderboard/user?encryptedUid=EE56F412D7DAB7DBAFCEC2147FA2D223`;

    try{

        //new selenium try - making a request to the page did not work and did not pull dynamic data
        //const nanceLeaderUpdate = await example();
        //await bot(nanceLeaderUpdate);

        
        //const html = await getHtml(url);
        //const parsedHtml = getIndexFromHtml(html);
        //getTablesFromHtml(html)
        //const addToFile = await makeFile(html,'Anonymous User-cd967');
        //await bot();
    }
    catch(err){
        console.log(err)
    }
}


async function getHtml(url: string){
    const httpsGetReq = new HttpsGetRequest();
    console.log(url)
    try{
        const html = await httpsGetReq.httpsGet(url);
        //console.log(html)
        return html;
    }
    catch(err){
        throw err
    }
}

function getIndexFromHtml(html: string){

    let ops: number;

    const searchStr = 'Positions';

    const sStrI = html.indexOf(searchStr);

    console.log(sStrI)

    return sStrI

}

function getTablesFromHtml(str: string){
    const regex = /<table(.*?)<\/table/g
    const regex1 = /Positions/g

    const sStr = str.match(regex);
    console.log(sStr);
}

const searchstr = (html:string, searchArr: string[]) => {

    for(let i = 0; i < searchArr.length; i++){

        if(html.indexOf(searchArr[i]) == -1) return

    }
    
}

async function makeFile(data: string, name: string){
    try{
        const mf = await fs.writeFile(`./opts/bn_${name}`, data);
    }
    catch(err){
        throw(err);
    }
}



//telegram bot

async function bot(message: string){

    const botToken = ''

    const tDotMeUrl = `https://api.telegram.org/bot${botToken}/getUpdates`

    //let message = 'hello degens, token sniffer sniffing some panties... i mean tokens... please wait a moment my dev is still working on me'

    const channel = '-1001672696212'

    message = `✨✨✨ ALERT ✨✨✨%0A 👀TRADE STATUS UPDATE!!!👀%0A%0A%0A${message}`

    try{
        const botUpdates = await getHtml(tDotMeUrl);
        console.log(botUpdates)

        let messageUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${channel}&text=${message}`

        const sendMessage = await getHtml(messageUrl)
        
    }
    catch(err){
        throw(err)
    }
}


//import {Builder, By, Key, until} from 'selenium-webdriver';
//import { INTERNAL_COMPUTE_OFFSET_SCRIPT } from 'selenium-webdriver/lib/input';
import { traceDeprecation } from 'process';
import { stringify } from 'querystring';

//(
async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    console.log('builtdriver')
    await driver.get('https://www.binance.com/en/futures-activity/leaderboard/user?encryptedUid=EE56F412D7DAB7DBAFCEC2147FA2D223');
    console.log('sent ger r')
    const tableEle = await driver.findElements(By.css('tbody'))//.sendKeys('webdriver', Key.RETURN);

    const tableTr = await tableEle[0].findElements(By.css('tr'));
    
    let opstr: string = '';

    for(let i =0; i< tableTr.length; i++){
        
        //returns pairing as string
        let att = await tableTr[i].getAttribute('data-row-key');
        //console.log(att);
        //opstr = opstr + `%0A ${att}`

        //now get the tds and info of the trade
        let tableTd = await tableTr[i].findElements(By.css('td'));

        for(let i =0; i< tableTd.length; i++){
            
            let taleTdTxt = await tableTd[i].getText();
            if(i == 0 ) {
                opstr = opstr + `⭐${taleTdTxt}⭐%0A`
                //let pIndex = taleTdTxt.indexOf('Perpetual')
                let arr: string[] = []
                arr.push(taleTdTxt)
                console.log(arr)
            }
            if(i == 1 ) {
                opstr = opstr + `  Size:   ${taleTdTxt}%0A`
            }
            if(i == 2 ) {
                opstr = opstr + `  Entry:  ${taleTdTxt}%0A`
            }
            if(i == 3 ) {
                opstr = opstr + `  Mark:   ${taleTdTxt}%0A`
            }
            if(i == 4 ) {
                opstr = opstr + `  PNL:    ${taleTdTxt}%0A`
            }
            if(i == 5 ) {
                opstr = opstr + `  Time:   ${taleTdTxt}%0A`
            }
            if(i == 6 ) {
                opstr = opstr + `  Action: ${taleTdTxt}%0A`
            }
        }

        opstr = `${opstr}%0A%0A`

        //console.log(opstr+'\n');

        //opstr = '';
    }

    console.log(opstr)

    await driver.quit();

    return opstr

    

    
    //console.log('find element')
    //console.log(tableEle)

    //await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  }
  catch(err){
    throw err
  }
  
}//)();


async function newTradeSniffer(tradeArr: Trade[]) {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        console.log('builtdriver')
        await driver.get('https://www.binance.com/en/futures-activity/leaderboard/user?encryptedUid=EE56F412D7DAB7DBAFCEC2147FA2D223');
        console.log('sent ger r')
        const tableEle = await driver.findElements(By.css('tbody'))//.sendKeys('webdriver', Key.RETURN);
  
        const tableTr = await tableEle[0].findElements(By.css('tr'));
  
        
      
        let opstr: string = '';
  
        for(let i =0; i< tableTr.length; i++){
          
            //returns pairing as string
            let att = await tableTr[i].getAttribute('data-row-key');
            //console.log(att);
            //opstr = opstr + `%0A ${att}`
  
            //now get the tds and info of the trade
            let tableTd = await tableTr[i].findElements(By.css('td'));
  
            for(let i =0; i< tableTd.length; i++){
              
                let taleTdTxt = await tableTd[i].getText();
                if(i == 0 ) {
                    opstr = opstr + `⭐${taleTdTxt}⭐%0A`
                    //let pIndex = taleTdTxt.indexOf('Perpetual')
                    let arr: string[] = []
                    arr.push(taleTdTxt)
                    console.log(arr)
                }
                if(i == 1 ) {
                    opstr = opstr + `  Size:   ${taleTdTxt}%0A`
                }
                if(i == 2 ) {
                    opstr = opstr + `  Entry:  ${taleTdTxt}%0A`
                }
                if(i == 3 ) {
                    opstr = opstr + `  Mark:   ${taleTdTxt}%0A`
                }
                if(i == 4 ) {
                    opstr = opstr + `  PNL:    ${taleTdTxt}%0A`
                }
                if(i == 5 ) {
                    opstr = opstr + `  Time:   ${taleTdTxt}%0A`
                }
                if(i == 6 ) {
                    opstr = opstr + `  Action: ${taleTdTxt}%0A`
                }
            }
  
            opstr = `${opstr}%0A%0A`
  
            //console.log(opstr+'\n');
  
            //opstr = '';
        }
  
        console.log(opstr)
  
        await driver.quit();
  
        return opstr
  
      
  
      
      //console.log('find element')
      //console.log(tableEle)
  
      //await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    }
    catch(err){
      throw err
    }
    
}


function split(string: string, trade: Trade){
    string.split(' \n');

}*/