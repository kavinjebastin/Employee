const { app, path } = require("../controller/employeeController");
const { HTTP_STATUS_CODE } = require("../controller/employeeController");
const employeeDAO = require("../models/employeeRepository");

/**
 * @typedef Employee
 * @param {Promise<Employee[]>} callback
 * @param {Response} response
 * @returns {void}
 */
function handleGetRequest(response, callback) {
  response.contentType("json");
  callback
    .then((data) => {
      response.statusCode = HTTP_STATUS_CODE.OK;
      response.json(data);
    })
    .catch((error) => {
      response.statusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
      response.statusMessage = `Error fetching data from database:\n${error.message}`;
    })
    .finally(() => {
      response.end();
    });
}

function handlePostRequest(request, response) {
    // todo : implement this
}
module.exports = {
    handleGetRequest
}
