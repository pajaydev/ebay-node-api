'use strict';
const expect = require('chai').expect;
const should = require('chai').should();
const { parseObj } = require('../src/common-utils/index');

describe('test common util methods', () => {
    it('test parse object to query params', () => {
        const expectedParam = '&keywords=iphone&categoryId=111&sortOrder=PricePlusShippingLowest';
        const options = {
            keywords: 'iphone',
            categoryId: '111',
            sortOrder: 'PricePlusShippingLowest'
        };
        const emptyOptions = {};
        expect(parseObj(options)).to.be.equal(expectedParam);
        expect(parseObj(emptyOptions)).to.be.equal('');
        expect(parseObj(options, 'userName=ebay')).to.be.equal(`userName=ebay${expectedParam}`);
    });
});
