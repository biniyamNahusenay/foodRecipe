import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    // Clear the access_token cookie and localStorage
    setCookies("access_token", "", { path: "/" });
    window.localStorage.removeItem("userId");

    // Navigate to the home page
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create">Create Recipe</Link>
      {!cookies.access_token ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
         <Link to="/save">Save Recipe</Link>
        <button
          onClick={logout}
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: 7,
            width: 70,
            borderRadius: 6,
            border: "none",
            marginTop: 9,
            fontSize: 16,
            cursor: "pointer",
          }}
          >
          Logout
        </button>
      </>
      )}
    </div>
  );
};

export default Navbar;
