/**
 * This module establishes database connection
 * exports : sequelize instance to be used to create models
 */

const Sequelize = require('sequelize')
require('dotenv').config() /// setting up dotenv



// connecting to database
var sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        dialect: 'mysql',
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        dialectOptions: {}
  })

/// testing the connection

async function test_connection()
{
    await sequelize.authenticate()
}

try {

    test_connection().then(()=>{console.log("Connection has been established successfully.")});
    
  } 
  catch (error) 
  {
    console.error('Unable to connect to the database:', error);
  }

/// exporting the connected object
module.exports = sequelize;








