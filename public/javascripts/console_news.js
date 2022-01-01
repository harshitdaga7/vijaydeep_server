
function load_news_cards()
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
                    
                    let d = `
                            <div class="list-group-item list-group-item-action d-flex gap-3 py-3 content-hover-red" aria-current="true">


                                <div style="max-height:100px; max-width:100px; overflow: hidden;"
                                    class="ratio ratio-1x1 shadow mx-auto">
                                    <img loading="lazy" style = "max-height:200px;max-width:200px" src="/images/${result.data[i].image}">
                                </div>

                                <div class="d-flex gap-2 w-100 justify-content-between">
                                    <button type="button" id = "btn_${result.data[i].id}" class="btn text-start" onclick = "load_update(this.id)">
                                        <h5 class="mb-0 my-2">${result.data[i].headline}</h5>
                                        <p class="mt-2 mb-0 opacity-75">${result.data[i].updatedAt}</p>
                                    </button>

                                </div>

                                <button type="button" class="btn-close" id="delete_btn_${result.data[i].id}" onclick="load_delete(this.id)"></button>
                            </div>
                    
                    `

                    cont += d;

                    
                    
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

function handle_news_create(e)
{
    e.preventDefault();

    var formData = new FormData();

    var news_headline_input = document.getElementById('news_headline_input');
    var news_link_input = document.getElementById('news_link_input')
    var news_article_input = document.getElementById('news_article_input')
    var news_image_input = document.getElementById('news_image_input')


    formData.append('headline',news_headline_input.value);
    formData.append('article',news_article_input.value);
    formData.append('link',news_link_input.value);
    formData.append('image',news_image_input.files[0]);

    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
        };

    fetch('/api/news/create', requestOptions)
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


function handle_update(btn_id)
{
    // e.preventDefault();
    var id = btn_id.split('_').pop();
    console.log('update',id)
    var update_headline_input = document.getElementById('update_headline_input');
    var update_link_input = document.getElementById('update_link_input')
    var update_article_input = document.getElementById('update_article_input')
    var update_image_input = document.getElementById('update_image_input')

    var formData = new FormData();

    formData.append('headline',update_headline_input.value)
    formData.append('article',update_article_input.value);
    formData.append('link',update_link_input.value)
    formData.append('image',update_image_input.files[0])

    
    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
        };
    
    fetch(`/api/news/update/${id}`,requestOptions)
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
    .catch((err)=>console.log(err))

}

function load_update(btn_id)
{

    var id = btn_id.split('_').pop();
    
    var myModal = new bootstrap.Modal(document.getElementById('updateArticle'))
    myModal.show();


    console.log(id);

    fetch(`/api/news/find/${id}`,{method:'GET',redirect:"follow"})
    .then((result)=>result.json())
    .then((result) =>{

        if(result.success)
        {
            let d = 
            `
            <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="updateArticleLabel">Update: <blue class="text-primary">${result.data.headline}
                        </blue> ?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <form>

                       

                        <!-- image view -->
                        <div class="row">
                            
                                <img class="img-fluid" style = "max-height:300px;max-width:300px;" loading="lazy" id= "update_image_preview" src="/images/${result.data.image}">
                                <div class="mt-3">
                                    <div class="mb-3 ">
                                        <label for="update_image_input">Choose Article Img</label>
                                        <input type="file" id="update_image_input" name="Article" onchange="update_preview()"accept="image/*">
                                    </div>
                                </div>


                        </div>

                        <div class="mb-3">
                            <label for="update_headline_input" class="form-label">Headline</label>
                            <input type="text" class="form-control" id="update_headline_input" aria-describedby="" value= "${result.data.headline}">

                        </div>
                        <div class="mb-3">
                            <label for="update_link_input" class="form-label">additional Link</label>
                            <input type="text" class="form-control" id="update_link_input" aria-describedby="" value= "${result.data.link}">

                        </div>
                        <div class="mb-3">
                            <label for="update_article_input" class="form-label">Article</label>
                            <textarea type="text" class="form-control" id="update_article_input" aria-describedby="" value="${result.data.article}">${result.data.article}</textarea>

                        </div>


                        
                    </form>

                    <button type="submit" class="btn btn-danger bg-gradient my-4" id = "update_btn_${result.data.id}" onclick = "handle_update(this.id)">Update News Article</button>


                    <span class="text-secondary" style="font-size: 15px;"> Are you sure you want to Update ? </span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
            
            `

            document.getElementById('updateArticle').innerHTML = d;

        }
        else{

            alert(result.message)
        }


    })
    .catch((err)=>{console.log(err)})



}

function handle_delete(id)
{
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
        };
    
    fetch(`/api/news/find/${id}`,requestOptions)
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

function load_delete(btn_id)
{

    var id = btn_id.split('_').pop();
    console.log(id)
    var myModal = new bootstrap.Modal(document.getElementById('deleteArticleModal'))
    myModal.show();

    let d = `
    <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="deleteArticleModalLabel">Confirm Delete ?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <span class="text-secondary" style="font-size: 15px;"> Are you sure you want to Delete: <blue class="text-primary"></blue> ? </span>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" 
            data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger bg-gradient text-light" id="${id}" onclick="handle_delete(this.id)">Delete</button>
        </div>
    </div>
</div>
    `
    
    document.getElementById('deleteArticleModal').innerHTML = d;
}

function preview_news()
{
    var news_image_input = document.getElementById('news_image_input');
    var file = news_image_input.files[0]; 
    var preview = document.getElementById('news_image_preview');
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
    }, false);
    
    if (file) {
        reader.readAsDataURL(file);
    }
}


function update_preview()
{
    var update_image_input = document.getElementById('update_image_input');
    var file = update_image_input.files[0]; 
    var preview = document.getElementById('update_image_preview');
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
    }, false);
    
    if (file) {
        reader.readAsDataURL(file);
    }
}


/**********************listners and callers */


var news_form_submit = document.getElementById('news_form_submit');
news_form_submit.addEventListener('click',handle_news_create);
load_news_cards();