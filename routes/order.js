module.exports = app => {
    const orders = require("../controllers/order.js");
  
    var router = require("express").Router();
  
    // Retrieve order summary
    router.get("/ordersum/", orders.get_order_summary);

    app.use('/api/orders', router);
  }
  
  