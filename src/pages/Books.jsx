import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mt-10">BookNest</h1>
      <div className="books flex gap-10 m-12 justify-center flex-wrap text-blue-400">
        {books.map((book) => (
          <div
            className="card w-200 card-side border h-auto border-blue-400 p-4"
            key={book.id}
          >
            <figure>
              {book.cover && (
                <img
                  className="object-cover h-100 w-260"
                  src={`http://localhost:8800/uploads/${book.cover}`}
                  alt={book.title}
                />
              )}
            </figure>
            <div className="card-body">
              <h2 className="card-title text-4xl">{book.title}</h2>
              <p className="text-gray-400 text-justify mt-3">{book.description}</p>
              <p className="text-2xl font-">
                Rp. {book.price.toLocaleString("id-ID")}
              </p>
              <div className="card-actions flex justify-end">
                <button className="btn btn-outline btn-info w-20">
                  <Link to={`/update/${book.id}`}>Edit</Link>
                </button>
                <button
                  className="btn btn-outline btn-error w-20"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
