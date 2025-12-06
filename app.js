const projectUrl = "https://jzxxnlisarhqbdkqobmy.supabase.co"
const projectKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6eHhubGlzYXJocWJka3FvYm15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNDEyMzQsImV4cCI6MjA3NjgxNzIzNH0.blYwoj2ObZ0Om5UoARD07HNFk9xXvfKmXIfihRIzf8Q"
const { createClient } = supabase;
const client = createClient(projectUrl, projectKey)

console.log(createClient);
console.log(client);


// =======inserting form data=======

const title = document.getElementById("title");
const description = document.getElementById("description");
const issue_type = document.getElementById("issue_type");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    // If any field empty
    if (!title.value.trim() ||
        !description.value.trim() ||
        !issue_type.value.trim()) {

        alert("Plzz fill all fields!!");
        return; // stop further code
    }

    // ===== Insert data =====
    const { error } = await client
        .from('Ticket_form')
        .insert({
            Title: title.value,
            Description: description.value,
            Issue_type: issue_type.value
        });

    if (error) {
        console.log("data inserting error", error.message);
    } else {
        alert("data insert successfully!!");
    }
});
