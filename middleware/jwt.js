var userController = require('../controller/user')
var jwt = require('jsonwebtoken')
var config = require('../config');

async function verify(req,res,next)
{

    /// check if 
    try
    {

        var token = null;

        if(req.cookies.token){

            token = req.cookies.token;
        }

        if(!token)
        {
            // token doesnot exist
            req.headers.role = 0;
            next();
            return;
        }

        jwt.verify(token,config.secret, async function(err, decoded) {
            
            if(err)
            {
                req.headers.role = 0;
                next();
                return;
            }

            // if good

            var user = await userController.find_one_({email:decoded.email})

            if(user)
            {
                req.headers.role = user.role;
            }
            else{

                req.headers.role = 0;
            }
            next();
            return;

          });

    }
    catch(e)
    {
        next(e);
    }
    
}

module.exports = verify;