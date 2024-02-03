const express = require("express");
const app = express();
const employeeDAO = require("../models/employeeRepository");
const bodyParser = require("body-parser");
const { port, host } = require("./controller-config");

app.use(bodyParser.json());

const path = {
  GET: {
    base: "/all",
    email: "/email/:email",
    phoneNumber: "/phoneNumber/:contact",
  },
  POST: {
    addEmployee: "/add",
  },
  UPDATE: {},
  DELETE: {},
};
const HTTP_STATUS_CODE = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  NOT_MODIFIED: 304,
  SERVICE_UNAVIALABLE: 503,
};

const STATUS_MESSAGE = {};

app.get(path.GET.base, (_, response) => {
  response.contentType("json");
  employeeDAO
    .getAllEmployees()
    .then((data) => {
      response.json(data);
      response.statusCode = HTTP_STATUS_CODE.OK;
    })
    .catch((error) => {
      response.statusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
      response.statusMessage = `ERROR fetching data from database \n ${error.message}`;
    })
    .finally(() => {
      response.end();
    });
});
// route parameters
app.get(path.GET.email, (request, response) => {
  const { email } = request.params;
  if (email) {
    employeeDAO
      .getEmployeeByEmail(email)
      .then((data) => {
        response.json(data);
        response.statusCode = HTTP_STATUS_CODE.OK;
      })
      .catch((error) => {
        response.statusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
        response.statusMessage = `Error fetching email from database -> \n${error.message}`;
      })
      .finally(response.end);
  }
});

app.post(path.POST.addEmployee, (request, response) => {
  const {
    name,
    company_name: companyName,
    role,
    salary,
    phone_number: phoneNumber,
    email,
  } = request.body;

  const employee = {
    name,
    companyName,
    role,
    salary,
    phoneNumber,
    email,
  };
  try {
    employeeDAO.addEmployee(employee);
    response.status = HTTP_STATUS_CODE.OK;
    response.statusMessage = "Employee added to database successfully";
  } catch (error) {
    response.status = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
    response.statusMessage = error.message;
  } finally {
    response.end();
  }
});

app.listen(port, () => console.log(`Express is on `));

/**
 * @param {Function(any):Promise} callback
 * @param {Express.Response} response
 * @param {*} [arg]
 * @returns {void}
 */
function handleGetRequest(response, callback, arg) {
  response.contentType('json')
  callback(arg)
    .then((result) => {
      response.statusCode = HTTP_STATUS_CODE.OK;
      response.json(result);
    })
    .catch((err) => {
      response.statusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
      response.statusMessage = err.message;
    })
    .finally (response.end);
}
