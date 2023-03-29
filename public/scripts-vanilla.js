document.addEventListener("DOMContentLoaded", () => {
  const noteForm = document.getElementById("noteForm");

  noteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const contents = document.getElementById("contents").value;

    try {
      const response = await fetch("/create-new-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, contents }),
      });

      if (response.ok) {
        const note = await response.json();
        console.log("Note created:", note);
        alert("Note created successfully");
        noteForm.reset();
      } else {
        throw new Error("Error creating note");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the note. Please try again.");
    }
  });
});
