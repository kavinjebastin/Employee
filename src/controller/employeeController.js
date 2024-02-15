"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const service = require('../service/service')
const {
  controllerConfig: { host, port },
  table,
} = require("../utils/config");
const {
  getAllEmployees,
  getEmployeeByEmail,
  getEmployeeByPhoneNumber,

  deleteEmployeeByEmail,
  deleteEmployeeByPhoneNumber,
} = require("../models/employeeRepository");
const {
  handleGetRequest: handleGET,
  handleGetWithRoutePath,
  handlePostRequest: handlePOST,
  handlePut: handlePUT,
  handleDelete: handleDELETE,
} = require("../service/employeeService");

app.use(bodyParser.json());

const path = {
  GET: {
    base: "/all",
    email: "/email/:email",
    phoneNumber: "/phone/:phone",
  },
  POST: {
    addEmployee: "/add",
  },
  PUT: {
    phoneNumber: "/phone/",
  },
  PATCH: {
    phoneNumber: "",
  },
  DELETE: {
    email: "/email/:email",
    phoneNumber: "/phone/:contact",
  },
};

app.get(path.GET.base, service.getAllEmployees);

// route parameters
app.get(
  path.GET.email,
  (request, response) => {
    handleGetWithRoutePath(
      response,
      getEmployeeByEmail,
      request.params?.email,
      table.email
    );
  }
);

app.get(path.GET.phoneNumber, (request, response) => {
  handleGetWithRoutePath(
    response,
    getEmployeeByPhoneNumber,
    request.params?.phone,
    "phoneNumber"
  );
});

app.post(path.POST.addEmployee, (request, response) => {
  handlePOST(request, response);
});

app.patch(path.PATCH.phoneNumber, (request, response) => {});

app.delete(path.DELETE.email, (request, response) => {
  handleDELETE(
    response,
    deleteEmployeeByEmail,
    request.params?.email,
    table.email
  );
});

app.delete(path.DELETE.phoneNumber, (request, response) => {
  handleDELETE(
    response,
    deleteEmployeeByPhoneNumber,
    request.params?.contact,
    "phoneNumber"
  );
});

app.listen(port, () =>
  console.log(`Express is listening on port http://${host}:${port}`)
);
