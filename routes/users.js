module.exports = app => {
  const users = require("../controllers/user.js");

  var router = require("express").Router();

  // Retrieve a single user with id
  router.get("/all/:id/", users.findOne);

    // Retrieve a single user with name
   router.get("/name/:name/", users.findName);

  // Retrieve all users
  router.get("/all/", users.findAll);

  router.post("/create/", users.create)

  app.use('/api/users', router);
}

