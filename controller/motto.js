const Sequelize = require('sequelize')
const sequelize = require('../database')
const Motto = require('../models/dbModels').motto;

async function create_or_update_(data)
{
    /**
     * data:{
     * 
     * content:
     * 
     * }
     */


    var mottos = await Motto.findAll();

    console.log("inside motto",data);

    if(mottos.length < 1)
    {
        /// create
        var motto = await Motto.create(data); 
        return motto
    }
    else{

        /// update

        var motto = mottos[0]

        motto.set(data);

        var result = await motto.save()

        return result;
    }
}

async function find_all_()
{
    var mottos = await Motto.findAll()

    if(mottos.length < 1)
    {
        return false;
    }
    else{

        return mottos[0].toJSON();
    }
}

module.exports = {

    create_or_update_,
    find_all_,
    
}