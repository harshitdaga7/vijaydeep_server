var express = require('express');
var router = express.Router();
var contactController = require('../controller/contact')
var newsController = require('../controller/news')
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

async function get_news_data()
{
   var news_data = await newsController.find_all_();

   if(news_data){

    return news_data;
   }
   else{
     return [];
   }
}

// for news page
router.get('/', async function(req, res, next) {
    // res.status(404);
    var contact_data = await get_contact_data();
    var news_data = await get_news_data();
    var data = {
        title:"News",
        meta_description : meta_data.news,
        role:req.headers.role,
        contact1:contact_data.contact1,
        contact2:contact_data.contact2,
        email:contact_data.email,
        address:contact_data.address,
        news : news_data
    }
    res.render('news', data);
  });

module.exports = router;
