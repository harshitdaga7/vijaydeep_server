
/*****************************elements ***************************************** */

var login_email = document.getElementById('exampleInputEmail1')
var login_password = document.getElementById('exampleInputPassword1')
var login_submit_1 = document.getElementById('loginSubmit_1')
var login_submit_2 = document.getElementById('loginSubmit_2')

// /************************************************************************************** */
// /*****************************event listners ***************************************** */


login_submit_1.addEventListener('click',handleLogin);
login_submit_2.addEventListener('click',handleLogin);


/************************************************************************************** */
/********************************** functions ***************************************** */

function handleLogin(e)
{
    e.preventDefault();

    if(login_email.reportValidity() && login_password.reportValidity())
    {
        var email = login_email.value;
        var password = login_password.value;
    
        /// fetch api
    
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
        "email": email,
        "password": password
        });
    
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
    
        fetch("/auth/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {

            if(result.auth)
            {
                localStorage.setItem('token', result.token);
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





function make_border_current_page()
{
    /// makes border around current selected page in navbar

    var path = location.pathname.split("/")[1]
    // var my_style = `  border-bottom: 2px solid rgb(252, 252, 252);
    // border-top:2px solid rgb(255, 255, 255);  `

    var my_style = `background:rgb(100, 8, 8);`

    if(path == "")
    {
        document.getElementById('home').parentNode.style = my_style;
    }
    else{

        document.getElementById(path).parentNode.style = my_style;
    }

}

/**************************call functions************************* */

make_border_current_page()