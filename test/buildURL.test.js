let expect = require("chai").expect;
let should = require('chai').should();
let eBay = require('../src/index');
let buildURL = require('../src/buildURL');

describe("test building url methods", () => {


    it("test search url", () => {
        let expected_search_url = "http://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=testID&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&keywords=iphone&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-US"
        let options = {
            name: "iphone",
            operationName: "findItemsByKeywords",
            param: "keywords",
            clientID: "testID",
            limit: 6,
            globalID: "EBAY-US"
        }
        expect(buildURL.buildSearchUrl(options)).to.be.equal(expected_search_url);
    });

    it("test Shopping url without selector", () => {
        let expected_search_url = "http://open.api.ebay.com/Shopping?appid=testID&callname=demoShoppingName&version=967&siteid=0&responseencoding=JSON&keywords=iphone"
        let options = {
            name: "iphone",
            operationName: "demoShoppingName",
            param: "keywords",
            clientID: "testID",
        }
        expect(buildURL.buildShoppingUrl(options)).to.be.equal(expected_search_url);
    });

    it("test Shopping url including selector", () => {
        let expected_search_url = "http://open.api.ebay.com/Shopping?appid=testID&callname=demoShoppingName&version=967&siteid=0&responseencoding=JSON&keywords=iphone&IncludeSelector=true"
        let options = {
            name: "iphone",
            operationName: "demoShoppingName",
            param: "keywords",
            clientID: "testID",
            includeSelector: true
        }
        expect(buildURL.buildShoppingUrl(options)).to.be.equal(expected_search_url);
    });
});