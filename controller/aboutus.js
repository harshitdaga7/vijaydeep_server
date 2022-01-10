const Sequelize = require('sequelize')
const sequelize = require('../database')
const About = require('../models/dbModels').about
const Testimonial =  require('../models/dbModels').testimonial
const Client = require('../models/dbModels').client
const Partner = require('../models/dbModels').partner
const Certificate = require('../models/dbModels').certificate
const fs = require('fs').promises;
var path = require('path')


async function delete_file_(name,id)
{
    try{

        var fileName = `${name}_${id}`
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

// about

async function create_or_update_about_(data)
{
    /**
     * data:{
     * 
     * content:
     * 
     * }
     */


    var abouts = await About.findAll();

    console.log("inside about",data);

    if(abouts.length < 1)
    {
        /// create
        var about = await About.create(data); 
        return about
    }
    else{

        /// update

        var about = abouts[0]

        about.set(data);

        var result = await about.save()

        return result;
    }
}

async function find_all_about_()
{
    var abouts = await About.findAll()

    if(abouts.length < 1)
    {
        return false;
    }
    else{

        return abouts[0].toJSON();
    }
}
// testimonial
async function create_testimonial_(data)
{
    /**
     * data:{
     * 
     * message:(optional)
     * author:(optional)
     * }
     */

     var testimonial = await Testimonial.create(data);

     if(testimonial)
     {
         return testimonial.toJSON();
     }
     else{
         return false;
     }

}

async function find_by_id_testimonial_(id)
{
    var testimonial = await Testimonial.findByPk(id);

    if(testimonial)
    {
        return testimonial.toJSON();

    }
    else{

        return false;
    }
}

async function find_all_testimonial_()
{
    var testimonial_arr = await Testimonial.findAll()

    if(testimonial_arr)
    {

        let result = testimonial_arr.map(test=>test.toJSON())
        return result;
    }
    else{

        return [];
    }
}


async function delete_by_id_testimonial_(id)
{
    
    try
    {
        const result = await Testimonial.destroy({where:{id:id}})
        // const r = await delete_file_(id);
        // console.log(r,result)
        return true;
        
    }
    catch(e)
    {
        return false;
    }

}

async function update_by_id_testimonial_(id,data)
{

    var test = await Testimonial.findByPk(id)

    if(test)
    {
        /// found

        test.set(data)
        var result = await test.save();

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

// client
async function create_client_(data)
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

     var client = await Client.create(data);

     if(client)
     {
         return client.toJSON();
     }
     else{
         return false;
     }

}

async function find_by_id_client_(id)
{
    var client = await Client.findByPk(id);

    if(client)
    {
        return client.toJSON();

    }
    else{

        return false;
    }
}

async function find_all_client_()
{
    var client_arr = await Client.findAll()

    if(client_arr)
    {

        let result = client_arr.map(client=>client.toJSON())
        return result;
    }
    else{

        return [];
    }
}

async function delete_by_id_client_(id)
{
    
    try
    {
        const result = await Client.destroy({where:{id:id}})
        const r = await delete_file_('client',id);

        console.log(r,result)
        return true;
        
    }
    catch(e)
    {
        return false;
    }

}

async function update_by_id_client_(id,data)
{

    var client = await Client.findByPk(id)

    if(client)
    {
        /// found

        client.set(data)
        var result = await client.save();

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

// partner

async function create_partner_(data)
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

     var partner = await Partner.create(data);

     if(partner)
     {
         return partner.toJSON();
     }
     else{
         return false;
     }

}

async function find_by_id_partner_(id)
{
    var partner = await Partner.findByPk(id);

    if(partner)
    {
        return partner.toJSON();

    }
    else{

        return false;
    }
}

async function find_all_partner_()
{
    var partner_arr = await Partner.findAll()

    if(partner_arr)
    {

        let result = partner_arr.map(partner=>partner.toJSON())
        return result;
    }
    else{

        return [];
    }
}

async function delete_by_id_partner_(id)
{
    
    try
    {
        const result = await Partner.destroy({where:{id:id}})
        const r = await delete_file_('partner',id);

        console.log(r,result)
        return true;
        
    }
    catch(e)
    {
        return false;
    }

}

async function update_by_id_partner_(id,data)
{

    var partner = await Partner.findByPk(id)

    if(partner)
    {
        /// found

        partner.set(data)
        var result = await partner.save();

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

// certificates

async function create_certificate_(data)
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

     var certificate = await Certificate.create(data);

     if(certificate)
     {
         return certificate.toJSON();
     }
     else{
         return false;
     }

}

async function find_by_id_certificate_(id)
{
    var certificate = await Certificate.findByPk(id);

    if(certificate)
    {
        return certificate.toJSON();

    }
    else{

        return false;
    }
}

async function find_all_certificate_()
{
    var certificate_arr = await Certificate.findAll()

    if(certificate_arr)
    {

        let result = certificate_arr.map(certificate=>certificate.toJSON())
        return result;
    }
    else{

        return [];
    }
}

async function delete_by_id_certificate_(id)
{
    
    try
    {
        const result = await Certificate.destroy({where:{id:id}})
        const r = await delete_file_('certificate',id);

        console.log(r,result)
        return true;
        
    }
    catch(e)
    {
        return false;
    }

}

async function update_by_id_certificate_(id,data)
{

    var certificate = await Certificate.findByPk(id)

    if(certificate)
    {
        /// found

        certificate.set(data)
        var result = await certificate.save();

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

    create_testimonial_,
    find_all_testimonial_,
    find_by_id_testimonial_,
    delete_by_id_testimonial_,
    update_by_id_testimonial_,
    create_client_,
    find_all_client_,
    find_by_id_client_,
    delete_by_id_client_,
    update_by_id_client_,
    create_partner_,
    find_all_partner_,
    find_by_id_partner_,
    delete_by_id_partner_,
    update_by_id_partner_,
    create_certificate_,
    find_all_certificate_,
    find_by_id_certificate_,
    delete_by_id_certificate_,
    update_by_id_certificate_,
    find_all_about_,
    create_or_update_about_
}