let request = require("https");
const qs = require("querystring");

let getRequest = function getRequest(url) {
    if (url.includes("http://")) request = require("http");
    return new Promise(function (resolve, reject) {
        request.get(url, res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                resolve(body);

            });
        });
    })

}

let postRequest = function postRequest(hostName, endpoint, data, token) {
    const dataString = qs.stringify({ grant_type: 'client_credentials' });
    console.log(dataString);
    const options = {
        "hostname": hostName,
        "path": endpoint,
        "method": 'POST',
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "authorization": token,
            "cache-control": "no-cache",
        }
    };
    return new Promise(function (resolve, reject) {
        var req = https.request(options, res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
                //console.log(body);
            });
            res.on("end", () => {
                resolve(body);

            });
        });
        //console.log("request " + dataString);
        req.write(dataString)
        req.end();

    })
}


let base64Encode = (encodeData) => {
    let buff = new Buffer(encodeData);
    return buff.toString('base64');
}

module.exports = { getRequest, postRequest, base64Encode };