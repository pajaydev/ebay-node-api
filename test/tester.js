let Ebay = require('../src/index');

let ebay = new Ebay({
    clientID: 'ChaseWal-test-SBX-1bcdef085-6a35b75b',
    clientSecret: 'SBX-bcdef085d25c-9862-4747-ae5b-0d00',
    environment: 'SANDBOX'
});
ebay.getApplicationToken().then((data) => {
    console.log(data); // data.access_token
}, (error) => {
    console.log(error);
});
