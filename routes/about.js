var express = require('express');
var router = express.Router();
var contactController = require('../controller/contact')
var aboutusController = require('../controller/aboutus')


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


async function get_about_other()
{
   var temp1 = await aboutusController.find_all_certificate_()
   var temp2 = await aboutusController.find_all_partner_()
   var temp3 = await aboutusController.find_all_client_()
   var temp4 = await aboutusController.find_all_testimonial_()

   var result = {

     certificates : temp1,
     partners : temp2,
     clients : temp3,
     testimonials : temp4
   }

   return result;
}

router.get('/', async function(req, res, next) {
    // res.status(404);
    var contact_data = await get_contact_data();
    var abt_data = await get_about()
    var abt_other = await get_about_other()
    var data = {role:req.headers.role,
        contact1:contact_data.contact1,
        contact2:contact_data.contact2,
        email:contact_data.email,
        address:contact_data.address,
        aboutus : abt_data.aboutus,
        philosophy:abt_data.philosophy,
        certificates:abt_other.certificates,
        clients:abt_other.clients,
        testimonials:abt_other.testimonials,
        partners:abt_other.partners
    }
    res.render('about', data);
  });

module.exports = router;
