const connection = require('../config/db');
module.exports ={
    getUserModel: ()=>{
        return new Promise((resolve, reject)=>{
            connection.query("SELECT * FROM user", (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },
    insertUserModel: (data)=>{
        return new Promise((resolve, reject)=>{
            connection.query("INSERT INTO user SET ?", data, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    updateUserModel: (id, data)=>{
        return new Promise((resolve, reject)=>{
            connection.query("UPDATE user SET ? WHERE id = ?",[data, id], (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },
    deleteUserModel: (id)=>{
        return new Promise((resolve, reject)=>{
            connection.query("DELETE FROM user WHERE id = ?",id,(err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },
    loginUserModel : (data)=>{
        return new Promise((resolve, reject)=>{
            connection.query("SELECT * FROM user WHERE username = ?",data, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    }
}