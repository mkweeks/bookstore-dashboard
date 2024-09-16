import BookItem from "../Components/BookItem";
import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";
import Search from "../Components/Search";

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3000/books");
      setBooks(result.data);
      setFilteredBooks(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = books.filter(
      (book) => book.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by name
    );
    setFilteredBooks(filtered); // Update the filtered books
  }, [searchQuery, books]); // Re-run when searchQuery or books change

  // Handler for the search query submitted from the Search component
  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery); // Update the search query state when the form is submitted
  };

  return (
    <>
      <NavBar />
      <Search onSearch={handleSearch} />
      <div className="books">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookItem
              key={book._id}
              id={book._id}
              name={book.name}
              description={book.description}
              category={book.category}
              price={book.price}
            />
          ))
        ) : (
          <p>No books Found</p>
        )}
      </div>
    </>
  );
}

export default BooksPage;
