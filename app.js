const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const route = require('./src/router/index');
const cors = require('cors');
const mor = require('morgan');

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use('/upload', express.static('./upload'));
app.use(mor('dev'));
app.use(bodyParser.json())
app.use('/api/v1',cors(), route);
app.listen(process.env.ADDR_PORT, ()=> console.log('Listening on server http://localhost:'+process.env.ADDR_PORT));