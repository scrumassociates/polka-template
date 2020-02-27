module.exports = (app) => {
    const tutorials = require("../controllers/tutorial.controller.js");

    // Create a new Tutorial
    app.post("/api/tutorials/", tutorials.create);

    // Retrieve all Tutorials
    app.get("/api/tutorials/", tutorials.findAll);

    // Retrieve all published Tutorials
    app.get("/api/tutorials/published", tutorials.findAllPublished);

    // Retrieve a single Tutorial with id
    app.get("/api/tutorials/:id", tutorials.findOne);

    // Update a Tutorial with id
    app.put("/api/tutorials/:id", tutorials.update);

    // Delete a Tutorial with id
    app.delete("/api/tutorials/:id", tutorials.delete);

    // Create a new Tutorial
    app.delete("/api/tutorials/", tutorials.deleteAll);
};