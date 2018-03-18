let expect = require("chai").expect;
let should = require('chai').should();
let eBay = require('../src/index');
let buildURL = require('../src/buildURL');

describe("test building url methods", () => {

    let expected_search_url = "http://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=testID&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=iphone&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-US"
    it("test search url", () => {

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
});