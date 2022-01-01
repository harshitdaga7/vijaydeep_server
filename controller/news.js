const Sequelize = require('sequelize')
const sequelize = require('../database')
const News = require('../models/dbModels').news
const fs = require('fs').promises;
var path = require('path')


async function create_(data)
{
    /**
     * data:{
     * 
     * image:(optional)
     * headline:(optional)
     * link:(optional)
     * article:(optional)
     * }
     */

     var news = await News.create(data);

     if(news)
     {
         return news.toJSON();
     }
     else{
         return false;
     }

}

async function find_by_id_(id)
{
    var news = await News.findByPk(id);

    if(news)
    {
        return news.toJSON();

    }
    else{

        return false;
    }
}

async function find_all_(my_order = 'DESC')
{
    var news_arr = await News.findAll({order:[['updatedAt',my_order]]})

    if(news_arr)
    {

        let result = news_arr.map(news=>news.toJSON())
        return result;
    }
    else{

        return false;
    }
}


async function find_all_limit_(limit = 5,my_order = 'DESC')
{
    var news_arr = await News.findAll({order:[['updatedAt',my_order]] , limit:parseInt(limit)})

    if(news_arr)
    {
        let result = news_arr.map(news=>news.toJSON())
        return result;
    }
    else{

        return false;
    }
}


async function delete_file_(id)
{
    try{

        var fileName = `news_${id}`
        var pth = path.join(__dirname,'..','public','images') + `/${fileName}`
        await fs.unlink(pth);
        console.log('deleted successsfully')
        return true;
    }
    catch(e)
    {
        console.log(e);
        return false;
    }
}

async function delete_by_id_(id)
{
    
    try
    {
        const result = await News.destroy({where:{id:id}})
        const r = await delete_file_(id);

        console.log(r,result)
        return true;
        
    }
    catch(e)
    {
        return false;
    }

}

async function update_by_id_(id,data)
{

    var news = await News.findByPk(id)

    if(news)
    {
        /// found

        news.set(data)
        var result = await news.save();

        if(result){

            return result.toJSON();
        }
        else{
            return false;
        }
    }
    else{

        return false;
    }

}


module.exports = {

    create_,
    find_all_,
    find_all_limit_,
    find_by_id_,
    delete_by_id_,
    update_by_id_
}

