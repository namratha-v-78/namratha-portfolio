document.getElementById("form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  try {
    const res = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.text();

    document.getElementById("msg").innerText =
      "Thank you " + data.name + "! Your message has been sent.";

    document.getElementById("form").reset();

  } catch (err) {
    alert("Error sending message");
  }
});
