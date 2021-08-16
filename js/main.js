/////////////////////////Users and localhost ////////////
var usersarr=[];
if(localStorage.getItem("users")!=null)
{
    usersarr=JSON.parse(localStorage.getItem("users"))  
}
document.addEventListener('keypress', function (e) {
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
    }
});

function adduser(){
    var fname = document.getElementById('fname').value
    var lname = document.getElementById('lname').value
    var Password = document.getElementById('Password').value
    var rePassword = document.getElementById('rePassword').value
    var Email = document.getElementById('Email')
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

   


    if (Password!=rePassword) {
        var re = document.getElementById('rePassword')
        re.setCustomValidity("Passwords Don't Match");

    }
    else if(Password.length<8)
    {
        var div =document.getElementById("passshort")
        div.classList.add("showen")
         setTimeout(function(){
            div.classList.remove("showen")
        },5000);
    }
    else if (!Email.value.match(validRegex)) {
  
        alert("in Valid email address!");
        document.form1.text1.focus();
        return true;
    }
    else{
        var email = document.getElementById('Email').value
        var user ={};
        user.Email=email;
        user.firstName=fname; 
        user.lastName=lname; 
        user.Password=Password;
        user.id=usersarr.length
        usersarr.push(user) 
        localStorage.setItem("users",JSON.stringify(usersarr))
        window.open("signin.html","_self")
    }
    
}
/////////////////////////////////////////////////////

///////////////////////////prevent back//////////////
function preventBack(){
    window.history.forward();

}
setTimeout("preventBack()",0)
window.onunload= function(){null}
///////////////////////////////////////////////////