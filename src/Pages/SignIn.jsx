import React, { useState} from "react";
import axios from "axios";

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill out all fields.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Process login or registration
    if (isLogin) {
      const result = await axios.get("http://localhost:3000/books/login", {
        params: { username, password },
      });
      if (result.data.message === "Login Successful") {
        localStorage.setItem("username", username);
        window.open("/books", "_self");
      }
    } else {
      console.log("Signing up with:", { username, password });
      // Handle sign-up logic
    }
  };

  return (
    <>
      <div className="logo">
        <h1>OnBook</h1>
      </div>

      <div className="login-form">
        <h2>{isLogin ? "Sign In" : "Create an Account"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Username:</label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create an Account" : "Already have an account? Login"}
        </button>
      </div>
    </>
  );
};

export default SignIn;
