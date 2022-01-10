const Sequelize = require('sequelize')
const sequelize = require('../database.js')
const DataTypes = Sequelize.DataTypes


// utilities function

async function my_sync()
{
    await sequelize.sync({alter:true})
    // await sequelize.sync()
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
    },

    role:{
        type:DataTypes.INTEGER,
        defaultValue:1
    }
})

// contact model
var contact = sequelize.define('contact',{

    id:{

        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        primaryKey: true
    },

    email:{

        type:DataTypes.STRING,
        defaultValue:"NA",
        set(value)
        {
            let lower_case = value.toLowerCase();
            console.log(lower_case);
            this.setDataValue('email',lower_case); 
        }
    },

    contact1:{

        type:DataTypes.BIGINT,
        defaultValue:0
    },

    contact2:{

        type:DataTypes.BIGINT,
        defaultValue:0
    },

    address:{

        type:DataTypes.TEXT,
        defaultValue:"NA",
    }

})

var motto = sequelize.define('motto',{

    id:{

        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        primaryKey: true
    },

    content:{

        type:DataTypes.TEXT,
        defaultValue:"NA"
    }

})

/// news

var news = sequelize.define('news',{

    id:{

        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        primaryKey: true
    },

    image:{

        type:DataTypes.STRING,
        defaultValue:"NA",
    },

    headline:{

        type:DataTypes.STRING,
        defaultValue:"NA"
    },

    link:{

        type:DataTypes.STRING,
        defaultValue:"NA"
    },

    article:{

        type:DataTypes.TEXT,
        defaultValue:"NA",
    }

})


var team = sequelize.define('team',{

    id:{

        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        primaryKey: true
    },

    image:{

        type:DataTypes.STRING,
        defaultValue:"NA",
    },

    name:{

        type:DataTypes.STRING,
        defaultValue:"NA"
    },

    position:{

        type:DataTypes.STRING,
        defaultValue:"NA"
    },

    bio:{

        type:DataTypes.TEXT,
        defaultValue:"NA",
    },

    contact1:{

        type:DataTypes.BIGINT,
        defaultValue:0
    },

    contact2:{

        type:DataTypes.BIGINT,
        defaultValue:0
    },

    email:{

        type:DataTypes.STRING,
        defaultValue:"NA"
    },

    linkedin:{

        type:DataTypes.STRING,
        defaultValue:"NA"
    },


    twitter:{

        type:DataTypes.STRING,
        defaultValue:"NA"
    }

})

var about = sequelize.define('about',{

    id:{

        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        primaryKey: true
    },

    aboutus:{

        type:DataTypes.TEXT,
        defaultValue:"NA"
    },

    philosophy:{

        type:DataTypes.TEXT,
        defaultValue:"NA"
    }


})


var certificate = sequelize.define('certificate',{

    id:{

        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        primaryKey: true
    },

    image:{

        type:DataTypes.STRING,
        defaultValue:"NA",
    },

    name:{

        type:DataTypes.STRING,
        defaultValue:"NA"
    },

    link:{

        type:DataTypes.STRING,
        defaultValue:"#"
    },

})

var testimonial = sequelize.define('testimonial',{

    id:{

        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        primaryKey: true
    },

    message:{

        type:DataTypes.TEXT,
        defaultValue:"NA"
    },

    author:{

        type:DataTypes.STRING,
        defaultValue:"NA"
    }

})

var client = sequelize.define('client',{


    id:{

        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        primaryKey: true
    },

    image:{

        type:DataTypes.STRING,
        defaultValue:"NA",
    },

    name:{

        type:DataTypes.STRING,
        defaultValue:"NA"
    },

    link:{

        type:DataTypes.STRING,
        defaultValue:"#"
    }

})

var partner = sequelize.define('partner',{


    id:{

        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        primaryKey: true
    },

    image:{

        type:DataTypes.STRING,
        defaultValue:"NA",
    },

    name:{

        type:DataTypes.STRING,
        defaultValue:"NA"
    },

    link:{

        type:DataTypes.STRING,
        defaultValue:"#"
    },
})

var product = sequelize.define('product',{


    id:{

        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        primaryKey: true
    },

    image1:{

        type:DataTypes.STRING,
        defaultValue:"NA",
    },

    image2:{

        type:DataTypes.STRING,
        defaultValue:"NA",
    },

    image3:{

        type:DataTypes.STRING,
        defaultValue:"NA",
    },

    name:{

        type:DataTypes.STRING,
        defaultValue:"NA"
    },

    link:{

        type:DataTypes.STRING,
        defaultValue:"#"
    },

    description :{

        type:DataTypes.TEXT,
        defaultValue:"NA"
    }
})

my_sync().then(()=>{console.log('synced sucessfully')})
// .catch((err)=>console.log('dbModels.js ->','could not sync database',{name:err.name , message : err.message}))



exports.user = user;
exports.contact = contact;
exports.motto = motto;
exports.news = news;
exports.team = team;
exports.about = about;
exports.certificate = certificate;
exports.testimonial = testimonial;
exports.partner = partner;
exports.client = client;
exports.product = product;