module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "qwer1234",
    DB: "employee",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };