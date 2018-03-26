const Ebay = require('../src/index');

let ebay = new Ebay({
    clientID: "--Client Id----",
    clientSecret: '-- Client Secret --',
    body: {
        grant_type: "client_credentials"
    }
});
ebay.getAccessToken().then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});