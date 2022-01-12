var express = require('express');
var bcrypt = require('bcrypt')
var userController = require('../controller/user')
var router = express.Router();


async function authenticate(id, password)
{
  try{

    let user = await userController.find_one_({id:id})
    if (user)
    {
        let match = await bcrypt.compare(password,user.password)

        return match;
    }

    return false;

  }
  catch(e)
  {
    console.log(e);
     return false;
  }

    
}

/* GET users listing. */
router.get('/find/all', async function(req, res, next) {

  // console.log(req.headers.role)
  try{

    if(req.headers.role < 2)
    {
        res.redirect('/')
    }
    else
    {
  
        var admin_id = req.headers.id;
        
        var users = await userController.find_all_()

        if(users)
        {
          let result = users.map(product=>product.email)

          return res.json({success:true,data:result})
        }
        else{

          return res.json({success:false,message:"some error occured"})
        }
        
  
    }

  }
  catch(e)
  {
     res.json({success:false,message:"some error occured"})
  }


});


/** create new user */
router.post('/create', async function(req, res, next) {

  // console.log(req.headers.role)
  try{

    if(req.headers.role < 2)
    {
        res.redirect('/')
    }
    else
    {
  
        var admin_id = req.headers.id;
        var admin_password = req.body.adminPass;
        var user_email = req.body.email;
        var user_pass = req.body.password;


        if(await authenticate(admin_id,admin_password))
        { 

            var user = await userController.create_({email:user_email,password:user_pass})

            if(user)
            {
               res.json({success:true,message:"successfully created"})
            }
            else{

              res.json({success:false,message:"could not create"})
            }
          
        }
        else{

          return res.json({success:false,message:"could not authenticate, check your credentials"})
        }
        
  
    }

  }
  catch(e)
  {
    console.log(e);
     res.json({success:false,message:"some error occured"})
  }


});


/** update existing user */
router.post('/update', async function(req, res, next) {

  // console.log(req.headers.role)
  try{

    if(req.headers.role < 2)
    {
        res.redirect('/')
    }
    else
    {
  
        var admin_id = req.headers.id;
        var admin_password = req.body.adminPass;
        var user_email = req.body.email;
        var user_pass = req.body.password;


        if(await authenticate(admin_id,admin_password))
        { 

            var user = await userController.update_password_(user_email,user_pass);

            if(user)
            {
               res.json({success:true,message:"successfully updated"})
            }
            else{

              res.json({success:false,message:"could not update"})
            }
          
        }
        else{

          return res.json({success:false,message:"could not authenticate, check your credentials"})
        }
        
  
    }

  }
  catch(e)
  {
     res.json({success:false,message:"some error occured"})
  }


});


router.post('/delete', async function(req, res, next) {

  // console.log(req.headers.role)
  try{

    if(req.headers.role < 2)
    {
        res.redirect('/')
    }
    else
    {
  
        var admin_id = req.headers.id;
        var admin_password = req.body.adminPass;
        var user_email = req.body.email;


        if(await authenticate(admin_id,admin_password))
        { 

            var user = await userController.delete_({email:user_email});

            if(user)
            {
               res.json({success:true,message:"successfully deleted"})
            }
            else{

              res.json({success:false,message:"could not delete"})
            }
          
        }
        else{

          return res.json({success:false,message:"could not authenticate, check your credentials"})
        }
        
  
    }

  }
  catch(e)
  {
     res.json({success:false,message:"some error occured"})
  }


});







module.exports = router;
