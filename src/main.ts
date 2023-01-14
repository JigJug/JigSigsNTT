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

    tgBot
    tradeArray: Trade[] = []


    constructor(){
        this.tgBot = new TelegramBot("", '1672696212')
    }


    start(){

        console.log('bot strted')

        

        //this runs first
        getTrades()
        .then((tr) => {

            this.tradeArray = tr

            //testing
            let rand = Math.floor(Math.random() * this.tradeArray.length)
            console.log(rand)
            this.tradeArray.splice(rand, 1)
            

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
            const tradeArray = await getTrades();
            //check the trade arrays to see if there are any differences between the old and new arrays
            const compArr = compareArrays(this.tradeArray, tradeArray)

            if(!compArr) return

            //console.log('new trade found', compArr.newTrAr)

            //update the trade array
            //remove old trdes first - get the indexes of the expired trades with this trade array and missing pairs
            // loop through the index and splice the trade array
            this.removeOldTrades(compArr.missingPair)
            
            //add in the new trades - return the new aded trades
            const tradeMessage = returnNew(compArr.newTrAr, compArr.newPair)
            //add them to the array
            this.tradeArray.concat(tradeMessage)

            //const indexes = updateTradeArry(this.tradeArray,tradeArray);
            //console.log('remove indexes:: ', indexes)


            //testing
            let rand = Math.floor(Math.random() * this.tradeArray.length)
            console.log('RAND = ',rand)
            this.tradeArray.splice(rand, 1)

            

            //send an array of pairs
            tradeMessage.forEach( async (v) => {
                const msg = messageMaker(v)

                console.log(msg)
                //await this.tgBot.sendMessage(msg)
            });
            
            
            
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

        indexes.forEach((v) => {
            console.log(this.tradeArray[v])
            this.tradeArray.splice(v, 1)
        })
            
    }


}



export function startBot(){

    const bot = new Worker();

    return bot.start();

}
