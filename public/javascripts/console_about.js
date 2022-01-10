
function load_delete(btn_id,name)
{

    var id = btn_id.split('_').pop();
    console.log(id)
    var myModal = new bootstrap.Modal(document.getElementById(`delete${name}Modal`))
    myModal.show();

    let d = `
    <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="deleteArticleModalLabel">Confirm Delete ?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <span class="text-secondary" style="font-size: 15px;"> Are you sure you want to Delete: ${name} -> ${id}<blue class="text-primary"></blue> ? </span>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" 
            data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger bg-gradient text-light" name = "${name}" id="${id}" onclick="handle_delete(this.id,this.name)">Delete</button>
        </div>
    </div>
</div>
    `
    
    document.getElementById(`delete${name}Modal`).innerHTML = d;
}

function handle_delete(id,name)
{
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
        };
    
    fetch(`/api/${name}/find/${id}`,requestOptions)
    .then((response)=>response.json())
    .then((result)=>{

        if(result.success)
        {
            console.log(result);
            alert(result.message);
            location.reload();
            
        }
        else{

            console.log(result)

            alert("error" + result.message);
        }
    })
    .catch((err)=>{console.log(err)})
}

function handle_about(e)
{
    e.preventDefault();

    var about_aboutus_input = document.getElementById('about_aboutus_input')
    var about_philosophy_input = document.getElementById('about_philosophy_input')

    if(about_aboutus_input.reportValidity() && about_philosophy_input.reportValidity())
    {
        var aboutus = about_aboutus_input.value;
        var philosophy = about_philosophy_input.value;
    
        /// fetch api

        console.log("inside about",aboutus,philosophy)
    
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({

            aboutus:aboutus,
            philosophy:philosophy
        });
    
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
    
        fetch("/api/aboutus/update", requestOptions)
        .then((response) => response.json())
        .then((result) => {

            if(result.success)
            {
                alert(result.message)
                // console.log(localStorage.getItem('token'))
                location.reload();
            }
            else
            {
                alert(result.message)
            }
            
        })
        .catch(error => console.log('error', error));
    }
}

// certificate

function load_certificate_cards()
{
    

    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
    
        fetch("/api/certificate/all/", requestOptions)
        .then((response) => response.json())
        .then((result) => {

            console.log(result)
    
            if(result.success)
            {
                
                // console.log(localStorage.getItem('token'))
                var certificate_container = document.getElementById('certificate_container')
                var cont = ""
                for(let i = 0;i<result.data.length;i++)
                {
                    
                    let d = `
                        <div class="list-group-item list-group-item-action d-flex gap-3 py-3 content-hover-red"
                        aria-current="true">


                        <div style="max-height:100px; max-width:100px; overflow: hidden;"
                            class="ratio ratio-1x1 shadow mx-auto">
                            <img class="" src="/images/${result.data[i].image}">
                        </div>

                        <div class="d-flex gap-2 w-100 justify-content-between">
                            <!--<button type="button" class="btn text-start" id="update_certificate_btn_${result.data[i].id}" onclick="load_update_certificate(this.id)"> -->
                                <h5 class="mb-0 my-2">${result.data[i].name}</h5>
                           <!--  </button> -->
                        </div>



                        <button type="button" class="btn-close" id="delete_certificate_btn_${result.data[i].id}" name = "certificate" onclick = "load_delete(this.id,this.name)"></button>
                    </div>
                    `

                    cont += d;

                    
                    
                }

                certificate_container.innerHTML = cont;
            }
            else
            {
                alert(result.message)
            }
            
        })
        .catch(error => console.log('error', error));

    
}

