const projectUrl = "https://jzxxnlisarhqbdkqobmy.supabase.co"
const projectKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6eHhubGlzYXJocWJka3FvYm15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNDEyMzQsImV4cCI6MjA3NjgxNzIzNH0.blYwoj2ObZ0Om5UoARD07HNFk9xXvfKmXIfihRIzf8Q"
const { createClient } = supabase;
const client = createClient(projectUrl, projectKey)

console.log(createClient);
console.log(client);

// =======inserting form data=======

const title = document.getElementById("title")
const description = document.getElementById("description")
const issue_type = document.getElementById("issue_type")
const priority = document.getElementsByName("priority")
const submitBtn = document.getElementById("submitBtn")
let selectedPriority = "";
submitBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    for (let i = 0; i < priority.length; i++) {
        console.log(priority[i].checked);
        if (priority[i].checked) {
            selectedPriority = priority[i].value;
            break;
        }
    }

    const { error } = await client
        .from('Ticket_form')
        .insert({ Title: title.value, Description: description.value, Priority: selectedPriority, Issue_type: issue_type.value })

    if (error) {
        console.log("data inserting error", error.message);
    } else {
        alert("data insert successfully!!")
    }



})


