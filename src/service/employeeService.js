const { addEmployee } = require("../models/employeeRepository");
const { isValidEmployee, isValidParam } = require("../utils/validate");
const HTTP_STATUS_CODE = {
  OK: 200,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

const STATUS_MESSAGE = {
  NOT_FOUND: (data) => `User with ${data} does not exist in the database`,
  BAD_REQUEST: (data) => `Invalid Request, ${data}`,
  DELETE_USER_SUCCESS: (data) => `User with ${data} deleted from the database`,
  DELETE_USER_FAILED: (data) => `User with ${data} could not be deleted`,
};

/**
 * @typedef Employee
 * @param {Function} promise
 * @param {Response} response
 * @returns {void}
 */
const handleGetRequest = (response, promise) => {
  response.contentType("json");
  promise
    .then((data) => {
      if (data) {
        response.statusCode = HTTP_STATUS_CODE.OK;
        response.json(data);
      } else {
        response.statusCode = HTTP_STATUS_CODE.NOT_FOUND;
        response.statusMessage = `Data does not exist in database`;
      }
    })
    .catch((error) => {
      response.statusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
      response.statusMessage = `Error fetching data from database:\n${error.message}`;
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

const handlePostRequest = async (request, response) => {
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
    if (isValidEmployee(employee)) {
      rows = addEmployee(employee);
      response.statusCode = HTTP_STATUS_CODE.OK;
      response.statusMessage = `Data of ${employee.name} added to database successfully`;
    } else {
      response.statusCode = HTTP_STATUS_CODE.BAD_REQUEST;
      response.statusMessage = STATUS_MESSAGE.BAD_REQUEST(
        "Employee Object does not contain the required fields"
      );
    }
  } catch (error) {
    response.status = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
    response.statusMessage = error.message;
  } finally {
    response.end();
  }
};
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
  if (!isValid || ! data) {
    response.statusCode = HTTP_STATUS_CODE.NOT_MODIFIED;
    response.statusMessage = STATUS_MESSAGE.DELETE_USER_FAILED(param);
  }
  response.end();
};

module.exports = {
  handleGetRequest,
  handleGetWithRoutePath,

  handlePostRequest,

  handleDelete,
};
