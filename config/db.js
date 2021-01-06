// const dotenv = require('dotenv');
// dotenv.config();

require('custom-env').env(true);

var MONGOLAB_URI =  process.env.MONGO_DB;


module.exports = {
  db: MONGOLAB_URI,
};

