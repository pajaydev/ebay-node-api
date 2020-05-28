'use strict';
const expect = require('chai').expect;
const { parseObj } = require('../src/common-utils/index');
const { constructAdditionalParams } = require('../src/common-utils/index');

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

    describe('test constructAdditionalParams', () => {
        it('test constructAdditionalParams with required params', () => {
            let expectedParam = 'keywords=iphone&categoryId=111&sortOrder=PricePlusShippingLowest';
            const options = {
                keywords: 'iphone',
                categoryId: '111',
                sortOrder: 'PricePlusShippingLowest'
            };
            const emptyOptions = {};
            expect(constructAdditionalParams(options)).to.be.equal(expectedParam);
            expect(constructAdditionalParams(emptyOptions)).to.be.equal('');
        });

        it('test constructAdditionalParams with affiliate params', () => {
            let expectedParamWithAffiliate = 'keywords=iphone&categoryId=111&sortOrder=PricePlusShippingLowest&affiliate.trackingId=1234567899&affiliate.networkId=123';
            let expectedParam = 'keywords=iphone&categoryId=111&sortOrder=PricePlusShippingLowest';
            const options = {
                keywords: 'iphone',
                categoryId: '111',
                sortOrder: 'PricePlusShippingLowest',
                affiliate: {
                    trackingId: 1234567899,
                    networkId: 123
                }
            };

            const optionsWithNoAffiliate = {
                keywords: 'iphone',
                categoryId: '111',
                sortOrder: 'PricePlusShippingLowest'
            };
            const emptyOptions = {};
            expect(constructAdditionalParams(options)).to.be.equal(expectedParamWithAffiliate);
            expect(constructAdditionalParams(optionsWithNoAffiliate)).to.be.equal(expectedParam);
            expect(constructAdditionalParams(emptyOptions)).to.be.equal('');
        });

        it('test constructAdditionalParams with additional params', () => {
            let expectedParam = 'keywords=iphone%206s&categoryId=111&sortOrder=PricePlusShippingLowest&itemFilter(0).name=Condition&itemFilter(0).value=3000&itemFilter(1).name=SoldItemsOnly&itemFilter(1).value=true&storeName=addidas%20store';
            let expectedPaginationParam = 'keywords=iphone&categoryId=111&sortOrder=PricePlusShippingLowest&itemFilter(0).name=Condition&itemFilter(0).value=3000&itemFilter(1).name=SoldItemsOnly&itemFilter(1).value=true&paginationInput.entriesPerPage=2';
            const options = {
                keywords: 'iphone 6s',
                categoryId: '111',
                sortOrder: 'PricePlusShippingLowest',
                Condition: 3000,
                SoldItemsOnly: true,
                storeName: 'addidas store'
            };
            const optionsWithPagination = {
                keywords: 'iphone',
                categoryId: '111',
                sortOrder: 'PricePlusShippingLowest',
                Condition: 3000,
                SoldItemsOnly: true,
                entriesPerPage: 2
            };
            expect(constructAdditionalParams(options)).to.be.equal(expectedParam);
            expect(constructAdditionalParams(optionsWithPagination)).to.be.equal(expectedPaginationParam);
        });
    });
});
