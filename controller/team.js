const Sequelize = require('sequelize')
const sequelize = require('../database')
const Team = require('../models/dbModels').team
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

     var team = await Team.create(data);

     if(team)
     {
         return team.toJSON();
     }
     else{
         return false;
     }

}

async function find_by_id_(id)
{
    var team = await Team.findByPk(id);

    if(team)
    {
        return team.toJSON();

    }
    else{

        return false;
    }
}

async function find_all_()
{
    var team_arr = await Team.findAll()

    if(team_arr)
    {

        let result = team_arr.map(team=>team.toJSON())
        return result;
    }
    else{

        return false;
    }
}


async function find_by_position_(position)
{
    var team_arr = await Team.findAll({where:{position:position}})
    if(team_arr)
    {
        let result = team_arr.map(team=>team.toJSON())
        return result;
    }
    else{

        return false;
    }
}


async function delete_file_(id)
{
    try{

        var fileName = `team_${id}`
        var pth = path.join(__dirname,'..','public','images') + `/${fileName}`
        await fs.unlink(pth);
        //console.log('deleted successsfully')
        return true;
    }
    catch(e)
    {
        //console.log(e);
        return false;
    }
}

async function delete_by_id_(id)
{
    
    try
    {
        const result = await Team.destroy({where:{id:id}})
        const r = await delete_file_(id);

        //console.log(r,result)
        return true;
        
    }
    catch(e)
    {
        return false;
    }

}

async function update_by_id_(id,data)
{

    var team = await Team.findByPk(id)

    if(team)
    {
        /// found

        team.set(data)
        var result = await team.save();

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
    find_by_id_,
    delete_by_id_,
    update_by_id_,
    find_by_position_
}

