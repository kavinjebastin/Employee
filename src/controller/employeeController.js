"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { port, host } = require("./controller-config");
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
const { table } = require("../models/db-config");
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
  UPDATE: {
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

app.get(path.GET.base, (_, response) => {
  handleGET(response, getAllEmployees());
});

// route parameters
app.get(path.GET.email, (request, response, next) => {
  handleGetWithRoutePath(
    response,
    getEmployeeByEmail,
    request.params?.email,
    table.email
  );
  next()
}, () => console.log('next callback function is called'));

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

app.put(path.UPDATE.phoneNumber, (request, response) => {
  handlePUT(request, response);
  // TODO implement this -> change thepath of update while you are at it
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

app.listen(port, () => console.log(`Express is listening on port ${port}`));
