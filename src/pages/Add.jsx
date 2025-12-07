import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: "",
    cover: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "cover") {
      setBook((prev) => ({ ...prev, cover: files[0] }));
    } else {
      setBook((prev) => ({ ...prev, [name]: value }));
    }
  };

  // const handleChange = (e) => {
  //   setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("description", book.description);
    formData.append("price", book.price);
    formData.append("cover", book.cover);

    try {
      await axios.post("http://localhost:8800/books", formData, {
        headers: {"Content-Type": "multipart/form-data"},
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="text-center my-10 text-3xl font-bold">Add New Book</h1>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-3xl border p-4 m-auto flex flex-col ">
        <label className="label text-2xl text-blue-400">Judul Buku</label>
        <input
          className="input w-full mb-5"
          type="text"
          placeholder="Masukkan Judul Buku"
          onChange={handleChange}
          name="title"
        />

        <label className="label text-2xl text-blue-400">Deskripsi Buku</label>
        <input
          className="input w-full mb-5"
          type="text"
          placeholder="Masukkan Deskripsi Buku"
          onChange={handleChange}
          name="description"
        />

        <label className="label text-2xl text-blue-400">Harga Buku</label>
        <input
          className="input w-full mb-5"
          type="number"
          placeholder="Masukkan Harga Buku"
          onChange={handleChange}
          name="price"
        />

        <label className="label text-2xl text-blue-400">Cover Buku</label>
        <input
          className="file-input file-input-primary w-full"
          type="file"
          placeholder="Masukkan Cover Buku"
          onChange={handleChange}
          name="cover"
        />

        <button
          className="btn btn-soft btn-primary mt-10"
          onClick={handleClick}
        >
          Add
        </button>
      </fieldset>
    </>
  );
};

export default Add;
