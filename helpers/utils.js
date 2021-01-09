const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const TYPES = require("tedious").TYPES;

const exectueSQL = (verb, payload) =>
  new  Promise((resolve, reject) => {
    var result = "";
    const paramPayload = payload != null ? JSON.stringify(payload) : "";
    const query = `[AIA].${verb}_registrations`;

    console.log("executing from executeSQL");

    // setup connection details
    const _connection = new Connection({
      server: process.env["db_server"],
      authentication: {
        type: "default",
        options: {
          userName: process.env["db_user"],
          password: process.env["db_password"],
        },
      },
      options: {
        database: process.env["db_database"],
        encrypt: true,
        validateBulkLoadParameters: true,
      },
    });

    // configure db request
    const _request = new Request(query, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        if (result == "" || result == null || result == "null") result = "[]";
        resolve(result);
      }
    });

    if (typeof payload === "boolean") {
      _request.addParameter("payload", TYPES.Bit, payload, Infinity);
    } else {
      _request.addParameter("payload", TYPES.NVarChar, paramPayload, Infinity);
    }

    _connection.on("connect", (err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        _connection.callProcedure(_request);
      }
    });

    _request.on("row", (columns) => {
      columns.forEach((col) => {
        result += col.value;
      });
    });

    _connection.connect();
  });

exports.exectueSQL = exectueSQL;
