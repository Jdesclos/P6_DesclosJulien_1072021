const mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.xooka.mongodb.net/piiquante",
    {useNewUrlParser: true,useUnifiedTopology: true},
    (err)=>{
        if (!err)console.log("Mongodb connected");
        else console.log("connection error:" + err);
    }
)