const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");
const { MongoClient } = require("mongodb");

//login
router.get("/login", async (req, res) => {
 try {
    // open connection to db
    const client = await MongoClient.connect(
      "mongodb+srv://miguelweeks4:bookstore@cluster0.ulszp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db("test");
    const admin = await db
      .collection("admins")
      .find({ username: req.query.username })
      .toArray();

    // set login status to failed or successful
    if (admin[0].password == req.query.password) {
      console.log("Login was successful")
      res.status(200).send({ message: "Login Successful" });
    } else {
      console.log("login failed")
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/search", async(req, res) => {
  try {
    const books = await Book.find({"name": { $regex: req.body.name, $options: "i"}});
    if (!books) {
      res.status(404).send({message: "Book does not exist"})
    }
    else {
      res.status(200).json(books)
    }
  }
  catch (error) {
    res.status(500).json({message: error.message})
  }
})

// get all books from db
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get specific book from db
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create a new book
router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update book info
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body);

    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }

    res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }

    res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
