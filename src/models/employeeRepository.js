"use strict";
const { config: DB_CONFIG, mysql, table } = require("./db-config");
const connection = mysql.createConnection(DB_CONFIG);

/**
 * @returns {Promise<Employee[]>} - returns all the employee objects present in the database
 */
const getAllEmployees = () => {
  const sql = `
    SELECT * 
    FROM employee`;
  return executeQuery(sql);
};

/**
 * @param {string} name - name of the employee to be fetched, may return more than one employee
 * @returns {Promise<Employee[]>} - promise containing possibly the employee object
 */
const getEmployeesByName = (name) => {
  const sql = `
  SELECT * 
  FROM employee 
  WHERE name = '${name}'
  `;
  return executeQuery(sql);
};

/**
 *
 * @param {string} email - email of the employee to - returns a single employee
 * @returns {Promise<Employee>}
 */
const getEmployeeByEmail = async (email) => {
  const sql = `
    SELECT * 
    FROM employee 
    WHERE email = '${email}'
    `;
  try {
    const data = await executeQuery(sql);
    return data[0];
  } catch (error) {
    return Promise.reject(
      `Employee with email -> ${email} does not exit in database`
    );
  }
};

/**
 * @param {number} phoneNumber - phoneNumber of the employee - returns a single employee
 * @returns {Promise<Employee>}
 */
const getEmployeeByPhoneNumber = async (phoneNumber) => {
  const sql = `
    SELECT * 
    FROM employee 
    WHERE phone_number = ${phoneNumber}
    `;
  const data = await executeQuery(sql);
  return data[0];
};

/**
 * @typedef Employee
 * @author KavinJebastin
 * @description A object containing the details of a single employee
 * @param {Object} this -
 * @param {string} this.name
 * @param {string} this.companyName
 * @param {string} this.role
 * @param {number} this.salary
 * @param {number} this.phoneNumber
 * @param {string} this.email
 * @returns {number} - the number of affected rows
 */
const addEmployee = async ({
  name,
  companyName,
  role,
  salary,
  phoneNumber,
  email,
}) => {
  const sql = `
    INSERT INTO employee (
      name, company_name, role, salary, phone_number, email
    ) VALUES ('${name}', '${companyName}', '${role}', ${salary}, ${phoneNumber}, '${email}')
    `;
  return executeUpdate(sql);
};

const updatePhoneNumber = (email, newPhoneNumber) => {
  const sql = `
    UPDATE employee
    SET phone_number = ${newPhoneNumber}
    WHERE email = '${email}'
  `;
};

/**
 * @param {string} email - email that uniquely identifies the employee to be deleted from the database
 * @returns {number} - number of deleted rows
 */
const deleteEmployeeByEmail = async (email) => {
  const sql = `
    DELETE FROM employee
    WHERE email = '${email}'  
  `;
  return executeUpdate(sql);
};

/**
 * @param {number} phoneNumber - phone number that uniquely identifies the employee to be deleted from the database
 * @returns {number} - the number of rows affected
 */
const deleteEmployeeByPhoneNumber = async (phoneNumber) => {
  const sql = `
    DELETE FROM employee
    WHERE phone_number = ${phoneNumber}  
  `;
  return executeUpdate(sql);
};

/**
 * @param {string} sqlQuery
 * @returns {Promise<number>}
 *
 * TODO: this will be changed soon - so far, this function is just a implementation detail
 */
async function executeUpdate(sqlQuery) {
  const {
    fieldCount,
    affectedRows,
    insertId,
    info,
    serverStatus,
    warningStatus,
    changedRows,
  } = await executeQuery(sqlQuery);
  return affectedRows;
}

/**
 * @param {string} sqlQuery - accepts a sql query string
 * @returns {Promise<Employee>} - a promise with the result data of the query
 */
function executeQuery(sqlQuery) {
  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
module.exports = {
  getAllEmployees,
  getEmployeesByName,
  getEmployeeByEmail,
  getEmployeeByPhoneNumber,

  addEmployee,

  deleteEmployeeByEmail,
  deleteEmployeeByPhoneNumber,
};
