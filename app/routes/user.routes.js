module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  // Get a login token
  app.post("/api/users/login", users.login);

  // Create a new User
  app.post("/api/users/", users.create);

  // Register as a new User
  app.post("/api/users/register", users.register);

  // Retrieve all User
  app.get("/api/users/", users.findAll);

  // Retrieve a single User with id
  app.get("/api/users/:id", users.findOne);

  // Update a User with id
  app.put("/api/users/:id", users.update);

  // Delete a User with id
  app.delete("/api/users/:id", users.delete);

  // Create a new User
  app.delete("/api/users/", users.deleteAll);
};