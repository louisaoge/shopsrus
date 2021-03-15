// models
const User = require('../models/user');
const Order = require('../models/order');

const HttpStatus = require('../config/httpstatus')

module.exports = {
  //Find All Users
  findAllUsers: (req, res) => {
    User.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Users."
        });
      });
  },

  //Find User by Id
  findOneUser: (req, res) => {
    const id = req.params.id;

    User.findById({
        _id: id
      })
      .then(data => {
        if (!data) {
          return res.status(HttpStatus.notFound).json({
            success: false,
            error: `Id does not exist`,
          })
        } else {
          return res.status(HttpStatus.OK).json({
            success: true,
            data: data,
          })
        }

      })
      .catch(err => {
        res.status(HttpStatus.serverError).json({
          success: false,
          error: "Error retrieving user with id=" + id + err
        });
      });
  },

  //Find by name
  findName: (req, res) => {
    const fullname = req.params.name;

    User.findOne({
        full_name: new RegExp(fullname, 'i')
      })
      .then(data => {
        if (!data) {
          return res.status(HttpStatus.notFound).json({
            success: false,
            error: `Name does not exist`,
          })
        } else {
          return res.status(HttpStatus.OK).json({
            success: true,
            data: data,
          })
        }
      })
      .catch(err => {
        res.status(HttpStatus.serverError).json({
          success: false,
          error: "Error retrieving user with name=" + fullname
        });
      });
  },

  createUser: (req, res) => {
    var UserData = new User(req.body);

    UserData.save()
      .then(function (user, err) {
        if (err) {
          return res.status(HttpStatus.serverError).json({
            success: false,
            msg: err,
          });
        }
        if (user) {
          return res.status(HttpStatus.OK).json({
            success: true,
            data: user,
          });
        }

      })
      .catch(err => {
        res.status(HttpStatus.serverError).json({
          success: false,
          error: err
        });
      });
  },

  //Find by name
  findTypeByName: (req, res) => {
    const fullname = req.params.name;

    User.findOne({
        full_name: fullname
      }).select('type')
      .then(data => {
        if (!data) {
          return res.status(HttpStatus.notFound).json({
            success: false,
            error: 'Name does not exist',
          })
        } else {
          return res.status(HttpStatus.OK).json({
            success: true,
            data: data,
          })
        }
      })
      .catch(err => {
        res.status(HttpStatus.serverError).json({
          success: false,
          error: "Error retrieving user type with name=" + fullname
        });
      });
  },


}