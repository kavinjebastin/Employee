"use strict";
const express = require("express");
const {get, put, post, patch, delete: del, listen} = express();
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

get(path.GET.base, (_, response) => {
  handleGET(response, getAllEmployees());
});

// route parameters
get(path.GET.email, (request, response) => {
  handleGetWithRoutePath(
    response,
    getEmployeeByEmail,
    request.params?.email,
    table.email
  );
});

get(path.GET.phoneNumber, (request, response) => {
  handleGetWithRoutePath(
    response,
    getEmployeeByPhoneNumber,
    request.params?.phone,
    "phoneNumber"
  );
});

post(path.POST.addEmployee, (request, response) => {
  handlePOST(request, response);
});

put(path.UPDATE.phoneNumber, (request, response) => {
  handlePUT(request, response);
  // TODO implement this -> change thepath of update while you are at it
});

patch(path.PATCH.phoneNumber, (request, response) => {});

del(path.DELETE.email, (request, response) => {
  handleDELETE(
    response,
    deleteEmployeeByEmail,
    request.params?.email,
    table.email
  );
});

del(path.DELETE.phoneNumber, (request, response) => {
  handleDELETE(
    response,
    deleteEmployeeByPhoneNumber,
    request.params?.contact,
    "phoneNumber"
  );
});

listen(port, () => console.log(`Express is listening on port ${port}`));
