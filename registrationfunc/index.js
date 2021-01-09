const { exectueSQL } = require('../helpers/utils');

const parseBool = (params) => {
    return !((params === 'false') || (params === '0') || (params === '') || (params === undefined));
}


registrationAPI = function (context, req) {
    const method = req.method.toLowerCase();
    var payload = null;
    /*
    TODO: 
        1) Get count of registrations
        2) post registration forms
     */

    switch (method) {
        case "get":
            payload = parseBool(req.params.all || req.query.all);
            console.log(`'param: ${payload}'`);
            break;
        case "post":
            payload = req.body;
            console.log(`'body: ${payload}'`);
            break;
    }    

    exectueSQL(context, method, payload);
}

module.exports = registrationAPI;
