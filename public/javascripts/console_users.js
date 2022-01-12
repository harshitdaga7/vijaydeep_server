function handle_create_users(e)
{

    e.preventDefault()

    var user_email_input = document.getElementById('user_email_input');
    var user_password_input = document.getElementById('user_password_input');
    var user_password_confirm_input = document.getElementById('user_password_confirm_input');
    var admin_password_input = document.getElementById('admin_password_input');


    if(user_email_input.reportValidity() && user_password_input.reportValidity() && user_password_confirm_input.reportValidity() && admin_password_input.reportValidity())
    {
         if(user_password_input.value != user_password_confirm_input.value)
         {
             alert("confirm password is not same as password")
             return
         }

         var formData = new FormData();

         formData.append('email',user_email_input.value);
         formData.append('password',user_password_input.value);
         formData.append('adminPass',admin_password_input.value);

            
        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
            };
        
            fetch('/user/create', requestOptions)
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
    
}

function handle_update_users(email)
{

    var user_update_password_input = document.getElementById('user_update_password_input');
    var user_update_password_confirm_input = document.getElementById('user_update_password_confirm_input');
    var admin_update_password_input = document.getElementById('admin_update_password_input');


    if(user_update_password_input.reportValidity() && user_update_password_confirm_input.reportValidity() && admin_update_password_input.reportValidity())
    {
         if(user_update_password_input.value != user_update_password_confirm_input.value)
         {
             alert("confirm password is not same as password")
             return
         }

         var formData = new FormData();

         formData.append('email',email);
         formData.append('password',user_update_password_input.value);
         formData.append('adminPass',admin_update_password_input.value);

            
        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
            };
        
            fetch('/user/update', requestOptions)
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
    
}

function handle_delete_users(email)
{
    var admin_delete_password_input = document.getElementById('admin_delete_password_input');

    if(admin_delete_password_input.reportValidity())
    {

        var formData = new FormData();
        formData.append('email',email);
         
         formData.append('adminPass',admin_delete_password_input.value);



        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
            };
        
        fetch(`/user/delete`,requestOptions)
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
}

function load_update_users(email)
{
    var myModal = new bootstrap.Modal(document.getElementById('updateUserModal'))
    myModal.show();

    let d = `

    <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="updateUserModalLabel">Update User: <blue class="text-primary">${email}
                </blue> ?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">


            <form>
                <div class="mb-3">

                    <div id="user_update_email_input" class="form-text">Never share your userID and password with anyone.
                    </div>
                </div>
                <div class="mb-3">
                    <label for="user_update_password_input" class="form-label">Password</label>
                    <input type="password" class="form-control" id="user_update_password_input" required>
                </div>

                <div class="mb-3">
                    <label for="user_update_password_confirm_input" class="form-label">Confirm above Password</label>
                    <input type="text" class="form-control" id="user_update_password_confirm_input" required>
                </div>

                <div class="mb-3">
                    <label for="admin_update_passord_input" class="form-label">Enter the Password from which you have
                        logged into this admin console</label>
                    <input type="password" class="form-control" id="admin_update_password_input" required>
                </div>
            </form>

            <button type="submit" class="btn btn-primary" name = "${email}" onclick = "handle_update_users(this.name)" >Update Password</button>





            <span class="text-secondary" style="font-size: 15px;"> Are you sure you want to Update ? </span>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                data-bs-target="#usersModal">Cancel</button>
        </div>
    </div>
</div>
    
    `

    document.getElementById('updateUserModal').innerHTML = d;


}

function load_delete_users(email)
{
    var myModal = new bootstrap.Modal(document.getElementById('userDeleteModal'))
    myModal.show();

    let d = `
    <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="deleteArticleModalLabel">Confirm Delete ?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <span class="text-secondary" style="font-size: 15px;"> Are you sure you want to Delete: <blue class="text-primary">${email}</blue> ? </span>
            <br>
            <br>

            <label for="admin_delete_passord_input" class="form-label">Enter the Password from which you have
            logged into this admin console</label>
        <input type="password" class="form-control" id="admin_delete_password_input" required>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" 
            data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger bg-gradient text-light" name = "${email}" onclick="handle_delete_users(this.name)">Delete</button>
        </div>
    </div>
</div>
    `

    document.getElementById('userDeleteModal').innerHTML = d;
}

function load_users()
{
    

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
    
        fetch("/user/find/all/", requestOptions)
        .then((response) => response.json())
        .then((result) => {

            console.log(result)
    
            if(result.success)
            {
                
                // console.log(localStorage.getItem('token'))
                console.log(result)
                var user_container = document.getElementById('user_container')
                var d = ""
                for(let i = 0;i<result.data.length;i++)
                {
                    let temp = `
                    
                    
                    <div class="row border my-1 rounded-3 shadow-sm">
                    <div class="col-sm-8 text-start d-grid btn-danger bg-gradient ">

                        <button type="button" class="btn" name = "${result.data[i]}" onclick = "load_update_users(this.name)">
                            <h5 class="my-auto text-light">${result.data[i]}</h5>
                        </button>
                    </div>
                    <div class="col-sm-4 text-end my-auto">
                        <button type="button" class="btn-close" name = "${result.data[i]}" onclick = "load_delete_users(this.name)"></button>
                    </div>
                </div>
                    `

                    d += temp;
                }

                user_container.innerHTML = d;

                
            }
            else
            {
                alert(result.message)
            }
            
        })
        .catch(error => console.log('error', error));

}


//  

var user_create_submit = document.getElementById('user_create_submit')
user_create_submit.addEventListener('click',handle_create_users)
load_users();