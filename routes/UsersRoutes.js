const UsersController = require('../controllers/UsersController');

function UsersRoutes(app) {
    app.get('/users', UsersController.find);
    app.get('/users/:id', UsersController.findOne);
};

module.exports = UsersRoutes;