function handle_certificate_create(e)
{
    e.preventDefault();

    console.log('inside certificate')

    var formData = new FormData();

    var certificate_name_input = document.getElementById('certificate_name_input');
    var certificate_link_input = document.getElementById('certificate_link_input')
    var certificate_image_input = document.getElementById('certificate_image_input')


    formData.append('name',certificate_name_input.value);
    formData.append('link',certificate_link_input.value);
    formData.append('image',certificate_image_input.files[0]);

    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
        };

    fetch('/api/certificate/create', requestOptions)
    .then((response)=>response.json())
    .then((result)=>{

        if(result.success)
        {
            alert(result.message);
            location.reload();
        }
        else{


            alert(result.message);
        }


    })
    .catch((err)=>{
        console.log(err)
        alert(err.message)
    })
}


// partners


function load_partner_cards()
{
    

    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
    
        fetch("/api/partner/all/", requestOptions)
        .then((response) => response.json())
        .then((result) => {

            console.log(result)
    
            if(result.success)
            {
                
                // console.log(localStorage.getItem('token'))
                var partner_container = document.getElementById('partner_container')
                var cont = ""
                for(let i = 0;i<result.data.length;i++)
                {
                    
                    let d = `
                        <div class="list-group-item list-group-item-action d-flex gap-3 py-3 content-hover-red"
                        aria-current="true">


                        <div style="max-height:100px; max-width:100px; overflow: hidden;"
                            class="ratio ratio-1x1 shadow mx-auto">
                            <img loading = "lazy" src="/images/${result.data[i].image}">
                        </div>

                        <div class="d-flex gap-2 w-100 justify-content-between">
                            <!--<button type="button" class="btn text-start" id="update_partner_btn_${result.data[i].id}" onclick="load_update_partner(this.id)"> -->
                                <h5 class="mb-0 my-2">${result.data[i].name}</h5>
                           <!--  </button> -->
                        </div>



                        <button type="button" class="btn-close" id="delete_partner_btn_${result.data[i].id}" name = "partner" onclick = "load_delete(this.id,this.name)"></button>
                    </div>
                    `

                    cont += d;

                    
                    
                }

                partner_container.innerHTML = cont;
            }
            else
            {
                alert(result.message)
            }
            
        })
        .catch(error => console.log('error', error));

    
}

function handle_partner_create(e)
{
    e.preventDefault();

    console.log('inside partner')

    var formData = new FormData();

    var partner_name_input = document.getElementById('partner_name_input');
    var partner_link_input = document.getElementById('partner_link_input')
    var partner_image_input = document.getElementById('partner_image_input')


    formData.append('name',partner_name_input.value);
    formData.append('link',partner_link_input.value);
    formData.append('image',partner_image_input.files[0]);

    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
        };

    fetch('/api/partner/create', requestOptions)
    .then((response)=>response.json())
    .then((result)=>{

        if(result.success)
        {
            alert(result.message);
            location.reload();
        }
        else{


            alert(result.message);
        }


    })
    .catch((err)=>{
        console.log(err)
        alert(err.message)
    })
}

/// testimonial

function load_testimonial_cards()
{
    

    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
    
        fetch("/api/testimonial/all/", requestOptions)
        .then((response) => response.json())
        .then((result) => {

            console.log(result)
    
            if(result.success)
            {
                
                // console.log(localStorage.getItem('token'))
                var testimonial_container = document.getElementById('testimonial_container')
                var cont = ""
                for(let i = 0;i<result.data.length;i++)
                {
                    
                    let d = `
                    
                    <div class="list-group-item list-group-item-action d-flex gap-3 py-3 content-hover-red"
                        aria-current="true">


                        <div class="row">

                            <div class = "col-12 mb-3 text-start"><h5>${result.data[i].message}</h5></div>
                            <div class = "col-12 text-start"><p>-${result.data[i].author}</p></div>
                        </div>



                        <button type="button" class="btn-close ms-auto" id="delete_testimonial_btn_${result.data[i].id}" name = "testimonial" onclick = "load_delete(this.id,this.name)"></button>
                    </div>
                    `

                    cont += d;

                    
                    
                }

                testimonial_container.innerHTML = cont;
            }
            else
            {
                alert(result.message)
            }
            
        })
        .catch(error => console.log('error', error));

    
}

