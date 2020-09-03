'use strict';

const expect = require('chai').expect;
const nock = require('nock');
const Ebay = require('../src/index');

describe('test shopping api', () => {
    describe('test all error scenarios', () => {
        it('test input params', () => {
            const ebay = new Ebay({
                clientID: 'ClientId'
            });
            expect(() => { ebay.getSingleItem(); }).to.throw('invalid_request_error -> Item ID is null or invalid');
            expect(() => { ebay.getMultipleItems(); }).to.throw('invalid_request_error -> Item ID is null or invalid');
            expect(() => { ebay.getMultipleItems([]); }).to.throw('invalid_request_error -> Item ID is null or invalid');
            expect(() => { ebay.getShippingCosts(); }).to.throw('invalid_request_error -> Invalid input');
            expect(() => { ebay.getUserDetails(); }).to.throw('invalid_request_error -> Invalid input');
            expect(() => { ebay.getAllCategories(); }).to.be.not.throw;
            expect(() => { ebay.getItemStatus(); }).to.throw('invalid_request_error -> Item ID is null or invalid');
        });
    });
    describe('test shopping api calls', () => {
        it('test getSingle Item method', () => {
            const ebay = new Ebay({
                clientID: 'ABCXXX123'
            });
            nock('https://api.ebay.com')
                .get('/Shopping?appid=ABCXXX123&callname=GetSingleItem&version=967&siteid=0&responseencoding=JSON&ItemID=12345')
                .reply(200, { getSingleItem: true });
            ebay.getSingleItem('12345').then((data) => {
                expect(data).to.deep.equal({ getSingleItem: true });
            });
        });

        it('test getMutiple items method', () => {
            const ebay = new Ebay({
                clientID: 'ABCXXX123'
            });
            nock('https://api.ebay.com')
                .get('/Shopping?appid=ABCXXX123&callname=GetMultipleItems&version=967&siteid=0&responseencoding=JSON&itemId=12345,4567')
                .reply(200, { getMultipleItems: true });
            ebay.getMultipleItems({ itemId: ['12345', '4567'] }).then((data) => {
                expect(data).to.deep.equal({ getMultipleItems: true });
            });
        });

        it('test getUserDetails method', () => {
            const ebay = new Ebay({
                clientID: 'ABCXXX123'
            });
            nock('https://api.ebay.com')
                .get('/Shopping?appid=ABCXXX123&callname=GetUserProfile&version=967&siteid=0&responseencoding=JSON&userId=test&includeSelector=Details')
                .reply(200, { getUserDetails: true });
            ebay.getUserDetails({ userId: 'test' }).then((data) => {
                expect(data).to.deep.equal({ getUserDetails: true });
            });
        });

        it('test getUserDetails method with include selector', () => {
            const ebay = new Ebay({
                clientID: 'ABCXXX123'
            });
            nock('https://api.ebay.com')
                .get('/Shopping?appid=ABCXXX123&callname=GetUserProfile&version=967&siteid=0&responseencoding=JSON&userId=test&includeSelector=sample')
                .reply(200, { getUserDetailsWithIncludeSelector: true });
            ebay.getUserDetails({ userId: 'test', includeSelector: 'sample' }).then((data) => {
                expect(data).to.deep.equal({ getUserDetailsWithIncludeSelector: true });
            });
        });

        it('test getShippingCosts method', () => {
            const ebay = new Ebay({
                clientID: 'ABCXXX123'
            });
            nock('https://api.ebay.com')
                .get('/Shopping?appid=ABCXXX123&callname=GetShippingCosts&version=967&siteid=0&responseencoding=JSON&itemId=153265274986&destinationCountryCode=US&destinationPostalCode=95128')
                .reply(200, { getShippingCosts: true });
            ebay.getShippingCosts({
                itemId: '153265274986', destinationCountryCode: 'US',
                destinationPostalCode: '95128'
            }).then((data) => {
                expect(data).to.deep.equal({ getShippingCosts: true });
            });
        });

        it('test getAllCategories method', () => {
            const ebay = new Ebay({
                clientID: 'ABCXXX123'
            });
            nock('https://api.ebay.com')
                .get('/Shopping?appid=ABCXXX123&callname=GetCategoryInfo&version=967&siteid=0&responseencoding=JSON&CategoryID=1234')
                .reply(200, { getAllCategories: true });
            ebay.getAllCategories(1234).then((data) => {
                expect(data).to.deep.equal({ getAllCategories: true });
            });
        });

        it('test getItemStatus method', () => {
            const ebay = new Ebay({
                clientID: 'ABCXXX123'
            });
            nock('https://api.ebay.com')
                .get('/Shopping?appid=ABCXXX123&callname=GetItemStatus&version=967&siteid=0&responseencoding=JSON&ItemID=12345')
                .reply(200, { getItemStatus: true });
            ebay.getItemStatus(12345).then((data) => {
                expect(data).to.deep.equal({ getItemStatus: true });
            });
        });
    });
});
