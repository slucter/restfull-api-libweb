const express = require('express');
const book = require('./bookRoute');
const user = require('./userRoute')
const loan = require('./loanRoute')
const Router = express.Router();

Router.use('/book', book)
      .use('/user', user)
      .use('/loan', loan)
      .use('/what', (req, res)=>{
            res.status(200).json({
                  what1: "RESTFUL API",
                  respon1 : {
                        result1: "adalah suatu arsitektur metode komunikasi yang menggunakan protokol HTTP untuk pertukaran data dan metode ini sering diterapkan dalam pengembangan aplikasi."
                  },
                  what2: "URL Design",
                  respon2 : {
                        result2: "Penamaan dan struktur URL yang konsisten akan menghasilkan API yang baik dan mudah untuk dimengerti developer. URL API biasa disebut endpoint dalam pemanggilannya."
                  },
                  what3: "HTTP REQUEST",
                  respon3 : {
                        result3: "GET, POST, PATCH, UPDATE, DELETE"
                  },
                  what4: "REQUEST RESPONSE",
                  respon4 : {
                        Res2xxx: "adalah response code yang menampilkan bahwa request berhasil.",
                        Res4xxx: "adalah response code yang menampilkan bahwa request mengalami kesalahan pada sisi client.",
                        Res5xxx: "adalah response code yang menampilkan bahwa request mengalami kesalahan pada sisi server."
                  }
            });
      })


module.exports = Router;