let expect = require("chai").expect;
let should = require('chai').should();
let eBay = require('../src/index');
let configData = require('../src/config');

describe("check all the options provided is valid or not - Ebay Constructor ", () => {
    it("check input is provided or not", () => {
        expect(() => {
            new eBay();
        }).to.throw("Options is missing, please provide the input");
    });

    it("should have client ID", () => {
        let ebayApi = new eBay({ clientID: "12345" });
        ebayApi.options.should.have.property('clientID');
    });

    it("should not have client ID", () => {
        expect(() => {
            new eBay({});
        }).to.throw("Client ID is Missing\ncheck documentation to get Client ID http://developer.ebay.com/DevZone/account/");
    });

    it("check instance of Ebay", () => {
        let ebayApi = new eBay({ clientID: "12345" });
        expect(ebayApi).to.be.a.instanceOf(eBay);
    });

});

describe("check build url method", () => {
    let ebay = new eBay({
        clientID: "testID",
        limit: 6
    });
    let expected_url = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=testID&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&callback=findItemsByKeywords&REST-PAYLOAD&keywords=iphonepaginationInput.entriesPerPage=6GLOBAL-ID=EBAY-US"
    it("should build correct url", () => {
        expect(ebay.buildAPIUrl("iphone")).to.be.equal(expected_url);
    });
});

