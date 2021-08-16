var usersarr=[];
var Actuser=JSON.parse(localStorage.getItem("activeuser"))
if(localStorage.getItem("users")!=null)
{
    usersarr=JSON.parse(localStorage.getItem("users"))  
} 

///////////////////////login function ///////////////////
function login()
{
    var Email = document.getElementById('Email').value
    var Password = document.getElementById('Password').value
    for(i=0 ; usersarr.length ;i++)
    {
        console.log(usersarr[0].username)
        if(Email==usersarr[i].Email && Password == usersarr[i].Password)
        {
            // window.open("https://www.youtube.com/watch?v=_Rf4rC6hl8s","_self");
            var active={};
            active.activeuser=i;
            localStorage.setItem("activeuser",JSON.stringify(active));            
            window.open("welcomePage.html","_self")
            break;
        }
        else{
            var div = document.getElementById("invalid");
            div.classList.add("showen");
            setTimeout(function(){
                div.classList.remove("showen")
            },3000);
        }

    }
}
///////////////////////////////////////////////

//////welcomePage js //////////////////////


var spn = document.getElementById("wlcname");
 var wlcname=usersarr[Actuser.activeuser].firstName ;
 spn.innerText=wlcname;
 //////////////Logout//////////////////////
 function logout(){
    window.open("signin.html","_self")
    Actuser.activeuser="";
    localStorage.setItem("activeuser",JSON.stringify(active)); 

 }
    function preventBack(){
        window.history.forward();

    }
    setTimeout("preventBack()",0)
    window.onunload= function(){null}
    
    
    ////////////////Welcome Page button/////////////
    function gotoquiz(){
        window.open("quiz.html","_self")
    }