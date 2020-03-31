const express = require('express');
const Router = express.Router();
const cors = require('cors');
const bookController = require('../controller/bookController')
var whitelist = ['http://localhost:1337', 'http://localhost:1338']
var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

Router  
    .get("/",cors(corsOptions),bookController.getBook)
    .post('/', bookController.insertBook)
    .get('/page', bookController.pageBook)
    .get('/sort', bookController.sortBook)
    .get('/:id_book', bookController.detailBook)
    .patch('/:id_book', bookController.updateBook)
    .delete('/:id_book', bookController.deleteBook)


module.exports = Router;