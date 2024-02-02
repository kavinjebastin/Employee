const express = require("express");
const app = express();
const employeeDAO = require("../models/employeeRepository");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const port = 5500;
const path = {
  base: "/",
  email: "/email/:employee_email",
  phoneNumber: "/phoneNumber/",
  addEmployee: "/add",
};
const HTTP_STATUS_CODE = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
};

app.get(path.base, (_, response) => {
  console.log("get request successful");
  response.contentType("json");
  employeeDAO
    .getAllEmployees()
    .then((data) => {
      response.json(data);
      response.statusCode = HTTP_STATUS_CODE.OK;
    })
    .catch((error) => {
      console.error(error);
      response.statusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
      response.statusMessage = "ERROR fetching data from database";
    })
    .finally(() => {
      response.end();
    });
});
// slug / route parameters
app.get(path.email, (request, response) => {
  const { employee_email: employeeEmail } = request.params;
  if (employeeEmail) {
    employeeDAO
      .getEmployeeByEmail(employeeEmail)
      .then((data) => {
        response.statusCode = HTTP_STATUS_CODE.OK;
        response.json(data);
      })
      .catch((error) => {
        response.statusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
        response.statusMessage = "Error fetching email from database";
        console.log(error);
      })
      .finally(() => {
        response.end();
      });
  }
});

app.post(path.addEmployee, (request, response) => {
  const {
    id,
    name,
    company_name: companyName,
    role,
    salary,
    phone_number: phoneNumber,
    email,
  } = request.body;
  const employee = {
    id,
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
    console.log(error);
    response.status = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
    response.statusMessage = "Error adding data to database";
  } finally {
    response.end();
  }
});

app.listen(port, () =>
  console.log(`Express is listening on http://localhost:${port}`)
);
