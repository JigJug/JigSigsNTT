import { startBot } from "./main";
import { HttpsGetRequest } from "./Utils/https";
import * as fs from 'fs/promises'

let date = new Date();




//startBot();


const getReq = new HttpsGetRequest();

let binanceBaseUrl = 'https://api.binance.com/api/v3/'

let binanceTestULRL = 'ping'

let symbol = 'RAYUSDT'

let binanceOrdeBook = `depth?symbol=${symbol}`



let test = `${binanceBaseUrl}${binanceOrdeBook}`

getReq.httpsGet(test)

.then((ret: string) => {

    console.log(ret)

    let retJson = JSON.parse(ret);
    retJson.timeStamp = date.getTime();
    retJson.symbol = symbol;


    console.log(retJson)

    //store to file
    let saveDataStr = JSON.stringify(retJson, null, 2)
    fs.writeFile(`./BinanceOrderBook_${symbol}.json`, saveDataStr).then((ret) => console.log('saved')).catch(err => console.log(err))
})

.catch(err => console.log(err))

