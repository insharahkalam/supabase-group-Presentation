import supaBase from "./config.js";


let sUName = document.getElementById("UserName");
let sEmail = document.getElementById ("email");
let sPass = document.getElementById ("password");
let sPhn = document.getElementById ("phoneNo");
let sBtn = document.querySelector ("#login-btn input");
         

        //  SIGN UP FUNCTIONALITY
async function signUp(e){
    e.preventDefault();

    if (!sUName.value.trim() || 
        !sEmail.value.trim() || 
        !sPass.value.trim() || 
       !sPhn.value.trim()) 
    {
        Swal.fire({
            title: "All fields required!",
            text: "Please fill all fields before signup.",
            icon: "warning"
        })
     return
    };

    try {

   
       
        const { data, error } = await supaBase.auth.signUp(
  {
    email: sEmail.value,
    password:sPass.value ,
    options: {
      data: {
        user_name: sUName.value,
        phone_no: sPhn.value,
      }
    }
  }
)

  if (error){
    console.log(error);
    Swal.fire({
  title: "Signup Failed!" ,
  text: error.message,
  icon: "error",
  draggable: true
})
return;
  }else {
   Swal.fire({
  title: "Signup successfully!",
  icon: "success",
  draggable: true
}).then (()=>{
  location.href = "home.html"
})
 
    
  }
    } catch (err) {
       console.log(err) 
    }
}

sBtn && sBtn.addEventListener("click", signUp);