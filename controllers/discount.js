// models
const Discount = require('../models/discount');
const HttpStatus = require('../config/httpstatus')

module.exports = {
  //Find All Discounts
  findAll: (req, res) => {
    Discount.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Discounts."
        });
      });
  },


  //Find discount by type
  findType: (req, res) => {
    const type = req.params.type;

    Discount.findOne({ discount_type: new RegExp(type, 'i')})
      .then(data => {
        if (!data) {
          return res.status(HttpStatus.notFound).json({
            success: false,
            error: `Discount type does not exist`,
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
          error: "Error retrieving discount type =" + type
        });
      });
  },

  create: (req, res) => {
    var DiscountData = new Discount(req.body);

    DiscountData.save()
    .then(function (data, err) {
      if (err) {
        return res.status(HttpStatus.serverError).json({
          success: false,
          msg: err,
        });
      }
      if (data) {
        return res.status(HttpStatus.OK).json({ 
          success: true, 
          data: data, 
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