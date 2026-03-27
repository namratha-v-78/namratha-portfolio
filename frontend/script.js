// Scroll function
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

// Contact form
const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const data = { name, email, message };

  try {
    await fetch("https://namratha-backend.onrender.com/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    document.getElementById("msg").innerText =
      "Thank you " + name + "! Your message has been sent.";

    form.reset();

  } catch {
    alert("Error ❌");
  }
});

// Scroll animation
const elements = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;

    if (position < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});
