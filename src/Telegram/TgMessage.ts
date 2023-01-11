import { HttpsGetRequest } from "../Utils/https"
import * as fs from 'fs/promises'


export async function botSignalMessage(botToken: string, channel: string, message: string){

    const configPAth = '..\\..\\configs.json'

    const channel = '-1001672696212'

    //const tDotMeUrl = `https://api.telegram.org/bot${botToken}/getUpdates`

    message = `✨✨✨ ALERT ✨✨✨%0A 👀New Trade!!!👀%0A%0A%0A${message}`

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