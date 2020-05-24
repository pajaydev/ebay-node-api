'use strict';
const expect = require('chai').expect;
const should = require('chai').should();
const { urlParseObj } = require('../src/utils');

describe('test common util methods', () => {
    it('test parse object to query params', () => {
        const expectedParam = '&keywords=iphone&categoryId=111&sortOrder=PricePlusShippingLowest';
        const options = {
            keywords: 'iphone',
            categoryId: '111',
            sortOrder: 'PricePlusShippingLowest'
        };
        const emptyOptions = {};
        expect(urlParseObj(options)).to.be.equal(expectedParam);
        expect(urlParseObj(emptyOptions)).to.be.equal('');
        expect(urlParseObj(options, 'userName=ebay')).to.be.equal(`userName=ebay${expectedParam}`);
    });
});
