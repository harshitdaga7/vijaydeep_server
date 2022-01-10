var express = require('express');
var router = express.Router();
var path = require('path')
var contactController = require('../controller/contact')
var mottoController = require('../controller/motto')
var newsController = require('../controller/news')
var News = require('../models/dbModels').news;
var Team = require('../models/dbModels').team;
var teamController = require('../controller/team');

var About = require('../models/dbModels').about
var Testimonial =  require('../models/dbModels').testimonial
var Client = require('../models/dbModels').client
var Partner = require('../models/dbModels').partner
var Certificate = require('../models/dbModels').certificate
var aboutusController = require('../controller/aboutus');


var Product = require('../models/dbModels').product
var productController = require('../controller/product');




async function get_news_data()
{
    var news_arr = await newsController.find_all_();
    
    if(news_arr)
    {
       return news_arr;
    }
    else{

      return false;
    }
}

async function get_news_data_lim(limit)
{
  var news_arr = await newsController.find_all_limit_(limit);

  if(news_arr)
  {
    return news_arr;
  }
  else{

    return false;
  }
}



router.post('/contact/update', async function (req,res,next){

    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {
        try{
            
            var data = req.body;
            var contact = await contactController.create_or_update_(data)
            
            res.json({success:true,message:"updated successfully"})
        }
        catch(e){
            res.json({success:false, message:"Could not update contact"})
        }

    }


})


router.post('/motto/update', async function(req,res,next){

    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {
        try{
            /// data:{content:}
            var data = req.body;
            var motto = await mottoController.create_or_update_(data)

            // console.log(data);
            
            res.json({success:true,message:"updated successfully"})
        }
        catch(e){
            // console.log(e);
            res.json({success:false, message:"Could not update motto"})
        }

    }


})

router.post('/news/create/', async function(req,res,next){



    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {
        try{

            console.log(req.body)
            var headline = req.body.headline;
            var article = req.body.article;
            var link = req.body.link;
            var image_file;

            if(!req.files || Object.keys(req.files).length === 0)
            {
                res.json({succes:false,message:"please upload image"})
            }
            else{


                image_file = req.files.image;
                // let ext = image_file.name.split('.').pop();
                console.log(image_file.name)


                var news = await News.create({headline:headline,article:article,link:link})

                var filename = `news_${news.id}`;
                var pth = path.join(__dirname,'..','public','images') + `/${filename}`;

                console.log(pth) 

                image_file.mv(pth,async function(err) {
                    if (err)
                    {
                      console.log(err)
                      return res.json({success:false,message:'news created but could not upload image'});
                      
                    }
                    news.set({image:`${filename}`})
                    var result = await news.save();
                    res.json({success:true,message:"created successfully"})
                  });

            }
            

            
        
        }
        catch(e){

            console.log(e)
            res.json({success:false, message:"Could not create news"})
        }


        // res.send(JSON.stringify({body:req.body}))

    }
})



router.post('/news/update/:id', async function(req,res,next){



    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {

        console.log(req.body)
        var headline = req.body.headline;
        var article = req.body.article;
        var link = req.body.link;
        var image_file;

        
        if(!req.files || Object.keys(req.files).length === 0)
        {
            // just update without images

            var news = await newsController.update_by_id_(req.params.id,{headline:headline,article:article,link:link});

            if(news)
            {
                res.json({success:true,message:"updated successfully"})
            }
            else{

                res.json({success:false,message:"could not update"})
            }

        }
        else{


            image_file = req.files.image;
            // let ext = image_file.name.split('.').pop();
            console.log(image_file.name)


            var filename = `news_${req.params.id}`;
            var pth = path.join(__dirname,'..','public','images') + `/${filename}`;

            console.log(pth) 

            image_file.mv(pth,async function(err) {
                if (err)
                {
                  console.log(err)
                  return res.json({success:false,message:'news created but could not upload image'});
                  
                }
                var news = await newsController.update_by_id_(req.params.id,{image:filename,headline:headline,article:article,link:link})
                
                if(news)
                {
                    res.json({success:true,message:"updated successfully"})
                }
                else{
                    res.json({success:false,message:"could not update"})
                }
              });
        }

    }

})

