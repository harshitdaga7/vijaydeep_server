var newsController = require('../controller/news')

async function test_create(x)
{
    var data = {

        image:"hello_world.jpg",
        headline:`test ${x} headling`,
        article:`test ${x} article \n test`,
        link:"test link.com"
    }

    try
    {
        let res = await newsController.create_(data);

        console.log(res)
    }
    catch(err)
    {
        console.log(err)
    }
}

for(let i = 6;i<9;i++)
{
    test_create(i);
}

async function test_find_all()
{
    try{

        var res = await newsController.find_all_()
        console.log(res)

    }
    catch(e)
    {
        console.log(e);
    }
}

// test_find_all()

async function test_find_all_lim()
{
    try{

        var res = await newsController.find_all_limit_(3)
        console.log(res)
    }
    catch(e)
    {
        console.log(e)

    }
}

// test_find_all_lim()

async function test_find_by_id(id)
{
    try{

        var res = await newsController.find_by_id_(id);
        console.log(res)
    }
    catch(err)
    {
        console.log(err);
    }
}

async function test_update_by_id(id)
{
    try{
        var data = {

            image:"hello_world.jpg",
            headline:`test up headling`,
            article:`test up article \n test`,
            link:"test up link.com"
        }

        var res = await newsController.update_by_id_(id,data);
        console.log(res)
    }
    catch(err)
    {
        console.log(err);
    }
}

async function test_delete_by_id(id)
{
    try{
        var data = {

            image:"hello_world.jpg",
            headline:`test up headling`,
            article:`test up article \n test`,
            link:"test up link.com"
        }

        var res = await newsController.delete_by_id_(id);
        console.log(res)
    }
    catch(err)
    {
        console.log(err);
    }
}
module.exports = {

    test_find_all_lim,
    test_find_all,
    test_find_by_id,
    test_update_by_id,
    test_delete_by_id
}
