'use strict';

module.exports = {
    encodeURLQuery: url => {
        return encodeURIComponent(url)
            .replace(/'/g, '%27')
            .replace(/"/g, '%22');
    },

    // parses the object and converts it into query params.
    urlParseObj: (options, url = '') => {
        if (options) {
            for (let key in options) {
                url = `${url}&${key}=${options[key]}`;
            }
        }
        return url;
    }
}