router.get('/news/all/:lim', async function(req,res,next){


    if(req.params.lim == 0)
    {
    
      var news_data = await get_news_data();
      res.json({success:true, data:news_data});
    }
    else{
  
       var news_data = await get_news_data_lim(req.params.lim)
       res.json({success:true,data:news_data})
    }
  
})


router.delete("/news/find/:id", async function(req,res,next){


    try{

        var d = await newsController.delete_by_id_(req.params.id);

        if(d){

            res.json({success:true,message:'deleted successfully'})
        }
        else{

            res.json({success:false,message:"could not delete"})
        }
    }
    catch(e)
    {
        res.json({success:false,message:'some error occured'});
    }
})

router.get("/news/find/:id", async function(req,res,next){


    try{

        var news = await newsController.find_by_id_(req.params.id)

        if(news)
        {
            return res.json({success:true,data:news});
        }
        else{

            return res.json({success:false,message:"could not find"})
        }

    }
    catch(e)
    {
        res.json({success:false,message:"some error occured"})   
    }
    
})


// team

router.post('/team/create/', async function(req,res,next){



    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {
        try{

            console.log(req.body)
            var name = req.body.name;
            var position = req.body.position;
            var bio = req.body.bio;
            var contact1 = req.body.contact1;
            var contact2 = req.body.contact2;
            var email = req.body.email;
            var linkedin = req.body.linkedin;
            var twitter = req.body.twitter;
            var image_file;

            if(!req.files || Object.keys(req.files).length === 0)
            {
                res.json({succes:false,message:"please upload image"})
            }
            else{


                image_file = req.files.image;
                // let ext = image_file.name.split('.').pop();
                console.log(image_file.name)


                var data = {
                    name:name,
                    position:position,
                    bio:bio,
                    contact1:contact1,
                    contact2:contact2,
                    email:email,
                    linkedin:linkedin,
                    twitter:twitter
                }
                var team = await Team.create(data)

                var filename = `team_${team.id}`;
                var pth = path.join(__dirname,'..','public','images') + `/${filename}`;

                console.log(pth) 

                image_file.mv(pth,async function(err) {
                    if (err)
                    {
                      console.log(err)
                      return res.json({success:false,message:'teams created but could not upload image'});
                      
                    }
                    team.set({image:`${filename}`})
                    var result = await team.save();
                    res.json({success:true,message:"created successfully"})
                  });

            }
            

            
        
        }
        catch(e){

            console.log(e)
            res.json({success:false, message:"Could not create news"})
        }


        // res.send(JSON.stringify({body:req.body}))

    }
})

router.post('/team/update/:id', async function(req,res,next){



    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {

        console.log(req.body)
        var name = req.body.name;
        var position = req.body.position;
        var bio = req.body.bio;
        var contact1 = req.body.contact1;
        var contact2 = req.body.contact2;
        var email = req.body.email;
        var linkedin = req.body.linkedin;
        var twitter = req.body.twitter;
        var image_file;

        
        if(!req.files || Object.keys(req.files).length === 0)
        {
            // just update without images

            var data = {
                name:name,
                position:position,
                bio:bio,
                contact1:contact1,
                contact2:contact2,
                email:email,
                linkedin:linkedin,
                twitter:twitter
            }
            var team = await teamController.update_by_id_(req.params.id,data);

            if(team)
            {
                res.json({success:true,message:"updated successfully"})
            }
            else{

                res.json({success:false,message:"could not update"})
            }

        }
        else{


            image_file = req.files.image;
            // let ext = image_file.name.split('.').pop();
            console.log(image_file.name)


            var filename = `team_${req.params.id}`;
            var pth = path.join(__dirname,'..','public','images') + `/${filename}`;

            console.log(pth) 

            image_file.mv(pth,async function(err) {
                if (err)
                {
                  console.log(err)
                  return res.json({success:false,message:'team created but could not upload image'});
                  
                }

                var data = {
                    image:filename,
                    name:name,
                    position:position,
                    bio:bio,
                    contact1:contact1,
                    contact2:contact2,
                    email:email,
                    linkedin:linkedin,
                    twitter:twitter
                }
                var team = await teamController.update_by_id_(req.params.id,data)
                
                if(team)
                {
                    res.json({success:true,message:"updated successfully"})
                }
                else{
                    res.json({success:false,message:"could not update"})
                }
              });
        }

    }

})

