const bcrypt = require('bcryptjs');
const jose = require('jose');
const checkUser = require('../helpers/check.user').checkUser;
const secret = require('../config/jwt.config.js').secret;
const db = require("../models");
const User = db["user"];
const Op = db.Sequelize.Op;

// verify login password and create user token
exports.login = (req, res) => {

  var email = req.body.email;
  var condition = email ? { email: { [Op.eq]: `${email}` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      if (!data) {
        res.status(403).send({ message: "Email or password incorrect" });
      } else {
        if (bcrypt.compareSync(req.body.password, data[0].passwordHash)) {
          var payload = {
            id: data[0].id,
            email: data[0].email
          };
          var token = jose.JWT.sign(payload, secret, { algorithm: "HS256", expiresIn: '24h' })
          res.status(200).send({ token: token });
        } else {
          res.status(403).send({ message: "Email or password incorrect" });
        }
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while logging in."
      });
    });
}

exports.create = (req, res) => {
  createUser(req, res, "admin");
}

exports.register = (req, res) => {
  createUser(req, res, "registration");
}

// Create and Save a new User
function createUser(req, res, context) {

  // context = "registration" || "admin"
  if (context == "admin") {
    checkUser(req, res);
  }

  var passwordHash = "";

  // generate password hash
  if (req.body.password) {
    var salt = bcrypt.genSaltSync(10);
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

  checkUser(req, res);

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

  checkUser(req, res);

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

  checkUser(req, res);

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

  checkUser(req, res);

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

  checkUser(req, res);

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
