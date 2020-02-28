const tutorialRoutes = require('./tutorial.routes.js');
const userRoutes = require('./user.routes.js');

module.exports = (app) => {
    tutorialRoutes(app);
    userRoutes(app);
};
