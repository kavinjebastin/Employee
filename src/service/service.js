const EmployeeDAO = require("../models/employeeRepository");
const {isValidEmail} = require('../utils/validate')
const {
  HTTP_STATUS_CODE,
  STATUS_MESSAGE,
} = require("../service/employeeService");

const getAllEmployees = (_, response) => {
  return getEmployee(response, EmployeeDAO.getAllEmployees);
};
/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
const getEmployeeByEmail = (request, response) => {
    const email = request.params?.email;
    if (!isValidEmail(email)) {
        response.statusCode = HTTP_STATUS_CODE.BAD_REQUEST;
        response.statusMessage = STATUS_MESSAGE.BAD_REQUEST(
          `There is some problem with the ${type}, please check -> ${param}`
        );
        return response.end();
    }
    return getEmployee(response, EmployeeDAO.getEmployeeByEmail, email)
};
/**
 * @param {Express.Response} response 
 */
function getEmployee(response, callback, ...args) {
  response.contentType("application/json");
  callback(...args)
    .then((data) => {
      if (data) {
        response.status(HTTP_STATUS_CODE.OK).json(data);
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
    .finally(() => response.end());
}

module.exports = {
  getAllEmployees,
};
