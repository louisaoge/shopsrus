const express = require('express');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config/db');

require('custom-env').env(true)

// Use Node's default promise instead of Mongoose's promise library
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(config.db, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to the database.');
});

db.on('error', (err) => {
  console.log('Database error: ' + err);
});

console.log('environment', process.env.NODE_ENV);

const app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Token');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);
//app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.json({limit:'50mb'})); 
app.use(express.urlencoded({extended:true, limit:'50mb'}));


// Initialize routes middleware

require("./routes/users")(app);
require("./routes/discounts")(app);
require("./routes/order")(app);

// Use express's default error handling middleware
app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(400).json({ err: err });
});

app.listen(process.env.PORT, () => {
  console.log('Listening on port ' + process.env.PORT);
  console.log('environment ' + process.env.NODE_ENV);
});