function handle_testimonial_create(e)
{
    e.preventDefault();

    console.log('inside testimonial')

    var formData = new FormData();

    var testimonial_author_input = document.getElementById('testimonial_author_input');
    var testimonial_message_input = document.getElementById('testimonial_message_input');


    formData.append('message',testimonial_message_input.value);
    formData.append('author',testimonial_author_input.value);

    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
        };

    fetch('/api/testimonial/create', requestOptions)
    .then((response)=>response.json())
    .then((result)=>{

        if(result.success)
        {
            alert(result.message);
            location.reload();
        }
        else{


            alert(result.message);
        }


    })
    .catch((err)=>{
        console.log(err)
        alert(err.message)
    })
}



/// clients

function load_client_cards()
{
    

    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
    
        fetch("/api/client/all/", requestOptions)
        .then((response) => response.json())
        .then((result) => {

            console.log(result)
    
            if(result.success)
            {
                
                // console.log(localStorage.getItem('token'))
                var client_container = document.getElementById('client_container')
                var cont = ""
                for(let i = 0;i<result.data.length;i++)
                {
                    
                    let d = `
                        <div class="list-group-item list-group-item-action d-flex gap-3 py-3 content-hover-red"
                        aria-current="true">


                        <div style="max-height:100px; max-width:100px; overflow: hidden;"
                            class="ratio ratio-1x1 shadow mx-auto">
                            <img loading = "lazy" src="/images/${result.data[i].image}">
                        </div>

                        <div class="d-flex gap-2 w-100 justify-content-between">
                            <!--<button type="button" class="btn text-start" id="update_client_btn_${result.data[i].id}" onclick="load_update_client(this.id)"> -->
                                <h5 class="mb-0 my-2">${result.data[i].name}</h5>
                           <!--  </button> -->
                        </div>



                        <button type="button" class="btn-close" id="delete_client_btn_${result.data[i].id}" name = "client" onclick = "load_delete(this.id,this.name)"></button>
                    </div>
                    `

                    cont += d;

                    
                    
                }

                client_container.innerHTML = cont;
            }
            else
            {
                alert(result.message)
            }
            
        })
        .catch(error => console.log('error', error));

    
}

function handle_client_create(e)
{
    e.preventDefault();

    console.log('inside client')

    var formData = new FormData();

    var client_name_input = document.getElementById('client_name_input');
    var client_link_input = document.getElementById('client_link_input')
    var client_image_input = document.getElementById('client_image_input')


    formData.append('name',client_name_input.value);
    formData.append('link',client_link_input.value);
    formData.append('image',client_image_input.files[0]);

    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
        };

    fetch('/api/client/create', requestOptions)
    .then((response)=>response.json())
    .then((result)=>{

        if(result.success)
        {
            alert(result.message);
            location.reload();
        }
        else{


            alert(result.message);
        }


    })
    .catch((err)=>{
        console.log(err)
        alert(err.message)
    })
}


///

function preview(name)
{
    var name_image_input = document.getElementById(`${name}_image_input`);
    var file = name_image_input.files[0]; 
    var preview = document.getElementById(`${name}_image_preview`);
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
    }, false);
    
    if (file) {
        reader.readAsDataURL(file);
    }
}

/// calling

var certificate_form_submit = document.getElementById('certificate_form_submit');
certificate_form_submit.addEventListener('click',handle_certificate_create);

var client_form_submit = document.getElementById('client_form_submit');
client_form_submit.addEventListener('click',handle_client_create);

var testimonial_form_submit = document.getElementById('testimonial_form_submit');
testimonial_form_submit.addEventListener('click',handle_testimonial_create);

var partner_form_submit = document.getElementById('partner_form_submit');
partner_form_submit.addEventListener('click',handle_partner_create);

var aboutus_form_submit = document.getElementById('aboutus_form_submit');
aboutus_form_submit.addEventListener('click',handle_about);

var philosophy_form_submit = document.getElementById('philosophy_form_submit');
philosophy_form_submit.addEventListener('click',handle_about);

load_certificate_cards()
load_client_cards()
load_testimonial_cards()
load_partner_cards()
