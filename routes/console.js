var express = require('express');
var router = express.Router();
var contactController = require('../controller/contact')
var mottoController = require('../controller/motto')
var aboutusController = require('../controller/aboutus')
var meta_data = require('../meta_data')


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

async function get_about()
{
  var temp_data = await aboutusController.find_all_about_()

  if(temp_data)
  {
      let result = {

        aboutus: temp_data.aboutus,
        philosophy:temp_data.philosophy
      }

      return result
  }
  else{

    let result = {
      aboutus:"NA",
      philosophy:"NA"
    }

    return result;
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
        var data = {
            meta_description : meta_data.console,
            title:"Console",
            role:req.headers.role,
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
        var aboutus_data = await get_about();
        console.log(contact_data);
        var data = {

            meta_description : meta_data.console_about,
            title:"Console",
            role:req.headers.role,
            contact1:contact_data.contact1,
            contact2:contact_data.contact2,
            email:contact_data.email,
            address:contact_data.address,
            motto:motto_data.content,
            aboutus : aboutus_data.aboutus,
            philosophy: aboutus_data.philosophy
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
        var data = {
          meta_description : meta_data.console_news,
            title:"Console News",
            role:req.headers.role,
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
        var data = {
          meta_description : meta_data.console_products,
            title:"Console Products",
            role:req.headers.role,
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
        var data = {
          meta_description : meta_data.console_team,
            title:"Console Team",
            role:req.headers.role,
            contact1:contact_data.contact1,
            contact2:contact_data.contact2,
            email:contact_data.email,
            address:contact_data.address,
            motto:motto_data.content
        }
        res.render('console_team', data);
    }
  });

  router.get('/console_users', async function(req, res, next) {
    // res.status(404);

    console.log(req.headers.role)

    if(req.headers.role < 2)
    {
        res.redirect('/')
    }
    else
    {
        var contact_data = await get_contact_data();
        var motto_data = await get_motto_content();
        console.log(contact_data);
        var data = {
          meta_description : meta_data.console_users,
            title:"Console Users",
            role:req.headers.role,
            contact1:contact_data.contact1,
            contact2:contact_data.contact2,
            email:contact_data.email,
            address:contact_data.address,
            motto:motto_data.content
        }
        res.render('console_users', data);
    }
  });


module.exports = router;
