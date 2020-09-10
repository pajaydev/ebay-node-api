'use strict';
const expect = require('chai').expect;
const nock = require('nock');
const Ebay = require('../src/index');
const nockFindingApi = nock('https://svcs.ebay.com/');

describe('test ebay finding Api', () => {

    describe('test findingApi methods with required params', () => {
        it('test findItemsByCategory with required params', () => {
            const ebay = new Ebay({
                clientID: 'ClientId'
            });
            expect(() => { ebay.findItemsByCategory(); }).to.throw('Category ID is null or invalid');
        });

        it('test findCompletedItemswith required params', () => {
            const ebay = new Ebay({
                clientID: 'ClientId'
            });
            expect(() => { ebay.findCompletedItems(''); }).to.throw('Keyword or category ID are required.');
        });
    });

    describe('test all get apis', () => {
        it('test findItemsAdvanced', () => {
            const ebay = new Ebay({
                clientID: 'ABCD'
            });
            nockFindingApi.get('/services/search/FindingService/v1?SECURITY-APPNAME=ABCD&OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&paginationInput.entriesPerPage=2&keywords=ipad&itemFilter(0).name=ExpeditedShippingType&itemFilter(0).value=OneDayShipping&outputSelector(0)=SellerInfo&outputSelector(1)=PictureURLLarge&outputSelector(2)=PictureURLSuperSize&GLOBAL-ID=EBAY-US')
                .reply(200, { 'findItemsAdvancedResponse': [{ 'ack': ['Success'] }] });
            return ebay.findItemsAdvanced({
                entriesPerPage: 2,
                keywords: 'ipad',
                ExpeditedShippingType: 'OneDayShipping'
            }).then((data) => {
                expect(data.findItemsAdvancedResponse).not.null;
            }, (error) => {
                console.log(error); // eslint-disable-line no-console
            });
        });
    });
});
