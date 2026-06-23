const express = require("express");
const cors = require("cors");

const connectToMongo = require("./db");

const app = express();
const port = process.env.PORT || 5000;

connectToMongo();

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Social Post App Backend Running");
});
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/Post"));

app.listen(port, () => {
  console.log(`Server Running On Port ${port}`);
});