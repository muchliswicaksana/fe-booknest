import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  const [book, setBook] = useState({
    title: "",
    description: "",
    price: "",
    existingCover: "",
    cover: null, // file baru
  });

  // Ambil data buku untuk ditampilkan diawal
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books`);
        const found = res.data.find((b) => b.id == bookId);

        setBook((prev) => ({
          ...prev,
          title: found.title,
          description: found.description,
          price: found.price,
          existingCover: found.cover, // simpan nama file lama
        }));
      } catch (err) {
        console.log(err);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "cover") {
      setBook((prev) => ({ ...prev, cover: files[0] }));
    } else {
      setBook((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("description", book.description);
    formData.append("price", book.price);

    if (book.cover) {
      formData.append("cover", book.cover); // cover baru
    } else {
      formData.append("existingCover", book.existingCover); // cover lama
    }

    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="text-center my-10 text-3xl font-bold">Update Book</h1>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-3xl border p-4 m-auto flex flex-col ">
        <label className="label text-2xl text-blue-400">Judul Buku</label>
        <input
          className="input w-full mb-5"
          type="text"
          placeholder="Title"
          name="title"
          value={book.title}
          onChange={handleChange}
        />

        <label className="label text-2xl text-blue-400">Deskripsi Buku</label>
        <input
          className="input w-full mb-5"
          type="text"
          placeholder="Description"
          name="description"
          value={book.description}
          onChange={handleChange}
        />

        <label className="label text-2xl text-blue-400">Harga Buku</label>
        <input
          className="input w-full mb-5"
          type="number"
          placeholder="Price"
          name="price"
          value={book.price}
          onChange={handleChange}
        />

        {/* COVER LAMA */}
        <label className="label text-2xl text-blue-400">Cover Lama :</label>
        {book.existingCover && (
          <img
            src={`http://localhost:8800/uploads/${book.existingCover}`}
            width="150"
          />
        )}

        <label className="label text-2xl text-blue-400 mt-5">
          Upload Cover Baru (Opsional)
        </label>
        <input
          className="file-input file-input-primary w-full"
          type="file"
          name="cover"
          onChange={handleChange}
        />

        <button
          className="btn btn-soft btn-primary mt-10"
          onClick={handleClick}
        >
          Update
        </button>
      </fieldset>
    </>
  );
};

export default Update;
