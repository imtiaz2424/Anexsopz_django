"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

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
        setLoading(false);

      });

  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (
    id
  ) => {

    const confirmDelete =
      confirm(
        "Delete this product?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      const response =
        await fetch(
          `http://127.0.0.1:8000/api/products/${id}/`,
          {
            method: "DELETE",
          }
        );

      if (response.ok) {

        alert(
          "Product Deleted Successfully"
        );

        loadProducts();

      } else {

        alert(
          "Delete Failed"
        );

      }

    } catch (err) {

      console.error(err);

      alert("Error");

    }

  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-5xl font-black">
            Product Management
          </h1>

          <Link
            href="/admin-dashboard/products/add"
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            + Add Product
          </Link>

        </div>

        {loading ? (

          <div className="bg-white p-8 rounded-3xl shadow">
            Loading Products...
          </div>

        ) : products.length === 0 ? (

          <div className="bg-white p-8 rounded-3xl shadow">
            No Products Found
          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {products.map(
              (product) => (

                <div
                  key={product.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden"
                >

                  {product.image ? (
                    <img
                      src={
                        product.image.startsWith("http")
                          ? product.image
                          : `http://127.0.0.1:8000${product.image}`
                      }
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      No Image
                    </div>
                  )}

                  <div className="p-6">

                    <h2 className="text-2xl font-bold">
                      {product.name}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {product.category}
                    </p>

                    <p className="text-3xl font-black mt-4">
                      ${product.price}
                    </p>

                    <div className="flex gap-3 mt-6">

                      <Link
                        href={`/admin-dashboard/products/edit/${product.id}`}
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          deleteProduct(
                            product.id
                          )
                        }
                        className="bg-red-500 text-white px-5 py-2 rounded-xl"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </main>
  );
}