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
                // The regex turns keys like categoryID to categoryId for the param
                url = `${url}&${key.replace(/ID$/, 'Id')}=${options[key]}`;
            }
        }
        return url;
    }
}