
function setCurrentEmailOnOptions(){
    var currentEmailDiv = document.getElementById("current_saved_email");

    var savedEmail = localStorage.getItem("email");
    currentEmailDiv.innerText = savedEmail;
}



  function save_email() 
{
    
    var email = document.getElementById("email").value;
    localStorage.setItem('email', email);
    setCurrentEmailOnOptions();


}

setCurrentEmailOnOptions();

document.getElementById('save_email').addEventListener('click', save_email);


