import supaBase from "./config.js";

let lEmail = document.getElementById("email");
let lPass = document.getElementById("password");
let lBtn = document.querySelector("#login-btn input");

async function login(e) {
    e.preventDefault();

    let email = lEmail.value.trim();
    let pass = lPass.value.trim();

    if (!email) {
        Swal.fire({
            title: "Please enter your email address.",
            icon: "warning"
        });
        return;
    }

    if (!email.includes("@") || !email.includes("gmail.com")) {
        Swal.fire({
            title: "Please enter a valid Gmail address.",
            text: "Example: yourname@gmail.com",
            icon: "warning"
        });
        return;
    }

    if (!pass) {
        Swal.fire({
            title: "Password field is empty.",
            text: "Please enter your password.",
            icon: "warning"
        });
        return;
    }

    if (pass.length < 6) {
        Swal.fire({
            title: "Invalid password!",
            text: "Password must be at least 6 characters long.",
            icon: "warning"
        });
        return;
    }

    if (email === "admin@gmail.com" && pass === "admin12345") {
        location.href = "dashboard.html";
        return;
    }

    try {

        const { data, error } = await supaBase.auth.signInWithPassword({
            email: email,
            password: pass
        });

        if (error) {
            if (error.message.includes("Invalid login credentials")) {
                Swal.fire({
                    title: "Email not found!",
                    text: "This email does not exist. Please sign up first.",
                    icon: "error"
                });
                return;
            }

            Swal.fire({
                title: "Login failed!",
                text: error.message,
                icon: "error"
            });
            return;
        }

        Swal.fire({
            title: "Successfully logged in!",
            icon: "success"
        }).then(() => {
            location.href = "home.html";
        });

    } catch (err) {
        console.log(err);
    }
}

lBtn && lBtn.addEventListener("click", login);
