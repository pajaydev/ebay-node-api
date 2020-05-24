let expect = require('chai').expect;
let should = require('chai').should();
let Ebay = require('../src/index');

describe('check all the options provided is valid or not - Ebay Constructor ', () => {
    it('check input is provided or not', () => {
        expect(() => {
            new Ebay();
        }).to.throw('Options is required');
    });

    it('should have client ID', () => {
        let ebayApi = new Ebay({ clientID: '12345' });
        ebayApi.credentials.should.have.property('clientID');
    });

    it('should not have client ID', () => {
        expect(() => {
            new Ebay({});
        }).to.throw('Client ID is Missing\nCheck documentation to get Client ID http://developer.ebay.com/DevZone/account/');
    });

    it('check instance of Ebay', () => {
        let ebayApi = new Ebay({ clientID: '12345' });
        expect(ebayApi).to.be.a.instanceOf(Ebay);
    });

    it('test default params', () => {
        const ebay = new Ebay({
            clientID: 'ClientId'
        });
        expect(ebay.credentials.clientID).to.equal('ClientId');
        expect(ebay.baseUrl).to.equal('api.ebay.com');
        expect(ebay.baseSvcUrl).to.equal('svcs.ebay.com');
        expect(ebay.globalID).to.equal('EBAY-US');
        expect(ebay.siteID).to.equal('0');
        expect(ebay.environment).to.equal('PROD');
    });

    it('test site id, env and country code', () => {
        const ebay = new Ebay({
            clientID: 'ClientId',
            environment: 'SANDBOX',
            countryCode: 'EBAY-GB'
        });
        expect(ebay.siteID).to.equals('3');
        expect(ebay.environment).to.equals('SANDBOX');
        expect(ebay.globalID).to.equals('EBAY-GB');
    });
});
