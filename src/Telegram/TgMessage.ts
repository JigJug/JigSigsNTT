import { HttpsGetRequest } from "../Utils/https"
import * as fs from 'fs/promises'

interface Trade {
    pair: string;
    side: string;
    lev: string;
    entry: string;
    time: string;
}



export function messageMaker(trade: Trade){

    const lsemoji = (side: string) => {

        if(side == 'Long') return 'πππ';
        if(side == 'Short') return 'πππ';
    }

    const messageTitle = `β¨β¨β¨ ALERT β¨β¨β¨%0Aπ£π New Trade!!! ππ£%0A%0A${lsemoji(trade.side)}%0A%0A`;

    const messageBody = `π${trade.pair}%0Aπ${trade.side}%0Aπ${trade.lev}%0AπEntry: ${trade.entry}%0Aπ${trade.time}%0A`;

    const messageFoot = `%0A%0Aπ₯π₯π₯π₯π₯π₯π₯`;

    return `${messageTitle}${messageBody}${messageFoot}`
}







export async function botSignalMessage(botToken: string, channel: string, message: string){

    const configPAth = '..\\..\\configs.json'

    //const channel = '-1001672696212'

    //const tDotMeUrl = `https://api.telegram.org/bot${botToken}/getUpdates`

    message = `β¨β¨β¨ ALERT β¨β¨β¨%0A πNew Trade!!!π%0A%0A%0A${message}`

    try{
        
        let messageUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${channel}&text=${message}`;

        const sendMessage = await getHtml(messageUrl);
        
    }
    catch(err){
        throw(err)
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