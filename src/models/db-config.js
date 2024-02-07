const HOST_OS = process.platform; // linux | win32

const linuxConfig = {
  host: "localhost",
  user: "root",
  password: "admin@123",
  database: "people",
};

const windowsConfig = {
  ...linuxConfig,
};
windowsConfig.password = "admin";

const [config, mysql] = [getConfig(HOST_OS), getMysql(HOST_OS)];
function getConfig(os) {
  if (os === "linux") return linuxConfig;
  if (os === "win32") return windowsConfig;
  return null;
}

function getMysql(os) {
  if (os === "linux") return require("mysql");
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
  config,
  mysql,
  table,
};