router.get('/team/all/', async function(req,res,next){


    var team_arr = await teamController.find_all_();

    if(team_arr)
    {
        return res.json({success:true,data:team_arr});
    }
    else{

        return res.json({succes:false,message:'some error occured'})
    }

})


router.delete("/team/find/:id", async function(req,res,next){


    try{

        var d = await teamController.delete_by_id_(req.params.id);

        if(d){

            res.json({success:true,message:'deleted successfully'})
        }
        else{

            res.json({success:false,message:"could not delete"})
        }
    }
    catch(e)
    {
        res.json({success:false,message:'some error occured'});
    }
})


router.get("/team/find/:id", async function(req,res,next){


    try{

        var team = await teamController.find_by_id_(req.params.id)

        if(team)
        {
            console.log(team)
            return res.json({success:true,data:team});
        }
        else{

            return res.json({success:false,message:"could not find"})
        }

    }
    catch(e)
    {
        res.json({success:false,message:"some error occured"})   
    }
    
})


// client

router.post('/client/create/', async function(req,res,next){



    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {
        try{

            console.log(req.body)
            var name = req.body.name;
            var link = req.body.link;
            var image_file;

            if(!req.files || Object.keys(req.files).length === 0)
            {
                res.json({succes:false,message:"please upload image"})
            }
            else{


                image_file = req.files.image;
                // let ext = image_file.name.split('.').pop();
                console.log(image_file.name)


                var data = {
                    name:name,
                    link:link
                }
                var client = await Client.create(data)

                var filename = `client_${client.id}`;
                var pth = path.join(__dirname,'..','public','images') + `/${filename}`;

                console.log(pth) 

                image_file.mv(pth,async function(err) {
                    if (err)
                    {
                      console.log(err)
                      return res.json({success:false,message:'clients created but could not upload image'});
                      
                    }
                    client.set({image:`${filename}`})
                    var result = await client.save();
                    res.json({success:true,message:"created successfully"})
                  });

            }
            

            
        
        }
        catch(e){

            console.log(e)
            res.json({success:false, message:"Could not create news"})
        }


        // res.send(JSON.stringify({body:req.body}))

    }
})

router.post('/client/update/:id', async function(req,res,next){



    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {

        console.log(req.body)
        var name = req.body.name;
        var link = req.body.link;
        var image_file;

        
        if(!req.files || Object.keys(req.files).length === 0)
        {
            // just update without images

            var data = {
                name:name,
                link:link
            }
            var client = await aboutusController.update_by_id_client_(req.params.id,data);

            if(client)
            {
                res.json({success:true,message:"updated successfully"})
            }
            else{

                res.json({success:false,message:"could not update"})
            }

        }
        else{


            image_file = req.files.image;
            // let ext = image_file.name.split('.').pop();
            console.log(image_file.name)


            var filename = `client_${req.params.id}`;
            var pth = path.join(__dirname,'..','public','images') + `/${filename}`;

            console.log(pth) 

            image_file.mv(pth,async function(err) {
                if (err)
                {
                  console.log(err)
                  return res.json({success:false,message:'client created but could not upload image'});
                  
                }

                var data = {
                    image:filename,
                    name:name,
                    link:link,
                }
                var client = await aboutusController.update_by_id_client_(req.params.id,data)
                
                if(client)
                {
                    res.json({success:true,message:"updated successfully"})
                }
                else{
                    res.json({success:false,message:"could not update"})
                }
              });
        }

    }

})

