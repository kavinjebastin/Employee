"use strict";
const { addEmployee } = require("../models/employeeRepository");
const { isValidEmployee, isValidParam } = require("../utils/validate");
const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

const STATUS_MESSAGE = {
  NOT_FOUND: (data) => `User with ${data} does not exist in the database`,
  BAD_REQUEST: (data) => `Invalid Request, ${data}`,
  INTERNAL_SERVER_ERROR: (message) =>
    `Error fetching data from database:\n${message}`,
  DELETE_USER_SUCCESS: (data) => `User with ${data} deleted from the database`,
  DELETE_USER_FAILED: (data) => `User with ${data} could not be deleted`,
  CONFLICTING_DATA: (user) =>
    `Data of ${user} conflicts with existing user data in database`,
  POST_FAILED: (user) => `unable to add ${user} to database`,
  POST_SUCCESS: (name) => `Data of ${name} added to database successfully`,
};

/**
 * @typedef Employee
 * @param {Function} promise
 * @param {Response} response
 * @returns {void}
 */
const handleGetRequest = (response, promise) => {
  response.contentType("application/json");
  promise
    .then((data) => {
      if (data) {
        response.statusCode = HTTP_STATUS_CODE.OK;
        response.json(data);
      } else {
        response.statusCode = HTTP_STATUS_CODE.NOT_FOUND;
        response.statusMessage = STATUS_MESSAGE.NOT_FOUND("given data");
      }
    })
    .catch((error) => {
      response.statusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
      response.statusMessage = STATUS_MESSAGE.INTERNAL_SERVER_ERROR(
        error?.message
      );
    })
    .finally(() => {
      response.end();
    });
};

const handleGetWithRoutePath = (response, callback, param, type) => {
  if (isValidParam(type, param)) {
    handleGetRequest(response, callback(param));
  } else {
    response.statusCode = HTTP_STATUS_CODE.BAD_REQUEST;
    response.statusMessage = STATUS_MESSAGE.BAD_REQUEST(
      `There is some problem with the ${type}, please check -> ${param}`
    );
    response.end();
  }
};

const handlePostRequest = (request, response) => {
  const employee = getEmployee(request.body);
  if (isValidEmployee(employee)) {
    addEmployee(employee)
      .then((data) => {
        if (data) {
          response.statusCode = HTTP_STATUS_CODE.CREATED;
          response.statusMessage = STATUS_MESSAGE.POST_SUCCESS(employee.name);
        }
      })
      .catch((error) => {
        const duplicateEntryInDatabase = "ER_DUP_ENTRY";
        if (error?.code === duplicateEntryInDatabase) {
          response.statusCode = HTTP_STATUS_CODE.CONFLICT;
          response.statusMessage = STATUS_MESSAGE.CONFLICTING_DATA(
            employee.name
          );
        } else {
          response.statusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
          response.statusMessage = STATUS_MESSAGE.POST_FAILED(employee.name);
        }
      })
      .finally(() => response.end());
  } else {
    response.statusCode = HTTP_STATUS_CODE.BAD_REQUEST;
    response.statusMessage = STATUS_MESSAGE.BAD_REQUEST(
      "Employee Object does not contain the required fields"
    );
    response.end();
  }
};

const handlePut = async () => {};

const handleDelete = async (response, callback, param, type) => {
  const isValid = isValidParam(type, param);
  let data;
  if (isValid) {
    data = await callback(param);
    if (data) {
      response.statusCode = HTTP_STATUS_CODE.OK;
      response.statusMessage = STATUS_MESSAGE.DELETE_USER_SUCCESS(param);
    }
  }
  if (!isValid || !data) {
    response.statusCode = HTTP_STATUS_CODE.NOT_MODIFIED;
    response.statusMessage = STATUS_MESSAGE.DELETE_USER_FAILED(param);
  }
  response.end();
};

function getEmployee(body) {
  const {
    name,
    company_name: companyName,
    role,
    salary,
    phone_number: phoneNumber,
    email,
  } = body;
  return {
    name,
    companyName,
    role,
    salary,
    phoneNumber,
    email,
  };
}

module.exports = {
  handleGetRequest,
  handleGetWithRoutePath,

  handlePostRequest,

  handlePut,

  handleDelete,
};
