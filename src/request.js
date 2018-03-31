let httpRequest = require("https");
const qs = require("querystring");

let getRequest = function getRequest(url) {
    if (url.includes("http://")) httpRequest = require("http");
    return new Promise(function (resolve, reject) {
        httpRequest.get(url, res => {
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

let makeRequest = function postRequest(hostName, endpoint, methodName, data, token) {
    methodName == "POST" ? dataString = qs.stringify(data) : '';
    console.log(endpoint);
    const options = {
        "hostname": hostName,
        "path": endpoint,
        "method": methodName || 'GET',
        "headers": {
            "content-type": methodName == "POST" ? "application/x-www-form-urlencoded" : "application/json",
            "authorization": token,
            "cache-control": "no-cache",
        }
    };
    console.log("------------------------");
    console.log(options);
    return new Promise(function (resolve, reject) {
        var req = httpRequest.request(options, res => {
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
        if (methodName == "POST") req.write(dataString)
        req.end();

    })
}


let base64Encode = (encodeData) => {
    let buff = new Buffer(encodeData);
    return buff.toString('base64');
}

module.exports = { getRequest, makeRequest, base64Encode };