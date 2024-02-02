const mysql = require("mysql");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "admin@123",
  database: "people",
};
const connection = mysql.createConnection(dbConfig);

/**
 * @returns {Promise} - returns all the employee objects present in the database
 */
const getAllEmployees = () => {
  const sql = `
    SELECT * 
    FROM employee`;
  return executeQuery(sql);
};
/**
 * @param {number} id - accepts a numerical id and returns a promise possibly containing a single employee object
 */
const getEmployeeById = async (id) => {
  const sql = `
        SELECT * 
        FROM employee 
        WHERE id = ${id}`;
  const data = await executeQuery(sql);
  return data[0];
};
/**
 * @param {string} name - name of the employee to be fetched, may return more than one employee
 * @returns {Promise} - promise containing possibly the employee object
 */
const getEmployeeByName = (name) => {
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
 * @returns {Promise}
 */
const getEmployeeByEmail = async (email) => {
  const sql = `
    SELECT * 
    FROM employee 
    WHERE email = '${email}'
    `;
  const data =  await executeQuery(sql);
  return data[0]
};

/**
 *
 * @param {number} phoneNumber - phoneNumber of the employee - returns a single employee
 * @returns {Promise}
 */
const getEmployeeByPhoneNumber = async (phoneNumber) => {
  const sql = `
    SELECT * 
    FROM employee 
    WHERE email = '${phoneNumber}'
    `;
  const data =  await executeQuery(sql);
  return data[0]
};


/**
 * @param {Object} employee - object containing name, companyname, role, salary, phoneNumber and email of a single employee
 * @returns {void}
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
  executeUpdate(sql);
};

/**
 * @param {number} id - id that uniquely identifies the employee to be deleted from the database
 * @returns {void}
 */
const deleteEmployeeById = async (id) => {
  const sql = `
    DELETE FROM employee
    WHERE id = ${id}  
  `;
  executeUpdate(sql);
};
/**
 * @param {string} email - email that uniquely identifies the employee to be deleted from the database
 * @returns {void}
 */
const deleteEmployeeByEmail = async (email) => {
  const sql = `
    DELETE FROM employee
    WHERE email = '${email}'  
  `;
  executeUpdate(sql);
};

/**
 * @param {number} id - phone number that uniquely identifies the employee to be deleted from the database
 * @returns {void}
 */
const deleteEmployeeByPhoneNumber = async (phoneNumber) => {
  const sql = `
    DELETE FROM employee
    WHERE phone_number = ${phoneNumber}  
  `;
  executeUpdate(sql);
};

/**
 * so far, this function is just a implementation detail,
 * TODO: this will be changed soon
 */
function executeUpdate(sqlQuery) {
  executeQuery(sqlQuery)
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

/**
 * @param {string} sqlQuery - accepts a sql query string
 * @returns {Promise} - a promise with the result data of the query
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
  getEmployeeById,
  getEmployeeByName,
  getEmployeeByEmail,
  getEmployeeByPhoneNumber,

  addEmployee,

  deleteEmployeeById,
  deleteEmployeeByEmail,
  deleteEmployeeByPhoneNumber,
};
