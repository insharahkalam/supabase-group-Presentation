// ===== Supabase Config =====
const projectUrl = "https://jzxxnlisarhqbdkqobmy.supabase.co";
const projectKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6eHhubGlzYXJocWJka3FvYm15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNDEyMzQsImV4cCI6MjA3NjgxNzIzNH0.blYwoj2ObZ0Om5UoARD07HNFk9xXvfKmXIfihRIzf8Q";

const { createClient } = supabase;
const client = createClient(projectUrl, projectKey);

// ===== Form Inputs =====
const title = document.getElementById("title");
const description = document.getElementById("description");
const issue_type = document.getElementById("issue_type");
const submitBtn = document.getElementById("submitBtn");

// ===================== INSERT TICKET =====================
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (
    !title.value.trim() ||
    !description.value.trim() ||
    !issue_type.value.trim()
  ) {
    Swal.fire({
      icon: "warning",
      title: "Missing Fields!",
      text: "Please fill out all fields before submitting.",
      confirmButtonColor: "#FC4A30",
    });
    return;
  }

  const { error } = await client.from("Ticket_form").insert({
    Title: title.value,
    Description: description.value,
    Issue_type: issue_type.value,
  });

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Insert Failed!",
      text: error.message,
      confirmButtonColor: "#FC4A30",
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "Ticket Created!",
      text: "Your ticket has been submitted successfully.",
      confirmButtonColor: "#FC4A30",
    });

    title.value = "";
    description.value = "";
    issue_type.value = "Select issue type";

    // After insert → fetch again
    fetchTickets();
  }
});

// ===================== FETCH TICKETS =====================
async function fetchTickets() {
  const { data, error } = await client
    .from("Ticket_form")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Fetch Error!",
      text: error.message,
      confirmButtonColor: "#FC4A30",
    });
    return;
  }

  const list = document.getElementById("ticketList");
  list.innerHTML = "";

  if (data.length === 0) {
    Swal.fire({
      icon: "info",
      title: "No Tickets Found",
      text: "You haven't created any tickets yet.",
      confirmButtonColor: "#FC4A30",
    });
    return;
  }

  data.forEach((ticket) => {
    const li = document.createElement("li");
    li.className =
      "p-4 bg-[#0f1f38] border border-blue-800/40 rounded-xl mb-3";

    li.innerHTML = `
      <h3 class="text-2xl font-bold text-[#FC4A30]">${ticket.Title}</h3>
      <p class="text-lg mt-1">${ticket.Description}</p>
      <p class="text-sm text-gray-400 mt-1"><b>Issue:</b> ${ticket.Issue_type}</p>
    `;

    list.appendChild(li);
  });
}

fetchTickets();
