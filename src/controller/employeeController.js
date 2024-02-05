const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { port, host } = require("./controller-config");
const {
  getAllEmployees,
  getEmployeeByEmail,
  deleteEmployeeByEmail,
  getEmployeeByPhoneNumber,
  table,
  deleteEmployeeByPhoneNumber
} = require("../models/employeeRepository");
const {
  handleGetRequest: handleGET,
  handleGetWithRoutePath,
  handlePostRequest: handlePOST,
  handleDelete: handleDELETE
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
  UPDATE: {
    phoneNumber: '/phone/'
  },
  DELETE: {
    email: '/email/:email',
    phoneNumber: '/phone/:contact'
  },
};

app.get(path.GET.base, (_, response) => {
  handleGET(response, getAllEmployees());
});

// route parameters
app.get(path.GET.email, (request, response) => {
  handleGetWithRoutePath(response, getEmployeeByEmail, request.params?.email, table.email);

});

app.get(path.GET.phoneNumber, (request, response) => {
  handleGetWithRoutePath(response, getEmployeeByPhoneNumber, request.params?.phone, 'phoneNumber')
})

app.post(path.POST.addEmployee, (request, response) => {
  handlePOST(request, response);
});

app.put(path.UPDATE, (request, response) => {
  // TODO implement this -> change thepath of update while you are at it
})


app.delete(path.DELETE.email, (request, response) => {
  handleDELETE(response, deleteEmployeeByEmail, request.params?.email, table.email)
})

app.delete(path.DELETE.phoneNumber, (request, response) => {
  handleDELETE(response, deleteEmployeeByPhoneNumber, request.params?.phone, 'phoneNumber')
})

app.listen(port, () => console.log(`Express is listening on port ${port}`));
