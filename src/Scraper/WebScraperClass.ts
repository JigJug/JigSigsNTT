import puppeteer, { Browser } from 'puppeteer'

interface Trade {
    pair: string;
    side: string;
    lev: string;
    entry: string;
    time: string;
}

const url = 'https://www.binance.com/en/futures-activity/leaderboard/user?encryptedUid=EE56F412D7DAB7DBAFCEC2147FA2D223'


async function scrapePAge(url: string){


    try{
        const browser = await puppeteer.launch({headless: true});

        const page = await browser.newPage();

        await page.goto(url, {waitUntil: 'load', timeout: 40000})
        console.log('opened')

        const rraa =  await page.$$eval('table tr', (tre) => {
            //let trs = Array.from(document.getElementsByTagName('tr'));
            return tre.map((v) => {
                return v.innerText
            })
        })

        await browser.close();

        console.log('browser closed... data found...', rraa)
        
        return rraa
        
    }
    catch(err){
        //await browser.close();
        
 
        throw (err)
        
    }
    
}


function organiseTradeData(arr: string[]|undefined){
    console.log('organise data')

    let outarr = [];

    if(arr != undefined)
    for(let i = 2; i<arr.length;i++){
        let newarr = arr[i].split(/[\t\n]/)

        let trade = {
            pair: '',
            side: '',
            lev: '',
            entry: '',
            time: ''
        }

        trade.pair = newarr[0];
        trade.side = newarr[1];
        trade.lev = newarr[2];
        trade.entry = newarr[5];
        trade.time = newarr[12]

        outarr.push(trade)
    }

    console.log('OUT ARR = ', outarr)
    return outarr
}

export async function getTrades(){
    try{
        const tradeTable = await scrapePAge(url);
        
        return organiseTradeData(tradeTable);
    }
    catch(err){
        
        throw err
    }
}


export function compareArrays(trOrig: Trade[], trNew: Trade[]){

    console.log('comp arrs')
    //console.log(trOrig.length)
    //console.log(trNew.length)

    if(trNew[0].pair == '' || trNew[0].pair == undefined ) return null
    //console.log(trOrig)

        //testing
        let rand = Math.floor(Math.random() * trNew.length)
        console.log('RAND = ',rand)
        trNew.splice(rand, 2)

    const pairsOr = trOrig.map(v => {return v.pair}).sort();
    const pairsNu = trNew.map(v => {return v.pair}).sort();

    //console.log(pairsOr)
    //console.log(pairsNu)



    const newPair = findNewInArry(pairsOr, pairsNu);
    console.log('new pair in new array', newPair)

    const missingPAirs = findNewInArry(pairsNu, pairsOr);
    console.log('missing pair in old array', missingPAirs)
    //console.log()
    //console.log(newPair)

    if(newPair.length == 0) return null


    
    return {
        newTrAr: trNew,
        newPair: newPair,
        missingPair: missingPAirs
    }
}

//finds new elements in array
function findNewInArry(a1: string[], a2: string[]){

    return a2.filter(v => {
        return !a1.includes(v)
    })
    
}


//ret new pairs in new array
export function returnNew(tAr: Trade[], pair: string[]){

    return tAr.filter(vT => {
        return !pair.includes(vT.pair);
    });

}
