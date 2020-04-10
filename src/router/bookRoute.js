const express = require('express');
const Router = express.Router();
const cors = require('cors');
const bookController = require('../controller/bookController')
const multer =require('multer');
const auth = require('../helper/auth');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './upload');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() +file.originalname)
  }
});
  const upload = multer({
    storage
  });

Router  
    .get("/",auth.verify,bookController.getBook)
    .post('/',upload.single('image'), bookController.insertBook)
    .get('/page', bookController.pageBook)
    .get('/sort', bookController.sortBook)
    .get('/:id_book', bookController.detailBook)
    .patch('/:id_book', bookController.updateBook)
    .delete('/:id_book', bookController.deleteBook)


module.exports = Router;