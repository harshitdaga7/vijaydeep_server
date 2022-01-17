
function load_team_cards()
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
                var team_container = document.getElementById('team_container')
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

                        <div class="d-flex gap-2 w-100 justify-content-between" style=" overflow:hidden">
                            <button type="button" style=" background: transparent; max-width: 200px; white-space: pre-wrap" class="btn text-start" id="update_team_btn_${result.data[i].id}" onclick="load_update_team(this.id)">
                                <h5 class="mb-0 my-2">${result.data[i].name}</h5>
                                <p class="mt-2 mb-0 opacity-75">${result.data[i].position}</p>
                            </button>

                        </div>



                        <button type="button" class="btn-close" id="delete_team_btn_${result.data[i].id}" onclick = "load_delete(this.id)"></button>
                    </div>
                    `

                    cont += d;

                    
                    
                }

                team_container.innerHTML = cont;
            }
            else
            {
                alert(result.message)
            }
            
        })
        .catch(error => console.log('error', error));

    
}

function handle_team_create(e)
{
    e.preventDefault();

    var formData = new FormData();

    var create_team_name = document.getElementById('create_team_name');
    var create_team_position = document.getElementById('create_team_position');
    var create_team_bio = document.getElementById('create_team_bio');
    var create_team_contact1 = document.getElementById('create_team_contact1');
    var create_team_contact2 = document.getElementById('create_team_contact2');
    var create_team_email = document.getElementById('create_team_email');
    var create_team_linkedin = document.getElementById('create_team_linkedin');
    var create_team_twitter = document.getElementById('create_team_twitter');
    var create_team_image = document.getElementById('create_team_image');



    formData.append('name',create_team_name.value);
    formData.append('position',create_team_position.value);
    formData.append('bio',create_team_bio.value);
    formData.append('contact1',create_team_contact1.value);
    formData.append('contact2',create_team_contact2.value);
    formData.append('email',create_team_email.value);
    formData.append('linkedin',create_team_linkedin.value);
    formData.append('twitter',create_team_twitter.value);
    formData.append('image',create_team_image.files[0]);

    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
        };

    fetch('/api/team/create', requestOptions)
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


function handle_team_update(btn_id)
{
    // e.preventDefault();
    var id = btn_id.split('_').pop();
    console.log('update',id)


    var formData = new FormData();

    var update_team_name = document.getElementById('update_team_name');
    var update_team_position = document.getElementById('update_team_position');
    var update_team_bio = document.getElementById('update_team_bio');
    var update_team_contact1 = document.getElementById('update_team_contact1');
    var update_team_contact2 = document.getElementById('update_team_contact2');
    var update_team_email = document.getElementById('update_team_email');
    var update_team_linkedin = document.getElementById('update_team_linkedin');
    var update_team_twitter = document.getElementById('update_team_twitter');
    var update_team_image = document.getElementById('update_team_image');


    formData.append('name',update_team_name.value);
    formData.append('position',update_team_position.value);
    formData.append('bio',update_team_bio.value);
    formData.append('contact1',update_team_contact1.value);
    formData.append('contact2',update_team_contact2.value);
    formData.append('email',update_team_email.value);
    formData.append('linkedin',update_team_linkedin.value);
    formData.append('twitter',update_team_twitter.value);
    formData.append('image',update_team_image.files[0]);



    
    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
        };
    
    fetch(`/api/team/update/${id}`,requestOptions)
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

function load_update_team(btn_id)
{

    var id = btn_id.split('_').pop();
    
    var myModal = new bootstrap.Modal(document.getElementById('updateTeam'))
    myModal.show();


    console.log(id);

    fetch(`/api/team/find/${id}`,{method:'GET',redirect:"follow"})
    .then((result)=>result.json())
    .then((result) =>{

        if(result.success)
        {
            let d = 
            `
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="updateTeamLabel">Update Team Member: <blue class="text-primary">
                            ${result.data.name}
                        </blue> ?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="row  ">

                        <form>

                            <div style="display:flex;justify-content:center;flex-direction: column;align-items:center;" class=" mt-3  border p-5 border-2 rounded-3 shadow  bg-light bg-gradient">
                                <h2>Update info?</h2>
    
    
                                <div style=" max-height:200px; max-width:200px; border-radius: 50%; width:100%; overflow: hidden;"
                                            class="ratio ratio-1x1 shadow mx-auto">
                                <img id = "update_team_preview"  style="object-fit:cover"src="/images/${result.data.image}">
                            </div>

                            <div class="mt-3">
                                <div class="mb-3 ">
                                    <label for="avatar">Choose a profile picture:</label>
                                    <input type="file" id="update_team_image" name="image" onchange="update_team_preview_()" accept="image/*">
                                </div>
                                <div class="mb-3">
                                    <label for="update_team_name" class="form-label">name</label>
                                    <input type="text" maxlength="100" placeholder="maxlength 100 characters."  class="form-control" id="update_team_name"
                                        aria-describedby="" value = "${result.data.name}">

                                </div>
                                <div class="mb-3">
                                    <label for="update_team_position" class="form-label">Position</label>
                                    <input type="text" maxlength="100" placeholder="maxlength 100 characters." class="form-control" id="update_team_position"
                                        aria-describedby="" value = "${result.data.position}">

                                </div>
                                <div class="mb-3">
                                    <label for="update_team_bio" class="form-label">Bio</label>
                                    <textarea type="text" maxlength="300" placeholder="maxlength 300 characters." class="form-control" id="update_team_bio"
                                        aria-describedby="">${result.data.bio}</textarea>

                                </div>

                                <hr>
                                <div style="margin: 5%;"> <img src="/images/icons/phone.png" height="26px"
                                        width="auto">
                                    <label for="update_team_contact1" class="form-label">Contact Number
                                        1</label>
                                    <input type="tel" class="form-control" id="update_team_contact1" value=${result.data.contact1}>
                                </div>
                                <div style="margin: 5%;">
                                    <img src="/images/icons/phone.png" height="26px" width="auto">
                                    <label for="update_team_contact_2" class="form-label">Contact Number
                                        2</label>
                                    <input type="tel" class="form-control" id="update_team_contact2" value=${result.data.contact2}>
                                </div>

                                <div style="margin: 5%;"> <img class="mx-2" src="/images/icons/mail.png"
                                        height="26px" width="auto"><label for="update_team_email"
                                        class="form-label"> Email</label>
                                    <input type="email" class="form-control" id="update_team_email"
                                        aria-describedby="" value = "${result.data.email}">
                                </div>


                                <hr>

                                <div class="mb-3">

                                    <img src="/images/icons/linkedin.png" height="26px" width="auto">

                                    <label for="update_team_linkedin" class="form-label">linkedin-link</label>
                                    <input type="url" class="form-control" id="update_team_linkedin"
                                        aria-describedby="" value= "${result.data.linkedin}">
                                </div>

                                <div class="mb-3">

                                    <img src="/images/icons/twitter.png" height="26px" width="auto">

                                    <label for="update_team_twitter" class="form-label">twitter-link</label>
                                    <input type="url" class="form-control" id="update_team_twitter"
                                        aria-describedby="" value= "${result.data.twitter}">
                                </div>

                                <!-- <div class="mb-3">

                                    <img src="icons8-instagram-30.png" height="26px" width="auto">

                                    <label for="exampleInputname" class="form-label">instagram-link</label>
                                    <input type="text" class="form-control" id="exampleInputname"
                                        aria-describedby="">
                                </div>

                                <div class="mb-3">

                                    <img src="icons8-facebook-30.png" height="26px" width="auto">

                                    <label for="exampleInputname" class="form-label">facebook-link</label>
                                    <input type="text" class="form-control" id="exampleInputname"
                                        aria-describedby="">
                                </div> -->


                            </div>

                            


                            </div>





                            
                    </form>
                    <button type="submit" class="btn btn-danger bg-gradient my-4" id = "update_team_btn_${result.data.id}" onclick = "handle_team_update(this.id)">Update Info</button>
                </div>

                <span class="text-secondary" style="font-size: 15px;"> Are you sure you want to Update ? </span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
            `

            document.getElementById('updateTeam').innerHTML = d;

        }
        else{

            alert(result.message)
        }


    })
    .catch((err)=>{console.log(err)})



}

function handle_delete(btn_id)
{
    var id = btn_id.split('_').pop();
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
        };
    
    fetch(`/api/team/find/${id}`,requestOptions)
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
    var myModal = new bootstrap.Modal(document.getElementById('deleteMemberModal'))
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
            <button type="button" class="btn btn-danger bg-gradient text-light" id="team_delete_${id}" onclick="handle_delete(this.id)">Delete</button>
        </div>
    </div>
</div>
    `
    
    document.getElementById('deleteMemberModal').innerHTML = d;
}

function create_team_preview_()
{
    var create_team_image = document.getElementById('create_team_image');
    var file = create_team_image.files[0]; 
    var preview = document.getElementById('create_team_preview');
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
    }, false);
    
    if (file) {
        reader.readAsDataURL(file);
    }
}


function update_team_preview_()
{
    var update_image_input = document.getElementById('update_team_image');
    var file = update_image_input.files[0]; 
    var preview = document.getElementById('update_team_preview');
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


var create_team_btn = document.getElementById('create_team_btn');
create_team_btn.addEventListener('click',handle_team_create);
load_team_cards();