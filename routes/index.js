var express = require('express');
var router = express.Router();
var contactController = require('../controller/contact')
var mottoController = require('../controller/motto')
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

/* GET home page. */
router.get('/', async function(req, res, next) {
  // res.status(404);
  var contact_data = await get_contact_data();
  var motto_data = await get_motto_content();
  var data = {

    title:"Home",
    meta_description : meta_data.home,
    role:req.headers.role,
    contact1:contact_data.contact1,
    contact2:contact_data.contact2,
    email:contact_data.email,
    address:contact_data.address,
    motto:motto_data.content
  }
  res.render('index', data);
});

module.exports = router;
