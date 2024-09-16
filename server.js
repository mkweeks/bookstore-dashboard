const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require('./routes/bookRoutes');
const cors = require('cors');

const dbURL =
  "mongodb+srv://miguelweeks4:bookstore@cluster0.ulszp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
app.use(express.json());
app.use(cors())

app.use('/books', bookRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err);
  });
