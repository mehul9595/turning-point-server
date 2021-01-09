const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

const exectueSQL = (context, verb, payload) => {

    paramPayload = payload ? JSON.stringify(payload) : "null";

    console.log('executing from executeSQL');

    const name = (paramPayload || "testing");
    console.log(paramPayload);

    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
    context.done();

};


module.exports.exectueSQL = exectueSQL;