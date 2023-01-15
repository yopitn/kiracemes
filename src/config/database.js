module.exports = {
  development : {
    DB_NAME : "kiracemes-test",
    DB_USER : "root",
    DB_PASS : "",
    DB_HOST : "localhost"
  },
  production : {
    DB_NAME : process.env.DB_NAME,
    DB_USER : process.env.DB_USER,
    DB_PASS : process.env.DB_PASS,
    DB_HOST : process.env.DB_HOST
  }
}