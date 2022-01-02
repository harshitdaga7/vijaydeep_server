var express = require('express');
var router = express.Router();
var path = require('path')
var contactController = require('../controller/contact')
var mottoController = require('../controller/motto')
var newsController = require('../controller/news')
var News = require('../models/dbModels').news;
var Team = require('../models/dbModels').team;
var teamController = require('../controller/team');


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



module.exports = router;