router.get('/client/all/', async function(req,res,next){


    var client_arr = await aboutusController.find_all_client_();

    if(client_arr)
    {
        return res.json({success:true,data:client_arr});
    }
    else{

        return res.json({succes:false,message:'some error occured'})
    }

})


router.delete("/client/find/:id", async function(req,res,next){


    try{

        var d = await aboutusController.delete_by_id_client_(req.params.id);

        if(d){

            res.json({success:true,message:'deleted successfully'})
        }
        else{

            res.json({success:false,message:"could not delete"})
        }
    }
    catch(e)
    {
        res.json({success:false,message:'some error occured'});
    }
})


router.get("/client/find/:id", async function(req,res,next){


    try{

        var client = await aboutusController.find_by_id_client_(req.params.id)

        if(client)
        {
            console.log(client)
            return res.json({success:true,data:client});
        }
        else{

            return res.json({success:false,message:"could not find"})
        }

    }
    catch(e)
    {
        res.json({success:false,message:"some error occured"})   
    }
    
})


// partner

router.post('/partner/create/', async function(req,res,next){



    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {
        try{

            console.log(req.body)
            var name = req.body.name;
            var link = req.body.link;
            var image_file;

            if(!req.files || Object.keys(req.files).length === 0)
            {
                res.json({succes:false,message:"please upload image"})
            }
            else{


                image_file = req.files.image;
                // let ext = image_file.name.split('.').pop();
                console.log(image_file.name)


                var data = {
                    name:name,
                    link:link
                }
                var partner = await Partner.create(data)

                var filename = `partner_${partner.id}`;
                var pth = path.join(__dirname,'..','public','images') + `/${filename}`;

                console.log(pth) 

                image_file.mv(pth,async function(err) {
                    if (err)
                    {
                      console.log(err)
                      return res.json({success:false,message:'partners created but could not upload image'});
                      
                    }
                    partner.set({image:`${filename}`})
                    var result = await partner.save();
                    res.json({success:true,message:"created successfully"})
                  });

            }
            

            
        
        }
        catch(e){

            console.log(e)
            res.json({success:false, message:"Could not create news"})
        }


        // res.send(JSON.stringify({body:req.body}))

    }
})

router.post('/partner/update/:id', async function(req,res,next){



    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {

        console.log(req.body)
        var name = req.body.name;
        var link = req.body.link;
        var image_file;

        
        if(!req.files || Object.keys(req.files).length === 0)
        {
            // just update without images

            var data = {
                name:name,
                link:link
            }
            var partner = await aboutusController.update_by_id_partner_(req.params.id,data);

            if(partner)
            {
                res.json({success:true,message:"updated successfully"})
            }
            else{

                res.json({success:false,message:"could not update"})
            }

        }
        else{


            image_file = req.files.image;
            // let ext = image_file.name.split('.').pop();
            console.log(image_file.name)


            var filename = `partner_${req.params.id}`;
            var pth = path.join(__dirname,'..','public','images') + `/${filename}`;

            console.log(pth) 

            image_file.mv(pth,async function(err) {
                if (err)
                {
                  console.log(err)
                  return res.json({success:false,message:'partner created but could not upload image'});
                  
                }

                var data = {
                    image:filename,
                    name:name,
                    link:link,
                }
                var partner = await aboutusController.update_by_id_partner_(req.params.id,data)
                
                if(partner)
                {
                    res.json({success:true,message:"updated successfully"})
                }
                else{
                    res.json({success:false,message:"could not update"})
                }
              });
        }

    }

})

router.get('/partner/all/', async function(req,res,next){


    var partner_arr = await aboutusController.find_all_partner_();

    if(partner_arr)
    {
        return res.json({success:true,data:partner_arr});
    }
    else{

        return res.json({succes:false,message:'some error occured'})
    }

})


