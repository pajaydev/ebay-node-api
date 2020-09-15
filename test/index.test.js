const expect = require('chai').expect;
const should = require('chai').should();
const Ebay = require('../src/index');

describe('check all the options provided is valid or not - Ebay Constructor ', () => {
    it('check input is provided or not', () => {
        expect(() => {
            new Ebay();
        }).to.throw('Options is missing, please provide the input');
    });

    it('should have client ID', () => {
        const ebayApi = new Ebay({ clientID: '12345' });
        ebayApi.options.should.have.property('clientID');
    });

    it('should not have client ID', () => {
        expect(() => {
            new Ebay({});
        }).to.throw('Client ID is Missing\ncheck documentation to get Client ID http://developer.ebay.com/DevZone/account/');
    });

    it('check instance of Ebay', () => {
        const ebayApi = new Ebay({ clientID: '12345' });
        expect(ebayApi).to.be.a.instanceOf(Ebay);
    });

    it('test default params', () => {
        const ebay = new Ebay({
            clientID: 'ClientId'
        });
        const expected = {
            clientID: 'ClientId',
            env: 'PROD',
            baseUrl: 'api.ebay.com',
            baseSvcUrl: 'svcs.ebay.com',
            oauthEndpoint: 'https://auth.ebay.com/oauth2/authorize',
            globalID: 'EBAY-US',
            siteId: '0'
        };
        expect(ebay.options).to.deep.equal(expected);
    });

    it('test site id, env and country code', () => {
        const ebay = new Ebay({
            clientID: 'ClientId',
            siteId: 3,
            env: 'SANDBOX',
            countryCode: 'EBAY_UK'
        });
        expect(ebay.options.siteId).to.equals(3);
        expect(ebay.options.env).to.equals('SANDBOX');
        expect(ebay.options.globalID).to.equals('EBAY_UK');
    });
});
