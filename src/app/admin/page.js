"use client";

import { useState, useEffect } from "react";
import productsData from "../../data/products";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  // load products
  useEffect(() => {
    const saved = localStorage.getItem("products");

    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(productsData);
    }
  }, []);

  // save helper
  const saveProducts = (data) => {
    setProducts(data);
    localStorage.setItem("products", JSON.stringify(data));
  };

  // add product
  const addProduct = () => {
    if (!name || !price || !image || !category) {
      alert("Fill all fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
      image,
      category,
    };

    const updated = [...products, newProduct];

    saveProducts(updated);

    setName("");
    setPrice("");
    setImage("");
    setCategory("");
  };

  // delete product
  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-black mb-8">
          🧑‍💼 Admin Panel
        </h1>

        {/* FORM */}
        <div className="bg-white p-6 rounded-3xl shadow mb-10">

          <h2 className="text-2xl font-bold mb-4">
            Add Product
          </h2>

          <input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 mb-3 rounded-xl"
          />

          <input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-3 mb-3 rounded-xl"
          />

          <input
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border p-3 mb-3 rounded-xl"
          />

          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-3 mb-4 rounded-xl"
          />

          <button
            onClick={addProduct}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Add Product
          </button>
        </div>

        {/* PRODUCT LIST */}
        <div className="grid md:grid-cols-2 gap-6">

          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-2xl shadow"
            >

              <img
                src={p.image}
                className="h-40 w-full object-cover rounded-xl"
              />

              <h3 className="text-xl font-bold mt-2">
                {p.name}
              </h3>

              <p className="text-gray-600">
                ${p.price} | {p.category}
              </p>

              <button
                onClick={() => deleteProduct(p.id)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded-xl"
              >
                Delete
              </button>

            </div>
          ))}

        </div>

      </div>
    </main>
  );
}