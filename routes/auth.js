var express = require('express');
var bcrypt = require('bcrypt')
var userController = require('../controller/user')
var router = express.Router();
var jwt = require('jsonwebtoken');
const config = require('../config');


// utilities functiom

async function authenticate(email, password)
{
    let user = await userController.find_one_({email:email})
    if (user)
    {
        let match = await bcrypt.compare(password,user.password)

        return match;
    }

    return user;

    
}

router.post('/login', async function (req,res,next){

    try{

        var data = req.body;
        var good = await authenticate(data.email,data.password);
    
        if(good)
        {
            /// generate a token
            
            var token = jwt.sign({email:data.email},config.secret,{expiresIn: config.duration})
            res.cookie('token',token,{ maxAge:config.duration*1000, httpOnly: true })
            res.json({auth:true,token:token})
            
        }
        else
        {
            /// error
            res.json({auth:false,message:'wrong credentials'})
        }
    }
    catch(e)
    {
        console.log(e);
        next(e);
    }

});

router.all('/logout',function (req,res,next){

    // console.log(req.headers)
    res.clearCookie('token')
    res.status(200).json({auth:false,token:null})
    // req.body.hello = ;
    // res.send(req.header('authorization'))
    // req.headers.role = 1;

    // res.json({role:req.headers.role})
})

module.exports = router;