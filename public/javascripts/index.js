// function index_product_handle()
// {

// }


function index_news_handle()
{
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    // "email": email,
    // "contact1": contact1,
    // "contact2":contact2,
    // "address":address
    // });

    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch("/api/news/all/5", requestOptions)
    .then((response) => response.json())
    .then((result) => {

        if(result.success)
        {
            
            // console.log(localStorage.getItem('token'))
            var news_body = document.getElementById('news_body')
            var cont = ""
            for(let i = 0;i<result.data.length;i++)
            {
                let d = 
                `<a id = "news_${result.data[i].id}" href="/news/#news_${result.data[i].id}"
                    class="list-group-item list-group-item-action d-flex gap-3 py-3 content-hover-red"
                    aria-current="true">
                    <div class="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <h6 class="mb-0">${result.data[i].headline}</h6>
                            <p class="mb-0 opacity-75">${result.data[i].article}</p>
                        </div>
                        <small class="opacity-50 text-nowrap">${result.data[i].updatedAt}</small>
                    </div>
                </a>`

                cont += d;
                
            }

            news_body.innerHTML = cont;
        }
        else
        {
            alert(result.message)
        }
        
    })
    .catch(error => console.log('error', error));
}

function index_product_handle()
{
    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
    
        fetch("/api/product/all", requestOptions)
        .then((response) => response.json())
        .then((result) => {
    
            if(result.success)
            {
                
                // console.log(localStorage.getItem('token'))
                var products_body = document.getElementById('products_body')
                var l = Math.min(5,result.data.length);
                var cont = ""
                for(let i = 0;i<l;i++)
                {
                    let img = "NA";

                    if(result.data[i].image3 != "NA") img = result.data[i].image3;
                    if(result.data[i].image2 != "NA") img = result.data[i].image2;
                    if(result.data[i].image1 != "NA") img = result.data[i].image1;

                    let d = 
                    `
                    
                        <div class="col-12 mb-4">
                        
                            <div class="card shadow-lg content-hover-red">
                            <a href = "/products/#product_${result.data[i].id}" class ="stretched-link"><img loading = "lazy" src="/images/${img}" height="300px" class="card-img-top" alt="NA"> </a>
                                <div class="card-body">
                                    <h5 class="card-title">${result.data[i].name}</h5>
                                    <p class="card-text">${result.data[i].description}</p>
                                </div>
                            </div>
                        </div>

                    `
    
                    cont += d;
                    
                }
    
                products_body.innerHTML = cont;
            }
            else
            {
                alert(result.message)
            }
            
        })
        .catch(error => console.log('error', error));
}


// call function

index_news_handle()
index_product_handle();