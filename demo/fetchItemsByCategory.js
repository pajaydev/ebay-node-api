const Ebay = require('../src/index');
const { clientId } = require('./credentials');

let ebay = new Ebay({
    clientID: clientId,
    limit: 6
});
ebay.findItemsByCategory(10181).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});
