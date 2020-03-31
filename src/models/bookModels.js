const connection = require('../config/db');
module.exports = {
    getBook : (search)=>{
       return new Promise((resolve, reject)=>{
           if(search){
               connection.query(`SELECT * FROM book WHERE title LIKE ? OR author LIKE ?`,[`%${search}%`, `%${search}%`], (err, result) =>{
                   if(!err){
                       resolve(result)
                   }else{
                       reject(new Error(err))
                   }
               })
           }else{
               connection.query("SELECT * FROM book", (err, result)=>{
                   if(!err){
                       resolve(result)
                   }else{
                       reject(new Error(err))
                   }
               })
           }
       })
    },
    detailBook: (id) =>{
        return new Promise((resolve, reject) =>{
            connection.query("SELECT book.*, category.name_category FROM book INNER JOIN category ON book.id_category = category.id_category WHERE book.id= ?", id, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    insertBookModel: (data)=>{
        return new Promise ((resolve, reject)=>{
            connection.query("INSERT INTO book SET ?",data, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },
    updateBookModel: (id, data)=>{
        return new Promise ((resolve, reject)=>{
            connection.query("UPDATE book SET ? WHERE id= ?",[data, id], (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },
    deleteBookModel: (idanyabroo)=>{
        console.log(idanyabroo)
        return new Promise ((resolve, reject)=>{
            connection.query("DELETE FROM book WHERE id = ?", idanyabroo, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    sortBookModel: (params)=>{
        return new Promise((resolve, reject)=>{
           if(params){
            connection.query(`SELECT book.*, category.name_category FROM book INNER JOIN category ON book.id_category = category.id_category ORDER BY ${params}`, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
           }else{
               connection.query("SELECT * FROM book", (err, result)=>{
                   if(!err){
                       resolve(result);
                   }else{
                       reject(new Error(err));                   }
               })
           }
        })
    },
    pageBookModel: (page, limit)=>{
        const totalPage = parseInt(limit);
        const page1 = page / totalPage;
        const dimulai = totalPage * page - totalPage;

        return new Promise((resolve, reject)=>{
            connection.query("SELECT book.*, category.name_category FROM book INNER JOIN category ON book.id_category = category.id_category ORDER by id LIMIT ? , ?", [dimulai, totalPage], (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    }
}