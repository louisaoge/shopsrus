module.exports = app => {
  const users = require("../controllers/user.js");

  var router = require("express").Router();

  // Retrieve a single user with id
  router.get("/all/:id/", users.findOneUser);

    // Retrieve a single user with name
   router.get("/name/:name/", users.findName);

  // Retrieve all users
  router.get("/all/", users.findAllUsers);

  router.post("/create/", users.createUser)

  app.use('/api/users', router);
}

