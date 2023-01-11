const https = require('https');

export class HttpsGetRequest {

    httpsGet(endPoint: string){
        //executes get request 
        //converts buffer to string and resolves with full string
        //if there is no data after 2 seconds the promise resolves with the data

        return new Promise<any> ((resolve, reject) => {

            let timer: NodeJS.Timeout = setTimeout(()=>{resolve(opStr);}, 10000);

            let opStr: string = '';
            
            https.get(endPoint, (res: any) => {

                res.on('data', (d: any) => {
                    clearTimeout(timer);
                    opStr = opStr + d.toString()
                    timer = setTimeout(()=>{resolve(opStr);}, 5000);
                });
            
            }).on('error', (e: Error) => {
                clearTimeout(timer)
                reject(e);
            });
        });
    }
}