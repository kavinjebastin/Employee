const mysql = require("mysql");


const dbConfig = {
    host: "localhost",
    user: "root",
    password: "admin@123",
    database: "people",
}
const connection = mysql.createConnection(dbConfig);

connection.connect((error) => {
    console.log(error ? error : `connected successfully to database : ${dbConfig.database}`)
});

exports.getAllEmployees = () => {
    let allEmployees = null;
    connection.query( )

}