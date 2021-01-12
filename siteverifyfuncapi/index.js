const axios = require("axios");

const siteVerifyAPI = function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const { user_response } = req.body;
  const secret = process.env["GOOGLE_CAPTCHA_SECRET"];
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${user_response}`;
  context.log("secret:", secret);
  context.log("response:", user_response);

  const result = axios
    .post(url)
    .then((success) => {
      context.log("completing siteverify api call");
      context.res = {
        body: success.data,
      };
      context.done();
    })
    .catch((err) => {
      context.log("errored siteverify api call");
      context.log(err);
      context.res = {
        status: 500,
        body: "Error on the server.",
      };
    });

  console.log("log the response here", result);

};

module.exports = siteVerifyAPI;
