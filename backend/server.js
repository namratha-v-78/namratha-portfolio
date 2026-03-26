const express = require("express");
const cors = require("cors");

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

  const { data, error } = await supabase
    .from("contacts")
    .insert([{ name, email, message }]);

  if (error) {
    console.log(error);
    return res.status(500).send("Error saving data");
  }

  res.send("Message saved successfully ✅");
});
app.listen(5000, () => console.log("Server running on port 5000"));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});