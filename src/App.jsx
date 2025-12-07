import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Books from "./pages/Books";
import Update from "./pages/Update";
import Add from "./pages/Add";
import "./App.css";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <div className="App h-screen">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/add" element={<Add />} />
            <Route path="/update/:id" element={<Update />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
