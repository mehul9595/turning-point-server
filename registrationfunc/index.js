const { exectueSQL } = require('../helpers/utils');

registrationAPI = function (context, req) {
    const method = req.method.toLowerCase();
    var payload = null;
    var entry = "Registrations";

    /*
    TODO: 
        1) Get count of registrations
        2) post registration forms
     */
    console.log(req.body);
    switch (method) {
        case "get":
            payload = req.params.id || req.query.id || req.body;
            // TBD
            break;
        case "post":
            payload = req.body;
            break;
    }    

    exectueSQL(context, method, payload);
}

module.exports = registrationAPI;
