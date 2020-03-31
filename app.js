const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const route = require('./src/router/index');
const cors = require('cors');
const mor = require('morgan');

var whitelist = ['http://localhost:1337', 'http://localhost:1338']
var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) == -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(mor('dev'));
app.use(bodyParser.json())
app.use('/api/v1',cors(corsOptions), route);
app.listen(process.env.ADDR_PORT, ()=> console.log('Listening on server http://localhost:'+process.env.ADDR_PORT));