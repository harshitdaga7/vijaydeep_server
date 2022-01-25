var express = require('express');
var router = express.Router();
var contactController = require('../controller/contact');
var  teamController = require('../controller/team');
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

async function get_team_data(){

  var temp_team_data = await teamController.find_all_();

  if(temp_team_data){

    return temp_team_data;
  }
  else{

    return [];
  }
}

router.get('/', async function(req, res, next) {
    // res.status(404);
    var contact_data = await get_contact_data();
    var team_data = await get_team_data();
    var data = {
        title:"Team",
        meta_description : meta_data.team,
        role:req.headers.role,
        contact1:contact_data.contact1,
        contact2:contact_data.contact2,
        email:contact_data.email,
        address:contact_data.address,
        team:team_data
    }
    res.render('team', data);
  });

module.exports = router;
