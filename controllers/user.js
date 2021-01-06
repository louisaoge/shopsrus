// models
const User = require('../models/user');
const HttpStatus = require('../config/httpstatus')

module.exports = {
  //Find All Users
  findAll: (req, res) => {
    User.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
  },

  //Find User by Id
  findOne: (req, res) => {
    const id = req.params.id;

    User.findById({ _id: id })
      .then(data => {
        if (!data) {
          return res.status(HttpStatus.notFound).json({
            success: false,
            error: `Id does not exist`,
          })
        }

        else {
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

    User.findOne({ full_name: new RegExp(fullname, 'i')})
      .then(data => {
        if (!data) {
          return res.status(HttpStatus.notFound).json({
            success: false,
            error: `Name does not exist`,
          })
        }
        else {
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

  create: (req, res) => {
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

}