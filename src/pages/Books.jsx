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
      <h1 className="text-5xl font-bold text-center mt-10">Bookstore</h1>
      <div className="books flex gap-10 m-12 justify-center flex-wrap">
        {books.map((book) => (
          <div className="card w-100 bg-base-100 border p-5 " key={book.id}>
            <figure>
              {book.cover && (
                <img
                  className="w-56 h-80 object-cover bg-blue-200 rounded-xl "
                  src={`http://localhost:8800/uploads/${book.cover}`}
                  alt={book.title}
                />
              )}
            </figure>
            <div className="card-body">
              <h2 className="card-title">{book.title}</h2>
              <p className="flex">{book.description}</p>
              <span className="flex">
                Rp. {book.price.toLocaleString("id-ID")}
              </span>
              <div className="card-actions flex gap-5 justify-end">
                <button
                  className="btn btn-outline btn-error"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
                <button className="btn btn-outline btn-info">
                  <Link to={`/update/${book.id}`}>Update</Link>
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
