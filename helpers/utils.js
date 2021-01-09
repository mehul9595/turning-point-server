const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const exectueSQL = (context, verb, payload) => {
    var result = "";
    paramPayload = payload ? JSON.stringify(payload) : "";

    console.log('executing from executeSQL');

    // setup connection details
    const _connection = new Connection({
        server: process.env["db_server"],
        authentication : {
            type: 'default',
            options: {
                userName: process.env["db_user"],
                password: process.env["db_password"]
            }
        },
        options: {
            database: process.env["db_database"],
            encrypt: true,
            validateBulkLoadParameters: true
        }        
    });

    // configure db request
    const _request = new Request('[AIA].post_registrations', (err) => {
        if (err)
        {
            context.res.status = 500;
            context.res.body = err; // chanage this to error message
            console.log(err);
        }
        else {
            context.res = {
                body: result,
                status: 200
            }
        }
        context.done(); // completes functions and return to the client
    });
    if (paramPayload)
        _request.addParameter('payload', TYPES.NVarChar, paramPayload, Infinity);

    _connection.on('connect', (err) => {
        if (err)
        {
            context.res.status = 500;
            context.res.body = err; // chanage this to error message
            console.log(err);
            context.done(); // completes functions and return to the client
        }
        else {
            _connection.callProcedure(_request);
        }
    });

    _request.on('row', columns => {
        columns.forEach(col => {
            result += col.value;
        });
    });

    _connection.connect();


};


module.exports.exectueSQL = exectueSQL;