import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-10">
      <div className="navbar-start">
        <button className="text-2xl font-bold">
          <Link to="/">BookNest</Link>
        </button>
      </div>
      <div className="navbar-end gap-10">
        <button className="btn btn-soft btn-primary w-fit">
          <Link to="/Add">Add new book</Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
