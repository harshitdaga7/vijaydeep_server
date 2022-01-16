
/// 

function handle_delete(btn_id)
{
    var id = btn_id.split('_').pop();
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
        };
    
    fetch(`/api/product/find/${id}`,requestOptions)
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

function load_product_cards()
{
    

    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
    
        fetch("/api/product/all/", requestOptions)
        .then((response) => response.json())
        .then((result) => {

            console.log(result)
    
            if(result.success)
            {
                
                // console.log(localStorage.getItem('token'))
                var product_container = document.getElementById('product_container')
                var cont = ""
                for(let i = 0;i<result.data.length;i++)
                {
                    
                    let d = `

                    <div class="list-group-item list-group-item-action d-flex gap-3 py-3 content-hover-red"
                    aria-current="true">


                    <div style="max-height:100px; max-width:100px;  width:100%; overflow: hidden;"
                        class="ratio ratio-16x9 shadow mx-auto">
                        <img class="" src="/images/${result.data[i].image1}">
                    </div>

                    <div class="d-flex gap-2 w-100 justify-content-between">
                        <button style="background-color: transparent" type="button" class="btn text-start" id = "product_update_btn_${result.data[i].id}" onclick = "load_update(this.id)">
                        <div style="max-width:200px; overflow:hidden">
                            <h5 class="mb-0 my-2">${result.data[i].name}</h5>
                            <p class="mt-2 mb-0 opacity-75" style="font-size:0.7pc;">${result.data[i].createdAt}</p>
                        </div>
                        </button>
                    </div>
                    <button type="button" class="btn-close" name = "${result.data[i].name}" id = "product_delete_${result.data[i].id}" onclick = "load_delete(this.id,this.name)"></button>
                </div>
                    `

                    cont += d;
                    
                    
                }

                product_container.innerHTML = cont;
            }
            else
            {
                alert(result.message)
            }
            
        })
        .catch(error => console.log('error', error));

    
}

function preview(name)
{
    console.log(name)
    var name_image_input = document.getElementById(`product_${name}_input`);
    var file = name_image_input.files[0]; 
    var preview = document.getElementById(`product_${name}_preview`);
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
    }, false);
    
    if (file) {
        reader.readAsDataURL(file);
    }
}

function handle_product_create(e)
{
    e.preventDefault();

    var formData = new FormData();

    var product_name_input = document.getElementById('product_name_input');
    var product_link_input = document.getElementById('product_link_input');
    var product_description_input = document.getElementById('product_description_input');
    var product_image1_input = document.getElementById('product_image1_input');
    var product_image2_input = document.getElementById('product_image2_input');
    var product_image3_input = document.getElementById('product_image3_input');




    formData.append('name',product_name_input.value);
    formData.append('link',product_link_input.value);
    formData.append('description',product_description_input.value);


    if(product_image1_input.files[0]) formData.append('image1',product_image1_input.files[0])
    if(product_image2_input.files[0]) formData.append('image2',product_image2_input.files[0])
    if(product_image3_input.files[0]) formData.append('image3',product_image3_input.files[0])

    

    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
        };

    fetch('/api/product/create', requestOptions)
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
    var id = btn_id.split('_').pop();
    var formData = new FormData();

    var product_name_input = document.getElementById('product_name_update_input');
    var product_link_input = document.getElementById('product_link_update_input');
    var product_description_input = document.getElementById('product_description_update_input');
    var product_image1_input = document.getElementById('product_image1_update_input');
    var product_image2_input = document.getElementById('product_image2_update_input');
    var product_image3_input = document.getElementById('product_image3_update_input');




    formData.append('name',product_name_input.value);
    formData.append('link',product_link_input.value);
    formData.append('description',product_description_input.value);


    if(product_image1_input.files[0]) formData.append('image1',product_image1_input.files[0])
    if(product_image2_input.files[0]) formData.append('image2',product_image2_input.files[0])
    if(product_image3_input.files[0]) formData.append('image3',product_image3_input.files[0])

    

    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
        };

    fetch(`/api/product/update/${id}`, requestOptions)
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


