let expect = require("chai").expect;
let should = require('chai').should();
let eBay = require('../src/index');

describe("check build url method", () => {
    let ebay = new eBay({
        clientID: "testID",
        limit: 6
    });
    let expected_url = "http://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=testID&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=iphone&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-US"
    it("should build correct url", () => {
        console.log(ebay.buildAPIUrl("iphone"));
        // expect(ebay.buildAPIUrl("iphone")).to.be.equal(expected_url);
    });
});