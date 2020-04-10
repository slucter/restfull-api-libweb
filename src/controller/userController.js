const userModel = require('../models/userModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports ={
    getUser: (req, res)=>{
        userModel.getUserModel()
        .then((result)=>{
            res.status(200).json({
                status: "200 OK",
                message: "Selected ALL row & column from table book",
                result: result
            })
        })
        .catch((response)=>{
            console.log(response);
        })
    },
    insertUser: (req, res)=>{
        
        bcrypt.hash(req.body.password, 10, (err, hash)=>{
            if(err){
                return res.status(500).json({
                    error : err
                })
            }else{
                const {username, email, fullname, address, photo,role_id, token, salt,phone, status} = req.body
                const data = {
                    username,
                    email,
                    password : hash,
                    fullname,
                    address,
                    photo,
                    role_id, 
                    created_at: new Date(),
                    token,
                    salt,
                    phone, 
                    status
                }
                userModel.loginUserModel(data.username)
                .then((result)=>{
                    if(result.length >= 1){
                        return res.status(409).json({
                            message: "User username exist!"
                        })
                    }else{

                        userModel.insertUserModel(data)
                        .then((result)=>{
                            res.status(200).json({
                                message: "User created!"
                            });
                        })
                         .catch((response)=>{
                            console.log(response)
                        })

                    }
                })
                .catch((response)=>{
                    console.log(response);
                })
            }
        })

    },
    updateUser: (req, res)=>{
        const idupdate = req.params.id_update
        const {email, username, password} = req.body
        const data ={
            email,
            username,
            password
        }
        userModel.updateUserModel(idupdate, data)
        .then((result)=>{
            res.status(200).json({
                message: "User data UPDATED!"
            })
        })
        .catch((response)=>{
            console.log(response);
        })
    },
    deleteUser: (req, res)=>{
        const idDel = req.params.id_delete
        userModel.deleteUserModel(idDel)
        .then((result)=>{
            res.status(200).json({
                message: "User ID : "+idDel+" Succesfull deleted!"
            })
        })
        .catch((response)=>{
            console.log(response);
        })
    },
    loginUser: (req, res)=>{
        const {username, password} = req.body
        const data = {
            username,
            password
        }
        userModel.loginUserModel(data.username)
        .then((result)=>{
            
            // let datauser = result[0];
            // let tokenw = jwt.sign({ id: result[0].id, email: result[0].email }, process.env.SECRET_KEY);
            // delete datauser.password;
            // datauser.token = tokenw;
            // res.header('auth-token', tokenw).send(tokenw);



            if(result.length >= 1){
                bcrypt.compare(data.password, result[0].password, (err, reshash)=>{
                    if(reshash){
                        // res.status(200).json({
                        //     status: "200",
                        //     message: "Login sukses !",
                        //     result: result
                        // })
                        let datauser =  result[0];
                        let tokenw = jwt.sign({ id: datauser.id, email: datauser.email}, process.env.SECRET_KEY);
                        delete datauser.password;
                        datauser.token = tokenw;
                        res.send(datauser);

                    }else{
                        res.status(401).json({
                            status: "401",
                            message: "Login Gagal !"
                        })
                    }
                    // console.log(err);
                    // console.log(data.password)
                })
            }else{
                res.status(401).json({
                    status: "401",
                    message: "User Not Found!"
                })
            }
        })
        .catch((response)=>{
            res.status(400).json({
                status: "400",
                message: "BAD REQUEST",
                response: response
            })
            console.log(response)
        })
    }

}