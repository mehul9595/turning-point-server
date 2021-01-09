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
    console.log(req.params);
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

// module.exports = async function (context, req) {
//     context.log('JavaScript HTTP trigger function processed a request.');

//     const name = (req.query.name || (req.body && req.body.name));
//     const responseMessage = name
//         ? "Hello, " + name + ". This HTTP triggered function executed successfully."
//         : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

//     context.res = {
//         // status: 200, /* Defaults to 200 */
//         body: responseMessage
//     };
// }