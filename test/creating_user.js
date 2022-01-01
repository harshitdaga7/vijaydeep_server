const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const User = require('../models/dbModels').user;

const correct_data = {

    email:"test@gmail.com",
    password:"test1234567890"
}

const correct_data1 = {

    
    email:"test1@gmail.com",
    password:"test1234567890h"
}

const email_empty = {

    password:"test1234567890"
}

const email_repeated = {

    email:"test@gmail.com",
    password:"12345677"
}

const password_empty = {

    email:"test1234@gmail.com"
}


async function test00()
{
    /// create user
    
    const user = await User.create({

        email:"test@gmail.com",
        password:"test1234567890",
    });
    console.log(user.toJSON());
}
async function test05()
{
    /// create user
    
    const user = await User.create({

        email:"Test2@gmail.com",
        password:"test1234567890",
    });
    console.log(user.toJSON());
}
async function test01()
{
    const user = await User.create(correct_data1);
    console.log(user.toJSON());

}

async function test02()
{
    const user = await User.create(email_empty)

}

async function test03()
{
    try{
        
        const user = await User.create(email_repeated);
        console.log(user.toJSON())
    }
    catch(e)
    {
        console.log("some error occured")
    }
}

async function test04()
{
    const user = await User.create(password_empty)

}
// testing function
// test00()
// test01()
// test02()
// test04()

// test03()

// test05()
