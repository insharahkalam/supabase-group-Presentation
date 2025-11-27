import supaBase from "./config.js";


let sUName = document.getElementById("name");
let sEmail = document.getElementById ("email");
let sPass = document.getElementById ("password");
let sPhn = document.getElementById ("ph-no.");
let sBtn = document.querySelector (".btn-signup");


    //  pasword toggle button
    
 const togglePass = document.querySelector(".toggle-password")
 
 togglePass.addEventListener("click", ()=>{
   if (sPass.type === "password"){
    sPass.type = "text"
    togglePass.classList.remove("fa-eye-slash")
     togglePass.classList.add("fa-eye")
   }else{
    sPass.type = "password"
    togglePass.classList.remove("fa-eye")
     togglePass.classList.add("fa-eye-slash")
   }
 })

 
         

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
            icon: "warning",
            background: "#f9fbfc",
            color: "#003b46",
            confirmButtonColor:  "#003b46",
              confirmButtonText: "OK",
            padding: "20px",
            borderRadius:"15px",
                  customClass: {
    popup: "glass-alert"
  }
        })

     return
    };
    

if (sPhn.value.length !== 11) {
    Swal.fire({
        title: "Incorrect Phone Number!",
        text: "Phone number must be exactly 11 digits.",
        icon: "warning",
        background: "#f9fbfc",
        color: "#003b46",
        confirmButtonColor: "#003b46",
           confirmButtonText: "Try Again",
            customClass: {
    popup: "glass-alert"
  }
 
    })
    return;
}


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
  draggable: true,
  background: "#f9fbfc",
  color: "#003b46",
  confirmButtonColor:  "#003b46",
  confirmButtonText: "OK",
  padding: "20px",
 borderRadius:"15px",
       customClass: {
    popup: "glass-alert"
  }
})
return;

  }else {
   Swal.fire({
  title: "Signup successfully!",
  text: "Welcome to Ticket Manager",
  icon: "success",
  draggable: true,
  background: "#f9fbfc",
  color: "#003b46",
  confirmButtonColor:  "#003b46",
  confirmButtonText: "Go to Home",
  padding: "20px",
 borderRadius:"15px",
       customClass: {
    popup: "glass-alert"
  }
 
})
.then (()=>{
  location.href = "home.html"
})
 
    
  }
    } catch (err) {
       console.log(err) 
    }
}

sBtn && sBtn.addEventListener("click", signUp);