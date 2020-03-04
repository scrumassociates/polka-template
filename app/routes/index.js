const tutorialRoutes = require('./tutorial.routes.js');
const userRoutes = require('./user.routes.js');
const postRoutes = require('./post.routes.js');

module.exports = (app) => {
    tutorialRoutes(app);
    userRoutes(app);
    postRoutes(app);
};
