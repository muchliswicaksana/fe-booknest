import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-10">
      <div className="navbar-start">
        <a className="text-xl">BookStore</a>
      </div>
      <div className="navbar-end">
        <button>
          <Link
            to="/Add"
            className="btn btn-outline btn-primary px-3 py-5 text-xl border-2"
          >
            Add new book
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
