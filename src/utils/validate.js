"use strict";
/**
 * @param {string} email
 * @returns {boolean} - true if the email is valid and false if invalid
 */
const isValidEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return !!email.match(regex)?.[0];
};

/**
 * @param {number} phoneNumber
 * @returns {boolean} - true if the number is a valid indian phone number and false otherwise
 */
const isValidPhoneNumber = (phoneNumber) => {
  const regex = /^[6789]\d{9}$/g;
  return !!phoneNumber.match(regex)?.[0];
};
/**
 * @typedef Employee
 * @author KavinJebastin
 * @description A object containing the details of a single employee
 * @param {Object} employee: employee -
 * @param {string} employee.name
 * @param {string} employee.companyName
 * @param {string} employee.role
 * @param {number} employee.salary
 * @param {number} employee.phoneNumber
 * @param {string} employee.email
 * @returns {boolean}
 */
const isValidEmployee = (employee) => {
  for (const [key, value] of Object.entries(employee)) {
    if (
      value == false &&
      key !== "companyName" &&
      key !== "role" &&
      key !== "salary"
    ) {
      return false;
    }
  }
  return true;
};

const isValidParam = (type, value) => {
  const validParams = {
    email: "email",
    phoneNumber: "phoneNumber",
  };

  switch (type) {
    case validParams.email: {
      return isValidEmail(value);
    }
    case validParams.phoneNumber: {
      return isValidPhoneNumber(value);
    }
  }
  return false;
};

module.exports = {
  isValidEmail,
  isValidPhoneNumber,
  isValidEmployee,
  isValidParam,
};
