module.exports = (app) => {
    const posts = require("../controllers/post.controller.js");

    // Create a new Post
    app.post("/api/posts/", posts.create);

    // Retrieve all Posts for a user
    app.get("/api/users/:userId/posts", posts.findAll);

    // Retrieve a single post by id
    app.get("/api/posts/:id", posts.findOne);

    // Update a post by id
    app.put("/api/posts/:id", posts.update);

    // Delete a post by id
    app.delete("/api/posts/:id", posts.delete);

    // Delete all posts by userId
    app.delete("/api/users/:userId/posts", posts.deleteAll);
};