const { exectueSQL } = require("../helpers/utils");

const parseBool = (params) => {
  return !(
    params === "false" ||
    params === "0" ||
    params === "" ||
    params === undefined
  );
};

const registrationAPI = async function (context, req) {
  const method = req.method.toLowerCase();
  var payload = null;

  const setContext = function (body, status = 200) {
    context.res.status = status;
    context.res.body = body;
    context.done();
  };

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

    await exectueSQL(method, payload)
    .then((ok) => {
      setContext(ok);
    })
    .catch((err) => {
      context.log.error(err);
      setContext("Error while executing SQL statement", 500);
    });
};

exports.registrationAPI = registrationAPI;
