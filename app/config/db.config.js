module.exports = {
  forceSync: true,
  HOST: "",
  USER: "",
  PASSWORD: "",
  DB: "",
  dialect: "sqlite",
  storage: "./app/data/db.sqlite",
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
  }
};

/*
  HOST: "localhost",
  USER: "root",
  PASSWORD: "123456",
  DB: "testdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
*/