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
    },
    /**
     * Constructs query param based on some logic to support filter and aspect_filter params.
     * output will be keywords=iphone&itemFilter(0).name=Condition&itemFilter(0).value=3000&itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true&itemFilter(2).name=SoldItemsOnly&itemFilter(2).value=true
     * @param {Object} options
     */
    constructAdditionalParams: options => {
        let params = '';
        let count = 0;
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                if (key === 'entriesPerPage' || key === 'pageNumber') {
                    params = `${params}paginationInput.${key}=${options[key]}&`;
                }
                else if (key === 'keywords' || key === 'sortOrder' || key === 'storeName') {
                    params = `${params}${key}=${options[key]}&`;
                }
                else if (key === 'categoryID' || key === 'productID') {
                    params = `${params}${key.replace(/ID$/, 'Id')}=${options[key]}&`;
                }
                else if (key === 'affiliate') {
                    const innerParams = options[key];
                    for (let innerKey in innerParams) {
                        params = `${params}${key}.${innerKey.replace(/ID$/, 'Id')}=${innerParams[innerKey]}&`;
                    }
                }
                else {
                    params = `${params}itemFilter(${count}).name=${key}&
                    itemFilter(${count}).value=${options[key]}&`;
                    count += 1;
                }
            }
        }
        // replace extra space
        params = params.replace(/\s/g, '');
        return params.substring(0, params.length - 1);
    },
}