"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

export default function AdminProductsPage() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadProducts = () => {

    fetch(
      "http://127.0.0.1:8000/api/products/"
    )
      .then((res) => res.json())
      .then((data) => {

        setProducts(data);

        setLoading(false);

      })
      .catch((err) => {
        console.error(err);
      });

  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black mb-10">
          Product Management
        </h1>

        <div className="mb-8">

              <Link
                href="/admin-dashboard/products/add"
                className="bg-green-600 text-white px-6 py-3 rounded-xl"
              >
                + Add Product
              </Link>

            </div>

        {loading ? (

          <p>Loading...</p>

        ) : (

          <div className="grid md:grid-cols-3 gap-6">

            {products.map((product) => (

              <div
                key={product.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover"
                />

                <div className="p-6">

                  <h2 className="text-2xl font-bold">
                    {product.name}
                  </h2>

                  <p className="text-gray-500">
                    {product.category}
                  </p>

                  <p className="text-3xl font-black mt-4">
                    ${product.price}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}