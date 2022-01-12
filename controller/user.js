const Sequelize = require('sequelize')
const sequelize = require('../database')
const User = require('../models/dbModels').user 
const bcrypt = require('bcrypt')

async function create_(data)
{
    /**
     * data = {
     *  email:email
     *  password:password
     *  role : (optional)
     * }
     */

    let salt = await bcrypt.genSalt(10)
    let hashed = await bcrypt.hash(data.password,salt);
    data.password = hashed;

    const user = await User.create(data);

    return user;
}

async function find_one_(conditions)
{
    /**
     * conditions look in sequelize
     * conditions : {title : my_title  , name : my_name}
     * 
     * 
     */

    try{

        const user = await User.findOne({where:conditions})

        if(user) return user;

        return false;

    }
    catch(e)
    {
        return false;
    }

}

async function find_all_()
{
    // return promise<array<model>>
    const users = await User.findAll()

    return users;
}

async function update_password_(email, password)
{
    /**
     
     *  email:email
     *  password:password
     *  role : (optional)
     * 
     */

     let salt = await bcrypt.genSalt(10)
     let hashed = await bcrypt.hash(password,salt);
     password = hashed;


     const user = await find_one_({email:email})

     user.set({
         password:password
     })

     const result = await user.save();

     return result;

    
}

async function delete_(conditions)
{
    /**
     * conditions look in sequelize
     * conditions : {title : my_title  , name : my_name}
     */

    const result = await User.destroy({where:conditions})

    return result;
}



module.exports = {

    create_,
    find_one_,
    delete_,
    find_all_,
    update_password_
}





