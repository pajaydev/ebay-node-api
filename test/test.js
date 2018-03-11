let expect = require("chai").expect;
let should = require('chai').should();
let eBay = require('../src/index');

describe("check all the options provided is valid or not - Ebay Constructor ", () => {
    it("check input is provided or not", () => {
        expect(() => {
            new eBay();
        }).to.throw("Options is missing, please provide the input");
    });

    it("should not have client ID", () => {
        let ebayApi = new eBay({ clientID: "12345" });
        ebayApi.should.not.have.property('clientID');
    });

    it("check instance of Ebay", () => {
        let ebayApi = new eBay({ clientID: "12345" });
        expect(ebayApi).to.be.a.instanceOf(eBay);
    });
});