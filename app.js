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

submitBtn && submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const { data: getData, error:getError } = await client.auth.getUser()
    let user_id = getData.user.id



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
            user_id:user_id,
            Title: title.value,
            Description: description.value,
            Issue_type: issue_type.value
        });

    if (error) {
        console.log("data inserting error", error.message);
    } else {
        alert("data insert successfully!!");
        window.location.href = "myTickets.html"
    }
});




document.addEventListener("DOMContentLoaded", async () => {
    const myPost = document.getElementById("myPost")
    const { data: getData, error } = await client.auth.getUser()
    let user_id = getData.user.id
    console.log(user_id);


    const { data: fetchData, error: fetchError } = await client
        .from('Ticket_form')
        .select('*')
        .eq('user_id', user_id)

    if (fetchData) {
        console.log(fetchData);

        console.log("my post fetch successfully ", fetchData);

        fetchData.forEach(post => {

            myPost.innerHTML += `

<a href="#" class="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">
    <h5 class="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">${post.Title}</h5>
    <p class="text-body">${post.Description}</p>
    <p class="text-body">${post.Issue_type}</p>
</a>

        `
        });


    }

    else {
        console.log(fetchError, "error in my post fetch");
    }
});




