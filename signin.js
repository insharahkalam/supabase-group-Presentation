import supaBase from "./config.js";


let lEmail = document.getElementById("email");
let lPass = document.getElementById("password");
let lBtn = document.querySelector("#login-btn input");


 async function login(e){
    e.preventDefault();

     



    if (lEmail.value === "admin@gmail.com" && lPass.value === "admin12345") {
      location.href = "dashboard.html";
      return;
    }
  
   try {
    const { data, error } = await supaBase.auth.signInWithPassword({
     email: lEmail.value,
     password: lPass.value,
  })

           if (error) {
            if (error.message.includes("Invalid login credentials")) {
                Swal.fire({
                    title: "Invalid Email or Password!",
                    text: "Please check your email and password.",
                    icon: "error"
                });
                return;
            }

            Swal.fire({
                title: "Login Failed!",
                text: error.message,
                icon: "error"
            });
            return;
        }

Swal.fire({
  title: "Successfully logged in!",
  icon: "success"
}).then ( ()=> {
   location.href = "home.html"
})

    }
   catch (err) {
    console.log(err)
   }
 }


lBtn && lBtn.addEventListener ("click", login)
