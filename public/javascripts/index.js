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



// call function

index_news_handle()