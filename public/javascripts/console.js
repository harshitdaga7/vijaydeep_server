
/*****************************elements ***************************************** */
var console_contact_email = document.getElementById('console_contact_email')
var console_contact_1 = document.getElementById('console_contact_1')
var console_contact_2 = document.getElementById('console_contact_2')
var console_contact_address = document.getElementById('console_contact_address')
var console_contact_btn = document.getElementById('console_contact_btn')
var console_motto = document.getElementById('console_motto')
var console_motto_btn = document.getElementById('console_motto_btn')

// /************************************************************************************** */
// /*****************************event listners ***************************************** */


console_contact_btn.addEventListener('click',handle_console_contact);
console_motto_btn.addEventListener('click',handle_console_motto);


/************************************************************************************** */
/********************************** functions ***************************************** */



function handle_console_contact(e)
{
    e.preventDefault();

    if(console_contact_email.reportValidity() && console_contact_1.reportValidity() && console_contact_2.reportValidity() && console_contact_address.reportValidity())
    {
        var email = console_contact_email.value;
        var contact1 = parseInt(console_contact_1.value);
        var contact2 = parseInt(console_contact_2.value);
        var address = console_contact_address.value;
    
        /// fetch api

        console.log(contact1,contact2)
    
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
        "email": email,
        "contact1": contact1,
        "contact2":contact2,
        "address":address
        });
    
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
    
        fetch("/api/contact/update", requestOptions)
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


function handle_console_motto(e)
{
    e.preventDefault();

    if(console_motto.reportValidity())
    {
        var content= console_motto.value;
    
        /// fetch api

        console.log("inside motto",content)
    
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({

            "content":content
        });
    
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
    
        fetch("/api/motto/update", requestOptions)
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




/**************************call functions************************* */

