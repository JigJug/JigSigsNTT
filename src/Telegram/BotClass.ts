import { HttpsGetRequest } from "../Utils/https";

export class TelegramBot{

    /**
     * Telegram bot to send messages to a telegram channel.
     * 
     * @channel
     * - get the telegram channel ID from the channel link
     * or the url in the browser...
     * example: "https://web.telegram.org/k/#-1234567890"
     * Channel ID is the digits in URL or @ name of the channel.
     * 
     * @botToken
     * - get the bot token by creating a new bot with botfather
     * send a message to @ botfather /start then /newbot
     * 
     * Formatting messages - Unicode chars start with a % !!!
     * So a new line will be %0A
    */

    botToken
    channel
    httpsGetRequest
    baseUrl
    
    constructor(botToken: string, channel: string){
        this.botToken = botToken;
        this.channel = `-100${channel}`
        this.httpsGetRequest = new HttpsGetRequest();
        this.baseUrl = `https://api.telegram.org`;
    }

    /**
     * 
     * @param {string} message Contents of message to send to channel
     * @returns {string} Telegram API URL to send in get request
     */
    private createSendMsgURL(message: string){
        return `${this.baseUrl}/bot${this.botToken}/sendMessage?chat_id=${this.channel}&text=${message}`;
    }

    /**
     * Make a HTTPS get request
     * @param {string} url URL string 
     * @returns reply from the destination
     */
    private async getRequest(url: string){
       
        const httpsGetReq = this.httpsGetRequest;

        try{
            const reply = await httpsGetReq.httpsGet(url);

            return reply;
        }
        catch(err){
            throw err;
        }
   
    }



    public async sendMessage(message: string){

        const messageUrl = this.createSendMsgURL(message);

        try{

            const sendMessage = await this.getRequest(messageUrl);

            console.log('message sent: ', sendMessage);

        }
        catch(err){
            throw err;
        }
    }



    
    



}