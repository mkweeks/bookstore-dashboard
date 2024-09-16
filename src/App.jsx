import BookNotFound from "./Pages/BookNotFound";
import BooksPage from "./Pages/BooksPage";
import NewBook from "./Pages/NewBook";
import SignIn from "./Pages/SignIn";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/newBook" element={<NewBook />} />
        <Route path="*" element={<BookNotFound />} />
      </Routes>
    </>
  );
}

export default App;
