let { getRequest, makeRequest, base64Encode } = require('./request');

const getItem = function (itemId) {
    if (!itemId) throw new Error("Item Id is required");
    if (!this.options.access_token) throw new Error("Missing Access token, Generate access token");
    const auth = "Bearer " + this.options.access_token;
    const id = encodeURIComponent(itemId);
    return makeRequest('api.ebay.com', `/buy/browse/v1/item/${id}`, 'GET', this.options.body, auth).then((result) => {
        let resultJSON = JSON.parse(result);
        //this.setAccessToken(resultJSON);
        return resultJSON;
    });
};

const getItemByLegacyId = function (legacyOptions) {
    if (!legacyOptions) throw new Error("Error Required input to get Items By LegacyID");
    if (!this.options.access_token) throw new Error("Missing Access token, Generate access token");
    if (!legacyOptions.legacyItemId) throw new Error("Error Legacy Item Id is required");
    const auth = "Bearer " + this.options.access_token;
    let param = "legacy_item_id=" + legacyOptions.legacyItemId;
    param += legacyOptions.legacyVariationSku ? "&legacy_variation_sku=" + legacyOptions.legacyVariationSku : '';

    makeRequest('api.ebay.com', `/buy/browse/v1/item/get_item_by_legacy_id?${param}`, 'GET', this.options.body, auth).then((result) => {
        let resultJSON = JSON.parse(result);
        return resultJSON;
    }).then((error) => {
        console.log(error.errors);
        console.log("Error Occurred ===> " + error.errors[0].message);
    });
};

const getItemByItemGroup = function (itemGroupId) {
    if (typeof itemGroupId == "object") throw new Error("Expecting String or number (Item group id)");
    if (!itemGroupId) throw new Error("Error Item Group ID is required");
    if (!this.options.access_token) throw new Error("Missing Access token, Generate access token");
    const auth = "Bearer " + this.options.access_token;
    return new Promise((resolve, reject) => {
        makeRequest('api.ebay.com', `/buy/browse/v1/item/get_items_by_item_group?item_group_id=${itemGroupId}`, 'GET', this.options.body, auth).then((result) => {
            resolve(result);
        });
    })
};

const searchItems = function (searchConfig) {
    if (!searchConfig) throw new Error("Error --> Missing or invalid input parameter to search");
    if (!searchConfig.keyword && !searchConfig.categoryId) throw new Error("Error --> Keyword or category id is required in query param");
    if (!this.options.access_token) throw new Error("Error -->Missing Access token, Generate access token");
    const auth = "Bearer " + this.options.access_token;
    let queryParam = searchConfig.keyword ? "q=" + searchConfig.keyword : "";
    queryParam = queryParam + (searchConfig.categoryId ? "&category_ids=" + searchConfig.categoryId : '');
    queryParam = queryParam + (searchConfig.limit ? "&limit=" + searchConfig.limit : "");
    if (searchConfig.fieldgroups != undefined) queryParam = queryParam + "&fieldgroups=" + searchConfig.fieldgroups.toString();
    if (searchConfig.filter != undefined) queryParam = queryParam + "&filter=" + JSON.stringify(searchConfig.filter).replace(/[{}]/g, "");
    console.log(queryParam);
    return new Promise((resolve, reject) => {
        makeRequest('api.ebay.com', `/buy/browse/v1/item_summary/search?${queryParam}`, 'GET', this.options.body, auth).then((result) => {
            resolve(result);
        });
    });
};

module.exports = {
    getItem,
    getItemByLegacyId,
    getItemByItemGroup,
    searchItems
}
