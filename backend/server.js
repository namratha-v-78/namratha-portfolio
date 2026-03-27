const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // SAVE TO DATABASE
  const { error } = await supabase
    .from("contacts")
    .insert([{ name, email, message }]);

  if (error) {
    console.log(error);
    return res.status(500).send("DB Error ❌");
  }

  // SEND EMAIL
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "namrathav78@gmail.com",
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: "namrathav78@gmail.com",
      to: "namrathav78@gmail.com",
      subject: "New Contact Form Message",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

  } catch (err) {
    console.log("Email error:", err);
  }

  res.send("Saved + Email Sent ✅");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
