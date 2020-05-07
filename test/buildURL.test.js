let expect = require('chai').expect;
let should = require('chai').should();
let eBay = require('../src/index');
let buildURL = require('../src/buildURL');

describe('test building url methods', () => {


    it('test search url', () => {
        let expectedSearchUrl = 'https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=testID&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&keywords=iphone&outputSelector(0)=SellerInfo&outputSelector(1)=PictureURLLarge&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-US';
        let options = {
            name: 'iphone',
            operationName: 'findItemsByKeywords',
            param: 'keywords',
            clientID: 'testID',
            limit: 6,
            globalID: 'EBAY-US',
            baseSvcUrl: 'svcs.ebay.com'
        };
        expect(buildURL.buildSearchUrl(options, 'findItemsByKeywords')).to.be.equal(expectedSearchUrl);
    });

    it('test Shopping url without selector', () => {
        let expectedSearchUrl = 'https://open.api.ebay.com/Shopping?appid=testID&callname=demoShoppingName&version=967&siteid=0&responseencoding=JSON';
        let options = {
            name: 'iphone',
            param: 'keywords',
            clientID: 'testID',
            baseUrl: 'open.api.ebay.com'
        };
        expect(buildURL.buildShoppingUrl(options, 'demoShoppingName')).to.be.equal(expectedSearchUrl);
    });

    it('test Shopping url including selector', () => {
        let expectedSearchUrl = 'https://open.api.ebay.com/Shopping?appid=testID&callname=demoShoppingName&version=967&siteid=0&responseencoding=JSON&IncludeSelector=true';
        let options = {
            name: 'iphone',
            param: 'keywords',
            clientID: 'testID',
            includeSelector: true,
            baseUrl: 'open.api.ebay.com'
        };
        expect(buildURL.buildShoppingUrl(options, 'demoShoppingName')).to.be.equal(expectedSearchUrl);
    });
});
