module.exports = app => {
    const discounts = require("../controllers/discount.js");
  
    var router = require("express").Router();
  
      // Retrieve a single discount by type
     router.get("/type/:type/", discounts.findType);
  
    // Retrieve all discounts
    router.get("/all/", discounts.findAll);
  
    //Create new discount
    router.post("/create/", discounts.create)
  
    app.use('/api/discounts', router);
  }
  
  