router.delete("/partner/find/:id", async function(req,res,next){


    try{

        var d = await aboutusController.delete_by_id_partner_(req.params.id);

        if(d){

            res.json({success:true,message:'deleted successfully'})
        }
        else{

            res.json({success:false,message:"could not delete"})
        }
    }
    catch(e)
    {
        res.json({success:false,message:'some error occured'});
    }
})


router.get("/partner/find/:id", async function(req,res,next){


    try{

        var partner = await aboutusController.find_by_id_partner_(req.params.id)

        if(partner)
        {
            console.log(partner)
            return res.json({success:true,data:partner});
        }
        else{

            return res.json({success:false,message:"could not find"})
        }

    }
    catch(e)
    {
        res.json({success:false,message:"some error occured"})   
    }
    
})


/// certificate

router.post('/certificate/create/', async function(req,res,next){



    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {
        try{

            console.log(req.body)
            var name = req.body.name;
            var link = req.body.link;
            var image_file;

            if(!req.files || Object.keys(req.files).length === 0)
            {
                res.json({succes:false,message:"please upload image"})
            }
            else{


                image_file = req.files.image;
                // let ext = image_file.name.split('.').pop();
                console.log(image_file.name)


                var data = {
                    name:name,
                    link:link
                }
                var certificate = await Certificate.create(data)

                var filename = `certificate_${certificate.id}`;
                var pth = path.join(__dirname,'..','public','images') + `/${filename}`;

                console.log(pth) 

                image_file.mv(pth,async function(err) {
                    if (err)
                    {
                      console.log(err)
                      return res.json({success:false,message:'certificates created but could not upload image'});
                      
                    }
                    certificate.set({image:`${filename}`})
                    var result = await certificate.save();
                    res.json({success:true,message:"created successfully"})
                  });

            }
            

            
        
        }
        catch(e){

            console.log(e)
            res.json({success:false, message:"Could not create news"})
        }


        // res.send(JSON.stringify({body:req.body}))

    }
})

router.post('/certificate/update/:id', async function(req,res,next){



    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {

        console.log(req.body)
        var name = req.body.name;
        var link = req.body.link;
        var image_file;

        
        if(!req.files || Object.keys(req.files).length === 0)
        {
            // just update without images

            var data = {
                name:name,
                link:link
            }
            var certificate = await aboutusController.update_by_id_certificate_(req.params.id,data);

            if(certificate)
            {
                res.json({success:true,message:"updated successfully"})
            }
            else{

                res.json({success:false,message:"could not update"})
            }

        }
        else{


            image_file = req.files.image;
            // let ext = image_file.name.split('.').pop();
            console.log(image_file.name)


            var filename = `certificate_${req.params.id}`;
            var pth = path.join(__dirname,'..','public','images') + `/${filename}`;

            console.log(pth) 

            image_file.mv(pth,async function(err) {
                if (err)
                {
                  console.log(err)
                  return res.json({success:false,message:'certificate created but could not upload image'});
                  
                }

                var data = {
                    image:filename,
                    name:name,
                    link:link,
                }
                var certificate = await aboutusController.update_by_id_certificate_(req.params.id,data)
                
                if(certificate)
                {
                    res.json({success:true,message:"updated successfully"})
                }
                else{
                    res.json({success:false,message:"could not update"})
                }
              });
        }

    }

})

router.get('/certificate/all/', async function(req,res,next){


    var certificate_arr = await aboutusController.find_all_certificate_();

    if(certificate_arr)
    {
        return res.json({success:true,data:certificate_arr});
    }
    else{

        return res.json({succes:false,message:'some error occured'})
    }

})


router.delete("/certificate/find/:id", async function(req,res,next){


    try{

        var d = await aboutusController.delete_by_id_certificate_(req.params.id);

        if(d){

            res.json({success:true,message:'deleted successfully'})
        }
        else{

            res.json({success:false,message:"could not delete"})
        }
    }
    catch(e)
    {
        res.json({success:false,message:'some error occured'});
    }
})


