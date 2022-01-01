const Sequelize = require('sequelize')
const sequelize = require('../database')
const Contact = require('../models/dbModels').contact 

async function create_or_update_(data)
{
    /**
     * data:{
     * 
     * email: (optional)
     * contact1: (optional)
     * contact2: (optional)
     * address: (optional)
     * 
     * }
     */


    var contacts = await Contact.findAll();

    if(contacts.length < 1)
    {
        /// create
        var contact = await Contact.create(data); 
        return contact
    }
    else{

        /// update

        var contact = contacts[0]

        contact.set(data);

        var result = await contact.save()

        return result;
    }
}

async function find_all_()
{
    var contacts = await Contact.findAll()

    if(contacts.length < 1)
    {
        return false;
    }
    else{

        return contacts[0].toJSON();
    }
}

module.exports = {

    create_or_update_,
    find_all_,
    
}

