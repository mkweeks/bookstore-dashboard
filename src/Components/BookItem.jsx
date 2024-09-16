import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";

function BookItem(props) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [editFormData, setEditFormData] = useState({
    name: props.name,
    price: props.price,
    description: props.description,
    category: props.category,
  });

  const handleOpenModal = (action) => {
    if (action === "edit") {
      setModalContent({
        title: "Edit Book",
        body: `Here you can edit the details of the book "${props.name}".`,
      });
      setEditFormData({
        id: props.id,
        name: props.name,
        price: props.price,
        description: props.description,
        category: props.category,
      });
    } else if (action === "delete") {
      setModalContent({
        title: "Delete Book",
        body: `Are you sure you want to delete the book "${props.name}"? This action cannot be undone.`,
      });
    }
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleSubmitEdit = () => {
    axios
      .put(`http://localhost:3000/books/${props.id}`, editFormData)
      .then((response) => console.log(response));
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:3000/books/${props.id}`)
      .then((response) => console.log(response));
    handleCloseModal(); // Close the modal after delete
    window.location.reload();
  };

  return (
    <>
      <div className="book-card">
        <img className="book-image" src="https://picsum.photos/seed/picsum/200"></img>

        <div className="book-details">
          <h3>{props.name}</h3>
          <p>{props.category}</p>
          <p>{props.description}</p>
          <h5>${props.price}</h5>
        </div>
        <button onClick={() => handleOpenModal("edit")}>Edit</button>
        <button onClick={() => handleOpenModal("delete")}>Delete</button>
      </div>

      <Modal show={showModal} handleClose={handleCloseModal}>
        <h2>{modalContent.title}</h2>

        {modalContent.title === "Edit Book" ? (
          <form onSubmit={handleSubmitEdit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                name="price"
                value={editFormData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                name="description"
                value={editFormData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                name="category"
                value={editFormData.category}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleCloseModal}>
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <p>{modalContent.body}</p>
            <button onClick={handleConfirmDelete} className="delete">Confirm Delete</button>
            <button onClick={handleCloseModal}>Cancel</button>
          </div>
        )}
      </Modal>
    </>
  );
}

export default BookItem;