function load_update(btn_id)
{
    var id = btn_id.split('_').pop();
    
    var myModal = new bootstrap.Modal(document.getElementById('updateProduct'))
    myModal.show();


    console.log(id);

    fetch(`/api/product/find/${id}`,{method:'GET',redirect:"follow"})
    .then((result)=>result.json())
    .then((result) =>{

        if(result.success)
        {
            let d = 
            `
            <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="updateProductLabel">Update: <blue class="text-primary">${result.data.name}
                        </blue> ?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">


                

                <form>
    

                <!-- image view -->
                <div class="row">
                    <div class="col-lg-4 ">
                    
                <div style="height:108px;width: 192px; overflow:hidden;  display: flex; align-items: center; justify-content: center;" class="shadow-lg mx-3" >


                        <img class=" " style = "max-width:224px;" loading="lazy" id = "product_image1_update_preview" src="/images/${result.data.image1}">

                </div>
                        <div class="mt-3">
                            <div class="mb-3 ">
                                <label for="avatar">Choose Product Img 1:</label>
                                <input type="file" id="product_image1_update_input" name="image1_update" onchange="preview(this.name)"accept="image/*">
                            </div>
                        </div>


                    </div>
                    <div class="col-lg-4 ">

                    <div style="height:108px;width: 192px; overflow:hidden;  display: flex; align-items: center; justify-content: center;" class="shadow-lg mx-3" >


                    <img class=" " style = "max-width:224px;" loading="lazy" id = "product_image2_update_preview" src="/images/${result.data.image2}">

            </div>
                        <div class="mt-3">
                            <div class="mb-3 ">
                                <label for="avatar">Choose Product Img 2:</label>
                                <input type="file" id = "product_image2_update_input" name="image2_update" onchange="preview(this.name)" accept="image/*">
                            </div>
                        </div>

                    </div>
                    <div class="col-lg-4 ">

                    <div style="height:108px;width: 192px; overflow:hidden;  display: flex; align-items: center; justify-content: center;" class="shadow-lg mx-3" >


                    <img class=" " style = "max-width:224px;" loading="lazy" id = "product_image3_update_preview" src="/images/${result.data.image3}">

            </div>
                        <div class="mt-3">
                            <div class="mb-3 ">
                                <label for="avatar">Choose Product Img 3:</label>
                                <input type="file" id="product_image3_update_input" name="image3_update" onchange="preview(this.name)" accept="image/*">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="exampleInputname" class="form-label">name</label>
                    <input type="text" class="form-control" maxlength="100" placeholder="text limit 100 charaters" id="product_name_update_input" aria-describedby="" value = "${result.data.name}">

                </div>
                <div class="mb-3">
                    <label for="exampleInputLink" class="form-label">additional Link</label>
                    <input type="text" class="form-control" id="product_link_update_input" aria-describedby="" value = "${result.data.link}">

                </div>
                <div class="mb-3">
                    <label for="exampleInputDescription" class="form-label">Description</label>
                    <textarea type="text" class="form-control" maxlength="800" placeholder="text limit 800 charaters"id="product_description_update_input" aria-describedby="" value = "${result.data.description}">${result.data.description}</textarea>

                </div>

            </form>


            <button type="button" id = "product_submit_update_form_${result.data.id}"  onclick = "handle_update(this.id)" class="btn btn-danger bg-gradient my-4">update product</button>

                    <span class="text-secondary" style="font-size: 15px;"> Are you sure you want to Update ? </span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
            `

            document.getElementById('updateProduct').innerHTML = d;

        }
        else{

            alert(result.message)
        }


    })
    .catch((err)=>{console.log(err)})
}



function load_delete(btn_id,name)
{

    var id = btn_id.split('_').pop();
    console.log(id)
    var myModal = new bootstrap.Modal(document.getElementById('deleteProductModal'))
    myModal.show();

    let d = `
    <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="deleteArticleModalLabel">Confirm Delete ?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <span class="text-secondary" style="font-size: 15px;"> Are you sure you want to Delete: <blue class="text-primary">${name}</blue> ? </span>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" 
            data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger bg-gradient text-light" id="product_delete_${id}" onclick="handle_delete(this.id)">Delete</button>
        </div>
    </div>
</div>
    `
    
    document.getElementById('deleteProductModal').innerHTML = d;
}

/// call and event handle

var product_submit_form = document.getElementById('product_submit_form');
product_submit_form.addEventListener('click',handle_product_create);

load_product_cards()