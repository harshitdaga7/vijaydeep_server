function handle_news()
{
    

    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
    
        fetch("/api/news/all/0", requestOptions)
        .then((response) => response.json())
        .then((result) => {

            console.log(result)
    
            if(result.success)
            {
                
                // console.log(localStorage.getItem('token'))
                var news_container = document.getElementById('news_container')
                var cont = ""
                for(let i = 0;i<result.data.length;i++)
                {
                    
                    if(i%2 == 0)
                    {
                        let d = `
                        
                        <div class="row m-5 border  rounded-3 border-1 shadow-lg " id="news_${result.data[i].id}" >
            
                
                            <div class="col-md-12 col-sm-12 col-lg-3 bg-light position-sticky pt-3 pl-5 " style="display: flex;
                            align-items: center;
                            justify-content: center;">
                             <div style=" height: 144px;
                             width: 256px;
                           overflow:hidden;
                           display: flex;
                           align-items: center;
                           justify-content: center;" class="my-auto mx-auto border border-5 " >   
                            <img loading="lazy" style="max-width:238px; min-width:256px" src="/images/${result.data[i].image}" class="zoom d-block w-100" alt="NA">
                            </div>
                            </div>
                            <div class="col-md-12 col-sm-12 col-lg-9 bg-light p-5" style="overflow:hidden; z-index: 50;">
                                <h1 >${result.data[i].headline}</h1>
                                <p class="small">
                                    <img src="/images/icons/icons8-calendar-30.png" height="26px" width="auto"> ${result.data[i].updatedAt}
                                </p>
                                <p style="font-size: medium; ">${result.data[i].article}</p>
                                <a style="color: #2f2481; font-size: small " href="${result.data[i].link}">Check out this link</a>
                
                            </div>
                        
            
            
                    </div>`

                     cont+=d;

                    }
                    else{


                        let d = `
                    <div class="row m-5 border rounded-3 border-1 shadow-lg" id = "news_${result.data[i].id}" style="overflow:hidden; " >
                            
                    <div class="col-md-12 col-sm-12 col-lg-9 bg-light p-5" style="overflow:hidden; z-index: 50;">
                    <h1 >${result.data[i].headline}</h1>
                    <p class="small">
                        <img src="/images/icons/icons8-calendar-30.png" height="26px" width="auto"> ${result.data[i].updatedAt}
                    </p>
                    <p style="font-size: medium; ">${result.data[i].article}</p>
                    <a style="color: #2f2481; font-size: small " href="${result.data[i].link}">Check out this link</a>
                    </div>

                        <div class="col-md-12 col-sm-12 col-lg-3 bg-light position-sticky pb-3 pr-5 " style="display: flex;
                            align-items: center;
                            justify-content: center;">
                             <div style=" height: 144px;
                             width: 256px;
                           overflow:hidden;
                           display: flex;
                           align-items: center;
                           justify-content: center;" class="my-auto mx-auto border border-5 " >   
                            <img loading="lazy" style="max-width:238px; min-width:256px" src="/images/${result.data[i].image}" class="zoom d-block w-100" alt="NA">
                            </div>
                            </div>
            
            
                    </div>
                        `
                    
                    
                    cont += d;

                    }


                   
                    
                }

                news_container.innerHTML = cont;
            }
            else
            {
                alert(result.message)
            }
            
        })
        .catch(error => console.log('error', error));

    
}


/*************** calling functions ************** */

handle_news()