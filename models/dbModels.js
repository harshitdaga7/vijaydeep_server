const Sequelize = require('sequelize')
const sequelize = require('../database.js')
const bcrypt = require('bcrypt')
const DataTypes = Sequelize.DataTypes


// utilities function

async function my_sync()
{
    await sequelize.sync()
}

// user model

var user = sequelize.define('user',{

    id:{

        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        primaryKey: true
    },

    email:{

        type:DataTypes.STRING,
        allowNull:false,
        unique:true,

        set(value)
        {
            let lower_case = value.toLowerCase();
            console.log(lower_case);
            this.setDataValue('email',lower_case); 
        }
    },

    password:{

        type:DataTypes.STRING,
        allowNull:false
    }
})


my_sync().then(()=>{console.log('synced sucessfully')})



exports.user = user;