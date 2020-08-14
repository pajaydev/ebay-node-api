const nock = require('nock');
const Ebay = require('../src/index');
const expect = require('chai').expect;

describe('Test find items by keyword method', () => {

    beforeEach(() => {
        nock('http://svcs.ebay.com')
            .get('/services/search/FindingService/v1')
            .query({
                'SECURITY-APPNAME': 'ClientId',
                'OPERATION-NAME': 'findItemsByKeywords',
                'SERVICE-VERSION': '1.0.0',
                'RESPONSE-DATA-FORMAT': 'JSON',
                'keywords': 'iphone',
                'GLOBAL-ID': 'EBAY-US'

            })
            .reply(200, {
                'access_token': 'abcd'
            });
    });

    it('test input parameter in findItemsByKeyword method', () => {
        const ebay = new Ebay({
            clientID: 'ClientId'
        });
        expect(() => { ebay.findItemsByKeywords(); }).to.throw('Keyword is missing, Keyword is required');
    });
});
