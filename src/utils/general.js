'use strict';

const isString = value => {
    return typeof value === 'string' || value instanceof String;
};

module.exports = {
    base64Encode: data => {
        const buff = Buffer.from(data);
        return buff.toString('base64');
    },
    getSiteId: globalID => {
        // Reference: https://developer.ebay.com/DevZone/merchandising/docs/Concepts/SiteIDToGlobalID.html
        switch (globalID) {
            case 'EBAY-US':
                return '0';
            case 'EBAY-ENCA':
                return '2';
            case 'EBAY-GB':
                return '3';
            case 'EBAY-AU':
                return '15';
            case 'EBAY-FRBE':
                return '16';
            case 'EBAY-FR':
                return '23';
            case 'EBAY-DE':
                return '71';
            case 'EBAY-MOTOR':
                return '77';
            case 'EBAY-IT':
                return '100';
            case 'EBAY-NLBE':
                return '101';
            case 'EBAY-NL':
                return '123';
            case 'EBAY-ES':
                return '146';
            case 'EBAY-CH':
                return '186';
            case 'EBAY-HK':
                return '193';
            case 'EBAY-IN':
                return '201';
            case 'EBAY-IE':
                return '205';
            case 'EBAY-MY':
                return '207';
            case 'EBAY-FRCA':
                return '210';
            case 'EBAY-PH':
                return '211';
            case 'EBAY-PL':
                return '212';
            case 'EBAY-SG':
                return '216';
            default:
                throw new Error('Invalid globalID');
        }
    },

    isString,
    
    upperCase: data => {
        if (!isString(data)) data = data.toString();
        return data.toUpperCase();
    },

    // Returns if object is empty or not
    isEmptyObj: obj => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
};