router.get("/certificate/find/:id", async function(req,res,next){


    try{

        var certificate = await aboutusController.find_by_id_certificate_(req.params.id)

        if(certificate)
        {
            console.log(certificate)
            return res.json({success:true,data:certificate});
        }
        else{

            return res.json({success:false,message:"could not find"})
        }

    }
    catch(e)
    {
        res.json({success:false,message:"some error occured"})   
    }
    
})

// testimonial

router.post('/testimonial/create/', async function(req,res,next){



    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {
        try{

            console.log(req.body)
            var message = req.body.message;
            var author = req.body.author;



            var data = {
                message:message,
                author:author
            }
            
            var testimonial = await aboutusController.create_testimonial_(data)

            if(testimonial){

                return res.json({success:true,message:"created successfully"})
            }
            else{
                return res.json({success:false, message:"Could not create testimonial"})
            }
            

            
        
        }
        catch(e){

            console.log(e)
            res.json({success:false, message:"Could not create testimonial"})
        }


        // res.send(JSON.stringify({body:req.body}))

    }
})

router.post('/testimonial/update/:id', async function(req,res,next){



    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {

        console.log(req.body)
        var name = req.body.name;
        var link = req.body.link;


        

            // just update without images

            var data = {
                name:name,
                link:link
            }
            var testimonial = await aboutusController.update_by_id_testimonial_(req.params.id,data);

            if(testimonial)
            {
                res.json({success:true,message:"updated successfully"})
            }
            else{

                res.json({success:false,message:"could not update"})
            }



    }

})

router.get('/testimonial/all/', async function(req,res,next){


    var testimonial_arr = await aboutusController.find_all_testimonial_();

    if(testimonial_arr)
    {
        return res.json({success:true,data:testimonial_arr});
    }
    else{

        return res.json({succes:false,message:'some error occured'})
    }

})


router.delete("/testimonial/find/:id", async function(req,res,next){


    try{

        var d = await aboutusController.delete_by_id_testimonial_(req.params.id);

        if(d){

            res.json({success:true,message:'deleted successfully'})
        }
        else{

            res.json({success:false,message:"could not delete"})
        }
    }
    catch(e)
    {
        res.json({success:false,message:'some error occured'});
    }
})


router.get("/testimonial/find/:id", async function(req,res,next){


    try{

        var testimonial = await aboutusController.find_by_id_testimonial_(req.params.id)

        if(testimonial)
        {
            console.log(testimonial)
            return res.json({success:true,data:testimonial});
        }
        else{

            return res.json({success:false,message:"could not find"})
        }

    }
    catch(e)
    {
        res.json({success:false,message:"some error occured"})   
    }
    
})

// about us

router.post('/aboutus/update', async function(req,res,next){

    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {
        try{
            /// data:{content:}
            var data = req.body;
            var aboutus = await aboutusController.create_or_update_about_(data)

            // console.log(data);
            
            res.json({success:true,message:"updated successfully"})
        }
        catch(e){
            // console.log(e);
            res.json({success:false, message:"Could not update about us"})
        }

    }


})

// philosophy

router.post('/philosophy/update', async function(req,res,next){

    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {
        try{
            /// data:{content:}
            var data = req.body;
            var motto = await mottoController.create_or_update_(data)

            // console.log(data);
            
            res.json({success:true,message:"updated successfully"})
        }
        catch(e){
            // console.log(e);
            res.json({success:false, message:"Could not update philosophy"})
        }

    }


})


// product

