const Ebay = require('../src/index');
const { clientId, clientSecret } = require('./credentials/index');

let ebay = new Ebay({
    clientID: clientId,
    clientSecret: clientSecret,
});

ebay.getApplicationToken()
    .then((data) => {
        console.log("generate tokensss");
        console.log(data);
    });

console.log("++++++++++++++++++++");

ebay.getApplicationToken()
    .then((data) => {
        console.log("generate tokensss");
        console.log(data);
    });


setTimeout(() => {
    ebay.getApplicationToken()
        .then((data) => {
            console.log("generate tokensss");
            console.log(data);
        });
}, 7200);