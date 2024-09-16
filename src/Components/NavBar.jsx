import { Link, Outlet } from "react-router-dom";

function NavBar() {
  const username = localStorage.getItem("username");
  return (
    <>
      <div className="nav">
        <div className="links">
          <h2>OnBook</h2>
          <p>
            <Link to="/books" className="nav-link">
              Books
            </Link>
          </p>
          <p>
            <Link to="/flsk" className="nav-link">
              Categories
            </Link>
          </p>
          <p>
            <Link to="/flsk" className="nav-link">
              WishList
            </Link>
          </p>
          <p>
            <Link to="/flsk" className="nav-link">
              About Us
            </Link>
          </p>
        </div>

        <div className="login">
          <p>
            <Link to="/" className="nav-link">
              {username}
            </Link>
          </p>
          <h2>
            <Link to="/newBook" className="nav-link">
              +
            </Link>
          </h2>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default NavBar;
