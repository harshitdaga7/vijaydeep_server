const Sequelize = require('sequelize')
const userController = require('../controller/user')

const test_data_1 = {

    email:'test5@gmail.com',
    password:'helloworld'
}

const test_data_2 = {

    email:'test6@gmail.com',
    password:'helloworld1234567',
    role:2
}

async function test00()
{
    /// create test

    const res = await userController.create_(test_data_1);

    console.log(res.toJSON())
}

async function test01()
{
    /// create test with role

    const res = await userController.create_(test_data_2);
}
async function test02()
{
    // testing find functions


    const res1 = await userController.find_all_()
    console.log("res1")
    console.log(res1)
    // console.log("res1")

    const res2 = await userController.find_one_({email:"test5@gmail.com"})
    console.log("res2")
    console.log(res2)

    const res3 = await userController.find_one_({email:"harshit3@gmail.com"})
    console.log("res3")
    console.log(res3)
}

async function test03()
{
    /// testing update function

    const res = await userController.update_password_('test6@gmail.com',"hello");

    console.log(res)
}

async function test04()
{
    /// delete testing

    const res = await userController.delete_({email:'test@gmail.com'})

    console.log(res)
}

test00()
test01()
// test02()
// test03()

// test04()



