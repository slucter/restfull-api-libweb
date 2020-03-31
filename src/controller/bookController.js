const bookModel = require('../models/bookModels')
const helper = require('../helper/helper')
const connection = require('../config/db');
module.exports = {
    getBook : (req, res) =>{
        const search = req.query.search;
        console.log(req.query)
        bookModel.getBook(search)
        .then((result)=>{
            if(result.length >=1){
                res.status(200).json({
                    status: "200",
                    dataresult : result
    
                })
            }else{
                res.status(404).json({
                    status: "404 NotFound"
                })
            }

        })
        .catch((response)=>{
            console.log(response);
        })
    },
    detailBook: (req, res)=>{
        const idBook = req.params.id_book
        bookModel.detailBook(idBook)
        .then((result) =>{

            if(result.length < 1){
                res.status(200).json({
                    status: "404",
                    message: "Oops like something is NOT FOUND",
                    ID : idBook,
                    result: result
                })
            }else{
                res.status(200).json({
                    status: "200",
                    message: "This is selected row by ID",
                    ID : idBook,
                    result: result
                })
            }
        })
        .catch((response)=>{
            console.log(response);
        })
    },
    insertBook: (req, res)=>{
        const {title, description, image, author, id_category} = req.body;
        const data = {
        title,
        description,
        image,
        author,
        id_category,
       created_at: new Date()
        }
        bookModel.insertBookModel(data)
        .then((result)=>{
            res.status(200).json({
                status: "200",
                message: "Sucess Added Book!",
                result: result
            })
        })
        .catch((response)=>{
            res.status(404).json({
                status: "404",
                message: "Galat! Ada yang Error :("
            })
        })
    },
    updateBook: (req, res)=>{
        const idBook = req.params.id_book
        const { title, description, image, author, id_category } = req.body;
        const data = {
          title,
          description,
          image,
          author,
          id_category,
          created_at: new Date(),
        }
        bookModel.updateBookModel(idBook, data)
        .then((result)=>{
            res.status(200).json({
                status: "200 ok",
                message : "Book Updated!"
            });
        })
        .catch((response)=>{
            console.log(response);
        })

    },
    deleteBook: (req, res)=>{
        const idBook = req.params.id_book
        bookModel.deleteBookModel(idBook)
        .then((result)=>{
            res.send(result)
        })
        .catch(err => console.log(err))
    },
    sortBook: (req, res)=>{
        const params = req.query.by
        console.log(req.query)
        bookModel.sortBookModel(params)
        .then((result)=>{
            res.status(200).json({
                status: "200",
                result: result
            })
        })
        .catch((err)=>{
            res.status(500).json({
                status: "500",
                response: "BAD REQUEST",
                result: err
            })
            console.log(err);
        });
    },
    pageBook: (req, res)=>{
        const page = req.query.page
        const limit = req.query.limit
        connection.query("SELECT COUNT(*) as total FROM book", (err, result)=>{
        let totalData = result[0].total;
        let totalPage = Math.ceil(totalData / limit)
        let nextLink = parseInt(page);
        bookModel.pageBookModel(page, limit)
        .then((result)=>{
            res.status(200).json({
                status: "200",
                page: {
                    totalData : totalData,
                    CurentPage: parseInt(page),
                    limitPage: parseInt(limit),
                    totalPage: totalPage,
                    prevLink: "http://localhost:1337/api/v1/book/page?page="+parseInt(page - 1)+"&limit="+parseInt(limit),
                    nextLink: "http://localhost:1337/api/v1/book/page?page="+(nextLink += 1)+"&limit="+parseInt(limit)
                },
                result: result
            })
        })
        .catch((err)=>{
            res.status(301).json({
                status: "301",
                message: "Mau inject ya!1!1"
            })
            console.log(err);
        });
        
        })
    }
}