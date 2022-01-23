function create_team(position = "director")
{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
    
        fetch("/api/team/all/", requestOptions)
        .then((response) => response.json())
        .then((result) => {

            console.log(result)
    
            if(result.success)
            {
                
                // console.log(localStorage.getItem('token'))
                console.log('inside html')
                var team_rest = document.getElementById('team_rest')
                var team_head = document.getElementById('team_head')

                var cont_head = ""
                var cont_rest = ""
                
                for(let i = 0;i<result.data.length;i++)
                {
                    
                    if(result.data[i].position.toLowerCase() == position.toLowerCase())
                    {
                        let d = `
                        <div class="col-lg-6 text-center p-5" style = "height:inherit">
                            <div style=" display:flex;
                            justify-content:center;
                            flex-direction: column; background-image: url(/images/endless-constellationwhite.svg); overflow:hidden;
                            align-items:center;height:900px;" class="  border p-5 border-2 rounded-3 shadow ">
            
            
                                <div style=" display: flex;
                                align-items: center;
                                justify-content: center;max-height:400px; max-width:400px; border-radius: 50%; width:100%; overflow: hidden;"
                                class="ratio ratio-1x1 shadow mx-auto">
                                    <img loading = "lazy" class="shadow mx-auto" style=" object-fit: cover; " src="/images/${result.data[i].image}" />
                                </div>
            
                                <div class="mt-3">
                                <h2 style="white-space:pre-wrap;">${result.data[i].name}</h2>
                                <h5 style="white-space:pre-wrap;">${result.data[i].position}</h5>
                                <div style="max-height:150px; overflow:hidden">
                                <h4 style="font-size: medium; white-space:pre-wrap; ">${result.data[i].bio}</h4>
            
                                    <hr>
                                    <div style="margin: 5%;"> 
                                        <img src="/images/icons/icons8-phone-ringing.png" height="26px" width="auto">
                                            &nbsp;
                                            <a href="tel:+91${result.data[i].contact1}" class="link-danger" style=" font-size: 0.75pc; color:rgb(17, 17, 17) ; text-decoration: none;">${result.data[i].contact1}</a> 
                                            |
                                            <a href="tel:+91${result.data[i].contact2}" class="link-danger" style=" font-size: 0.75pc; color:rgb(17, 17, 17) ; text-decoration: none;">${result.data[i].contact2}</a>
                                    </div>
            
                                    <div style="margin: 5%;"> <img src="/images/icons/icons8-gmail-logo.png" height="26px" width="auto">
                                        &nbsp; 
                                        <a href="mailto:${result.data[i].email}" class="link-danger"
                                            style="font-size: 0.75pc; color:rgb(17, 17, 17) ; text-decoration: none;">${result.data[i].email}</a>
                                    </div>
            
            
                                    <hr>
                                    <a style="text-decoration: none; margin-right: 5px;" href="${result.data[i].linkedin}">
                                        <img src="/images/icons/linkedin.png" height="26px" width="auto">
                                    </a>
                                    <a style="text-decoration: none; margin-right: 5px;" href="${result.data[i].twitter}">
                                        <img src="/images/icons/twitter.png" height="26px" width="auto">
                                    </a>
            
            
                                </div>
            
                            </div>
                        </div>
                    </div>
                        `

                        cont_head += d;
                    }
                    else{

                        let d = `

                        <div class="col-md-6 col-lg-4 text-center p-5 " style = "height:inherit; ">
                        <div style="display:flex;justify-content:center;flex-direction: column; align-items:center;height:900px;  background-image: url(/images/endless-constellationwhite.svg); overflow:hidden" class="  border p-5 border-2 rounded-3 shadow ">
                             <div style=" display: flex;
                            align-items: center;
                            justify-content: center;max-height:400px; max-width:400px; border-radius: 50%; width:100%; overflow: hidden;"
                            class="ratio ratio-1x1 shadow mx-auto">
                                <img class="shadow mx-auto" style="object-fit:cover" src="/images/${result.data[i].image}" />
                            </div>
        
                            <div class="mt-3" >
                            
                            
                                <h2 style="white-space:pre-wrap;">${result.data[i].name}</h2>
                                <h5 style="white-space:pre-wrap;">${result.data[i].position}</h5>
                                <div style="max-height:150px; overflow:hidden">
                                <h4 style="font-size: medium; white-space:pre-wrap; ">${result.data[i].bio}</h4>
                            
                                </div>    
        
                                <hr>
                                <div style="margin: 5%;"> 
                                <img src="/images/icons/icons8-phone-ringing.png" height="26px" width="auto">
                                    &nbsp;
                                    <a href="tel:+91${result.data[i].contact1}" class="link-danger"
                                        style="font-size: 0.75pc; color:rgb(17, 17, 17) ; text-decoration: none;">${result.data[i].contact1}</a> 
                                    |
                                    <a href="tel:+91${result.data[i].contact2}" class="link-danger"style=" font-size: 0.75pc; color:rgb(17, 17, 17) ; text-decoration: none;">+91${result.data[i].contact2}</a>
                                </div>
        
                                <div style="margin: 5%;"> <img src="/images/icons/icons8-gmail-logo.png" height="26px" width="auto">
                                    &nbsp; <a href="mailto:${result.data[i].email}" class="link-danger"
                                        style="font-size: 0.75pc; color:rgb(17, 17, 17) ; text-decoration: none;">${result.data[i].email}</a>
                                </div>
        
        
                                <hr>
                                <a style="text-decoration: none; margin-right: 5px;" href="${result.data[i].linkedin}">
                                    <img src="/images/icons/linkedin.png" height="26px" width="auto">
                                </a>
                                <a style="text-decoration: none; margin-right: 5px;" href="${result.data[i].twitter}">
                                    <img src="/images/icons/twitter.png" height="26px" width="auto">
                                </a>
        
                            </div>
        
                        </div>
                    </div>
                        
                        `

                        cont_rest += d;

                    }

                    
                    
                }

                team_head.innerHTML =  cont_head;
                team_rest.innerHTML =  cont_rest;
            }
            else
            {
                alert(result.message)
            }
            
        })
        .catch(error => console.log('error', error));
    
}


create_team();