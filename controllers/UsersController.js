const UsersController = {
    find: (req, res) => {
        var users = [
            { id: 1, email: "user1@mail.com" },
            { id: 2, email: "user2@mail.com" },
        ]
        res.statusCode = 200;
        res.end(JSON.stringify(users));
    },
    findOne: (req, res) => {
        var user = {
            id: req.params.id,
            email: `user${req.params.id}@mail.com`,
        }
        res.statusCode = 404;
        res.end(JSON.stringify(user));
    }
};

module.exports = UsersController;