module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  // Create a new User
  app.post("/api/users/", users.create);

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