router.post('/product/create/', async function(req,res,next){



    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {
        try{

            console.log(req.body)
            var name = req.body.name;
            var link = req.body.link;
            var description = req.body.description;
            var image_files = ["NA","NA","NA"]


            if(!req.files || Object.keys(req.files).length === 0)
            {
                res.json({succes:false,message:"please upload image"})
            }
            else{


                
                var data = {
                    name:name,
                    link:link,
                    description:description
                }
                var product = await Product.create(data)
                var filename = ["NA","NA","NA"]


                if(req.files.image1) image_files[0] = req.files.image1;
                if(req.files.image2) image_files[1] = req.files.image2;
                if(req.files.image3) image_files[2] = req.files.image3;


                for(let i = 1;i<=3;i++)
                {
                    
                    if(image_files[i-1] != "NA")
                    {


                        console.log(image_files[i-1].name)


                        filename[i-1] = `product${i}_${product.id}`;
                        let pth = path.join(__dirname,'..','public','images') + `/${filename[i-1]}`;
        
                        console.log(pth) 
        
                        image_files[i-1].mv(pth,async function(err) {
                            if (err)
                            {
                            console.log(err)
                            return res.json({success:false,message:'products created but could not upload image'});
                            
                            }
                            product.set({[`image${i}`]:`${filename[i-1]}`})
                            var result = await product.save();
                        });

                    }

                }

                res.json({success:true,message:"created successfully"})

                // let ext = image_file.name.split('.').pop()

  

            }
            

            
        
        }
        catch(e){

            console.log(e)
            res.json({success:false, message:"Could not create news"})
        }


        // res.send(JSON.stringify({body:req.body}))

    }
})

router.post('/product/update/:id', async function(req,res,next){



    if(req.headers.role < 1)
    {
        res.redirect('/')
    }
    else
    {

        console.log(req.body)
        var name = req.body.name;
        var link = req.body.link;
        var description = req.body.description;
        var image_files = ["NA","NA","NA"]

        
        if(!req.files || Object.keys(req.files).length === 0)
        {
            // just update without images

            var data = {
                name:name,
                link:link,
                description:description
            }
            var product = await productController.update_by_id_(req.params.id,data);

            if(product)
            {
                res.json({success:true,message:"updated successfully"})
            }
            else{

                res.json({success:false,message:"could not update"})
            }

        }
        else{

            var data = {

                name:name,
                link:link,
                description:description
            }
            var product = await productController.update_by_id_(req.params.id,data)
            var filename = ["NA","NA","NA"]


            if(req.files.image1) image_files[0] = req.files.image1;
            if(req.files.image2) image_files[1] = req.files.image2;
            if(req.files.image3) image_files[2] = req.files.image3;
            // let ext = image_file.name.split('.').pop()

            for(let i = 1;i<=3;i++)
            {
                if(image_files[i-1] != "NA")
                {
                    filename[i-1] = `product${i}_${req.params.id}`;
                    var pth = path.join(__dirname,'..','public','images') + `/${filename[i-1]}`;
        
                    console.log(pth) 
        
                    image_files[i-1].mv(pth,async function(err) {

                        if (err)
                        {
                          console.log(err)
                          return res.json({success:false,message:'product created but could not upload image'});
                          
                        }
        
                        var data = {[`image${i}`]: `${filename[i-1]}`}
                        var product = await productController.update_by_id_(req.params.id,data)
                        
                        if(product)
                        {
                            res.json({success:true,message:"updated successfully"})
                        }
                        else{
                            res.json({success:false,message:"could not update"})
                        }
                      });
                }
            }


        }

    }

})

router.get('/product/all/', async function(req,res,next){


    var product_arr = await productController.find_all_();

    if(product_arr)
    {
        return res.json({success:true,data:product_arr});
    }
    else{

        return res.json({succes:false,message:'some error occured'})
    }

})


router.delete("/product/find/:id", async function(req,res,next){


    try{

        var d = await productController.delete_by_id_(req.params.id);

        if(d){

            res.json({success:true,message:'deleted successfully'})
        }
        else{

            res.json({success:false,message:"could not delete"})
        }
    }
    catch(e)
    {
        res.json({success:false,message:'some error occured'});
    }
})


router.get("/product/find/:id", async function(req,res,next){


    try{

        var product = await productController.find_by_id_(req.params.id)

        if(product)
        {
            console.log(product)
            return res.json({success:true,data:product});
        }
        else{

            return res.json({success:false,message:"could not find"})
        }

    }
    catch(e)
    {
        res.json({success:false,message:"some error occured"})   
    }
    
})



module.exports = router;
