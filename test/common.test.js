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
            const expectedParam = 'keywords=iphone&categoryId=111&sortOrder=PricePlusShippingLowest&itemFilter(0).name=condition&itemFilter(0).value(0)=3000&itemFilter(0).value(1)=4000';
            const options = {
                keywords: 'iphone',
                categoryId: '111',
                sortOrder: 'PricePlusShippingLowest',
                condition: ['3000', '4000']
            };
            const emptyOptions = {};
            expect(constructAdditionalParams(options)).to.be.equal(expectedParam);
            expect(constructAdditionalParams(emptyOptions)).to.be.equal('');
        });

        it('test constructAdditionalParams with affiliate params', () => {
            const expectedParamWithAffiliate = 'keywords=iphone&categoryId=111&sortOrder=PricePlusShippingLowest&affiliate.trackingId=1234567899&affiliate.networkId=123';
            const expectedParam = 'keywords=iphone&categoryId=111&sortOrder=PricePlusShippingLowest';
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
            const expectedParam = 'keywords=iphone%206s&categoryId=111&sortOrder=PricePlusShippingLowest&itemFilter(0).name=Condition&itemFilter(0).value=3000&itemFilter(1).name=SoldItemsOnly&itemFilter(1).value=true&storeName=addidas%20store';
            const expectedPaginationParam = 'keywords=iphone&categoryId=111&sortOrder=PricePlusShippingLowest&itemFilter(0).name=Condition&itemFilter(0).value=3000&itemFilter(1).name=SoldItemsOnly&itemFilter(1).value=true&paginationInput.entriesPerPage=2';
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

        it('test constructAdditionalParams with Maxprice and Minprice params', () => {
            const expectedParam = 'keywords=iphone%206s&categoryId=111&sortOrder=PricePlusShippingLowest&itemFilter(0).name=Condition&itemFilter(0).value=3000&itemFilter(1).name=SoldItemsOnly&itemFilter(1).value=true&storeName=addidas%20store&itemFilter(2).name=MinPrice&itemFilter(2).value=100.00&itemFilter(2).paramName=Currency&itemFilter(2).paramValue=USD&itemFilter(3).name=MaxPrice&itemFilter(3).value=200.00&itemFilter(3).paramName=Currency&itemFilter(3).paramValue=USD';
            const options = {
                keywords: 'iphone 6s',
                categoryId: '111',
                sortOrder: 'PricePlusShippingLowest',
                Condition: 3000,
                SoldItemsOnly: true,
                storeName: 'addidas store',
                MinPrice: '100.00',
                MaxPrice: '200.00'
            };
            expect(constructAdditionalParams(options)).to.be.equal(expectedParam);
        });

        it('test constructAdditionalParams with Maxprice and Minprice params with diff site', () => {
            const expectedParam = 'keywords=iphone%206s&categoryId=111&sortOrder=PricePlusShippingLowest&itemFilter(0).name=Condition&itemFilter(0).value=3000&itemFilter(1).name=SoldItemsOnly&itemFilter(1).value=true&storeName=addidas%20store&itemFilter(2).name=MinPrice&itemFilter(2).value=100.00&itemFilter(2).paramName=Currency&itemFilter(2).paramValue=GBP&itemFilter(3).name=MaxPrice&itemFilter(3).value=200.00&itemFilter(3).paramName=Currency&itemFilter(3).paramValue=GBP';
            const options = {
                keywords: 'iphone 6s',
                categoryId: '111',
                sortOrder: 'PricePlusShippingLowest',
                Condition: 3000,
                SoldItemsOnly: true,
                storeName: 'addidas store',
                MinPrice: '100.00',
                MaxPrice: '200.00'
            };
            expect(constructAdditionalParams.bind({options: {globalID: 'EBAY-GB'}})(options)).to.be.equal(expectedParam);
        });
    });
});
