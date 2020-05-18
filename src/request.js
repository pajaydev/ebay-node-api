'use strict';
let httpRequest = require('https');
const qs = require('querystring');

const getRequest = (url) => {
    if (url.includes('http://')) httpRequest = require('http');
    return new Promise(((resolve, reject) => {
        httpRequest.get(url, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', data => {
                body += data;
            });
            res.on('end', () => {
                if (JSON.parse(body).errorMessage) {
                    reject(body);
                }
                resolve(body);
            });
            res.on('error', (error) => {
                reject(error);

            });
        });
    }));
};

const makeRequest = (self, customOptions, endpoint, methodName, token) => {
    let dataString = '';
    if (customOptions.data) {
        dataString = customOptions.data;
    } else {
        methodName === 'POST' ? dataString = qs.stringify(customOptions.body) : '';
    }
    const options = {
        'hostname': self.baseUrl,
        'path': endpoint,
        'method': methodName,
        'headers': {
            'content-type': customOptions.contentType,
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

const postRequest = (self, contentType, data, endpoint, authToken) => {
    return new Promise((resolve, reject) => {
        const req = httpRequest.request({
            hostname: self.baseUrl,
            path: endpoint,
            method: 'POST',
            headers: {
                'Content-Type': contentType,
                'authorization': authToken,
                ...self.headers
            },
        });
        req.on('response', (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => body += chunk); // eslint-disable-line 
            res.on('end', () => {
                if (body.error) {
                    reject(body);
                }
                resolve(body);
            });
        });

        req.on('error', (error) => {
            reject(error);
        });
        req.end(data);
        console.log(req.body);
    });
};

module.exports = { getRequest, postRequest, makeRequest };
