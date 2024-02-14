const HOST_OS = process.platform; // linux | win32

const port = process.argv[2];
const host = process.argv[3];

const controllerConfig = {
  port: port || 5500,
  host: host || "localhost",
};

const linuxConfig = {
  host: "localhost",
  user: "root",
  password: "admin@123",
  database: "people",
};

const windowsConfig = {
  ...linuxConfig,
  password: "admin",
};

const [DB_CONFIG, mysql] = [getDBConfig(HOST_OS), getMysqlLibrary(HOST_OS)];

function getDBConfig(os) {
  if (os === "linux") return linuxConfig;
  if (os === "win32") return windowsConfig;
  return null;
}

function getMysqlLibrary(os) {
  if (os === "linux") return require("mysql2");
  if (os === "win32") return require("mysql2");
  return null;
}
const table = {
  id: "id",
  name: "name",
  companyName: "company_name",
  role: "role",
  salary: "salary",
  phoneNumber: "phone_number",
  email: "email",
};

module.exports = {
  controllerConfig,
  DB_CONFIG,
  mysql,
  table,
};
