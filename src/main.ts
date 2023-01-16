//'TESTING WEB SCRAPPER WITH PUPETEER'
import { TelegramBot } from "./Telegram/BotClass";
import { messageMaker } from "./Telegram/TgMessage";
import { getTrades, compareArrays, returnNew} from "./Scraper/WebScraperClass";


interface Trade {
    pair: string;
    side: string;
    lev: string;
    entry: string;
    time: string;
}

class Worker {

    botToken
    tgBot
    tradeArray: Trade[] = []


    constructor(){
        this.botToken = require('../configs.json')
        console.log(this.botToken.botToken)
        this.tgBot = new TelegramBot(this.botToken.botToken, '1672696212')
    }


    start(){

        console.log('bot strted')

        //this runs first
        getTrades(false)
        .then((tr) => {

            this.tradeArray = tr

            //testing
            //let rand = Math.floor(Math.random() * this.tradeArray.length)
            //console.log(rand)
            //console.log(this.tradeArray[1])
            //this.tradeArray.splice(1, 1)
            //console.log('trade array start', this.tradeArray)
            

        }).catch((err) => {
            console.log('error in start')
            console.log(err);
        });

        //routinly check nance
        const interval = setInterval(()=>{
            console.log('setint')

            this.getTradesSendMesage()
            .catch((err) => {
                console.log('error in main')
                //clearInterval(interval);
                console.log(err);
                //setTimeout(()=>{
                //    this.start();
                //}, 30000)

            })
        }, 50000)

    }

    async getTradesSendMesage(){
            
        try{
            //get the trades
            const tradeArray = await getTrades(true);
            //check the trade arrays to see if there are any differences between the old and new arrays
            const compArr = compareArrays(this.tradeArray, tradeArray)

            if(!compArr) return

            //console.log('new trade found', compArr.newTrAr)

            //update the trade array
            //remove old trdes first - get the indexes of the expired trades with this trade array and missing pairs
            // loop through the index and splice the trade array
            //dont get indexes. remove trades by the pair names.
            //console.log('before remove old: ', this.tradeArray)
            this.removeOldTrades(compArr.missingPair)
            //console.log('after remove old: ', this.tradeArray)
            
            //add in the new trades - return the new aded trades
            const tradeMessage = returnNew(compArr.newTrAr, compArr.newPair)
            console.log('trademessage', tradeMessage)
            //add them to the array
            //console.log('before add new: ', this.tradeArray)
            this.addNewTrades(tradeMessage)

            //console.log('after added new trade: ',this.tradeArray)

            //const indexes = updateTradeArry(this.tradeArray,tradeArray);
            //console.log('remove indexes:: ', indexes)


            
            //send an array of pairs
            tradeMessage.forEach( async (v) => {
                const msg = messageMaker(v)

                //console.log(msg)
                await this.tgBot.sendMessage(msg)
            });

            //testing
            //let rand = Math.floor(Math.random() * this.tradeArray.length)
            //console.log('RAND = ',rand)
            //remove element 2
            //console.log('removing ele: ', this.tradeArray[1])
            //this.tradeArray.splice(1, 1)
            
            
            
        }
        catch(err){
            throw err
        }
    }

    removeOldTrades(missingTrades: string []){
        let indexes: number[] = []
        
        missingTrades.forEach((vmt) => {
                
            for(let i = 0; i < this.tradeArray.length; i++){

                if(this.tradeArray[i].pair == vmt){
                    indexes.push(i);
                }
            }
        })

        console.log(indexes)

        indexes.forEach((v) => {
            //console.log(this.tradeArray[v])
            this.tradeArray.splice(v, 1)
        })
            
    }

    addNewTrades(newTrades: Trade[]){
        newTrades.forEach((v) => {
            this.tradeArray.push(v)
        })
    }


}



export function startBot(){

    const bot = new Worker();

    return bot.start();

}
