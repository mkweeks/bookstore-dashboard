import NavBar from "../Components/NavBar";

function BookNotFound() {
  return (
    <>
    <NavBar></NavBar>
      <div className="container">
        <h1>404</h1>
        <p>Oops! The page you're looking for can't be found.</p>
        <a href="/books">Return to Homepage</a>
      </div>
    </>
  );
}

export default BookNotFound;
