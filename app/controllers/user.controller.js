const bcrypt = require('bcryptjs');
const db = require("../models");
const User = db["user"];
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {

  var passwordHash = "";

  // generate password hash
  if (req.body.password) {
    var salt = bcrypt.getSaltSync(10);
    passwordHash = bcrypt.hashSync(req.body.password, salt);
  }

  // Create a User
  const user = {
    email: req.body.email,
    passwordHash: passwordHash
  };

  // Save Tutorial in the database
  User.create(user)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      //res.statusCode = 500;
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

  console.log(db["tutorial"]);
  console.log(db["user"]);

  const email = req.query.email;
  var condition = email ? { email: { [Op.eq]: `${email}` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "User #" + id + " not found" })
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

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "User was updated successfully."
        });
      } else {
        res.status(403).send({
          message: `Cannot update User with id=${id}. User not found or input not valid!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "User was deleted successfully!"
        });
      } else {
        res.status(200).send({
          message: `Cannot delete User with id=${id}. User not found?`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.status(200).send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};
