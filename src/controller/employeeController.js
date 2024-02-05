const express = require("express");
const app = express();
const employeeDAO = require("../models/employeeRepository");
const bodyParser = require("body-parser");
const { port, host } = require("./controller-config");
const { handleGetRequest } = require("../service/employeeService");

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


const STATUS_MESSAGE = {
  NOT_FOUND: (data) => `${data} does not exist in the database`,
};

app.get(path.GET.base, (_, response) => {
  handleGetRequest(response, employeeDAO.getAllEmployees());
});
// route parameters
app.get(path.GET.email, (request, response) => {
  const { email } = request.params;
  if (email) {
    handleGetRequest(response, employeeDAO.getEmployeeByEmail(email));
  } else {
    response.statusCode = HTTP_STATUS_CODE.NOT_FOUND;
    response.statusMessage = STATUS_MESSAGE.NOT_FOUND("Email");
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

module.exports = {
  path,
  app, 
  HTTP_STATUS_CODE
}
