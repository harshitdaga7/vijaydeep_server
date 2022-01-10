const Sequelize = require('sequelize')
const sequelize = require('../database')
const Product = require('../models/dbModels').product
const fs = require('fs').promises;
var path = require('path')


async function create_(data)
{
    /**
     * data:{
     * 
     * image1:(optional)
     * image2:(optional)
     * image3:(optional)
     * name:(optional)
     * link:(optional)
     * description:(optional)
     * }
     */

     var product = await Product.create(data);

     if(product)
     {
         return product.toJSON();
     }
     else{
         return false;
     }

}

async function find_by_id_(id)
{
    var product = await Product.findByPk(id);

    if(product)
    {
        return product.toJSON();

    }
    else{

        return false;
    }
}

async function find_all_()
{
    var product_arr = await Product.findAll({order : [['createdAt','DESC']]})

    if(product_arr)
    {

        let result = product_arr.map(product=>product.toJSON())
        return result;
    }
    else{

        return false;
    }
}



async function delete_file_(id)
{
    try{

        var fileName1 = `product1_${id}`
        var pth1 = path.join(__dirname,'..','public','images') + `/${fileName1}`

        var fileName2 = `product2_${id}`
        var pth2 = path.join(__dirname,'..','public','images') + `/${fileName2}`

        var fileName3 = `product3_${id}`
        var pth3 = path.join(__dirname,'..','public','images') + `/${fileName3}`

        await fs.unlink(pth1);
        await fs.unlink(pth2);
        await fs.unlink(pth3);

        console.log('deleted successsfully')
        return true;
    }
    catch(e)
    {
        console.log(e);
        return false;
    }
}

async function delete_by_id_(id)
{
    
    try
    {
        const result = await Product.destroy({where:{id:id}})
        const r = await delete_file_(id);

        if(result)
        {
            return true;
        }
        else{

            return false;
        }
        
    }
    catch(e)
    {
        return false;
    }

}

async function update_by_id_(id,data)
{

    var product = await Product.findByPk(id)

    if(product)
    {
        /// found

        product.set(data)
        var result = await product.save();

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
}

