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

const [config, mysql] =
  HOST_OS === "linux"
    ? [linuxConfig, require("mysql")]
    : HOST_OS === "win32"
    ? [windowsConfig, require("mysql2")]
    : null;

module.exports = {
  config,
  mysql,
};
