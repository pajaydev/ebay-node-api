'use strict';
let httpRequest = require('https');
const qs = require('querystring');
const axios = require('axios');

const getRequest = (url) => {
    return axios.get(url);
};

const makeRequest = function postRequest(self, endpoint, methodName, token) {
    let dataString = '';
    if (self.data) {
        dataString = self.data;
    }
    else {
        methodName === 'POST' ? dataString = qs.stringify(self.body) : '';
    }
    const options = {
        'hostname': self.baseUrl,
        'path': endpoint,
        'method': methodName || 'GET',
        'headers': {
            'content-type': self.contentType ? self.contentType : 'application/json',
            'authorization': token,
            'cache-control': 'no-cache',
            ...self.headers
        }
    };
    return new Promise(((resolve, reject) => {
        const req = httpRequest.request(options, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', data => {
                body += data;
                //console.log(body);
            });
            res.on('end', () => {
                resolve(body);

            });
            res.on('error', (error) => {
                reject(error);

            });
        });
        //console.log('request ' + dataString);
        if (methodName === 'POST') req.write(dataString);
        req.end();
    }));
};


const base64Encode = (encodeData) => {
    const buff = Buffer.from(encodeData);
    return buff.toString('base64');
};

module.exports = { getRequest, makeRequest, base64Encode };
