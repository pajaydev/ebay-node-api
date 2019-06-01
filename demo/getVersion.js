const Ebay = require('../src/index');
const { clientId, clientSecret } = require('./credentials');

let ebay = new Ebay({
    clientID: clientId,
    limit: 6
});
ebay.getVersion().then((data) => {
    console.log(data.version);
}, (error) => {
    console.log(error);
});




