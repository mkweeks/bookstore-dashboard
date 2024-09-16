import { useState } from "react";
import axios from "axios";
import NavBar from "../Components/NavBar";

const NewBook = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      name,
      price,
      category,
      description,
    };

    // Sending a POST request to add the new book
    axios
      .post("http://localhost:3000/books", newBook)
      .then((response) => {
        console.log("Book added successfully:", response.data);
        // Optionally clear the form
        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
      })
      .catch((error) => {
        console.error("There was an error adding the book!", error);
      });
  };

  return (
    <>
    <NavBar />
      <div className="add-book-form">
        <h2>Add a New Book</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit">Add Book</button>
        </form>
      </div>
    </>
  );
};

export default NewBook;
