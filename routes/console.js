var express = require('express');
var router = express.Router();
var contactController = require('../controller/contact')
var mottoController = require('../controller/motto')


// getting contact_data
async function get_contact_data()
{
  var temp_contact_data = await contactController.find_all_();
  var contact_data = null;
  if(!temp_contact_data)
  {
     contact_data = {

      contact1:"NA",
      contact2:"NA",
      email:"NA",
      address:"NA"
     }
     return contact_data;
  }
  else{

    contact_data = temp_contact_data;
    return contact_data;
  }

}

async function get_motto_content()
{
  var temp_motto_data = await mottoController.find_all_();
  var motto_data = null;
  if(!temp_motto_data)
  {
     motto_data = {
      content:"NA"
     }
     return motto_data;
  }
  else{

    motto_data = temp_motto_data;
    return motto_data;
  }

}

router.get('/', async function(req, res, next) {
    // res.status(404);

    console.log(req.headers.role)

    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {
        var contact_data = await get_contact_data();
        var motto_data = await get_motto_content();
        console.log(contact_data);
        var data = {role:req.headers.role,
            contact1:contact_data.contact1,
            contact2:contact_data.contact2,
            email:contact_data.email,
            address:contact_data.address,
            motto:motto_data.content
        }
        res.render('console', data);
    }
  });
  
router.get('/console_about', async function(req, res, next) {
    // res.status(404);

    console.log(req.headers.role)

    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {
        var contact_data = await get_contact_data();
        var motto_data = await get_motto_content();
        console.log(contact_data);
        var data = {role:req.headers.role,
            contact1:contact_data.contact1,
            contact2:contact_data.contact2,
            email:contact_data.email,
            address:contact_data.address,
            motto:motto_data.content
        }
        res.render('console_about', data);
    }
  });

router.get('/console_news', async function(req, res, next) {
    // res.status(404);

    console.log(req.headers.role)

    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {
        var contact_data = await get_contact_data();
        var motto_data = await get_motto_content();
        console.log(contact_data);
        var data = {role:req.headers.role,
            contact1:contact_data.contact1,
            contact2:contact_data.contact2,
            email:contact_data.email,
            address:contact_data.address,
            motto:motto_data.content
        }
        res.render('console_news', data);
    }
  });

router.get('/console_products', async function(req, res, next) {
    // res.status(404);

    console.log(req.headers.role)

    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {
        var contact_data = await get_contact_data();
        var motto_data = await get_motto_content();
        console.log(contact_data);
        var data = {role:req.headers.role,
            contact1:contact_data.contact1,
            contact2:contact_data.contact2,
            email:contact_data.email,
            address:contact_data.address,
            motto:motto_data.content
        }
        res.render('console_products', data);
    }
  });


router.get('/console_team', async function(req, res, next) {
    // res.status(404);

    console.log(req.headers.role)

    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {
        var contact_data = await get_contact_data();
        var motto_data = await get_motto_content();
        console.log(contact_data);
        var data = {role:req.headers.role,
            contact1:contact_data.contact1,
            contact2:contact_data.contact2,
            email:contact_data.email,
            address:contact_data.address,
            motto:motto_data.content
        }
        res.render('console_team', data);
    }
  });

module.exports = router;