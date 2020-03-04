const checkUser = require('../helpers/check.user').checkUser;
const db = require("../models");
const Post = db["post"];
const Op = db.Sequelize.Op;

/*
const post = sequelize.define('post', {
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    userId: Sequelize.UUID
}, {});
*/


// Create and Save a new User
exports.create = (req, res) => {

    checkUser(req, res);

    // Create a User
    const post = {
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId
    };

    // Save Post in the database
    Post.create(post)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            //res.statusCode = 500;
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        });
};

// Retrieve all Posts by a given user from the database.
exports.findAll = (req, res) => {

    checkUser(req, res);

    const userId = req.params.userId;
    var condition = userId ? { userId: { [Op.eq]: `${userId}` } } : null;

    Post.findAll({ where: condition })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Posts."
            });
        });
};

// Find a single Post with an id
exports.findOne = (req, res) => {

    checkUser(req, res);

    const id = req.params.id;

    Post.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Post #" + id + " not found" })
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Update a Post by the id in the request
exports.update = (req, res) => {

    checkUser(req, res);

    const id = req.params.id;

    Post.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Post was updated successfully."
                });
            } else {
                res.status(403).send({
                    message: `Cannot update Post with id=${id}. Post not found or input not valid!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Post with id=" + id
            });
        });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {

    checkUser(req, res);

    const id = req.params.id;

    Post.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Post was deleted successfully!"
                });
            } else {
                res.status(200).send({
                    message: `Cannot delete Post with id=${id}. Post not found?`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Post with id=" + id
            });
        });
};

// Delete all Posts for a given user from the database.
exports.deleteAll = (req, res) => {

    checkUser(req, res);

    const userId = req.query.userId;
    var condition = userId ? { userId: { [Op.eq]: `${userId}` } } : null;

    User.destroy({
        where: condition,
        truncate: false
    })
        .then(nums => {
            res.status(200).send({ message: `${nums} Posts were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Posts."
            });
        });
};
