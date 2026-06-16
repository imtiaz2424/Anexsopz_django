"use client";

import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import defaultProducts from "../data/products";

export default function Home() {
const { cart } = useContext(CartContext);
const { user } = useContext(AuthContext);

const [products, setProducts] = useState([]);
const [search, setSearch] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");

const [mounted, setMounted] = useState(false);

const [ratings, setRatings] = useState({});

useEffect(() => {
setMounted(true);


const savedRatings = localStorage.getItem( "ratings" );

if (savedRatings) {
  setRatings(
    JSON.parse(savedRatings)
  );
}

fetch(
  "http://127.0.0.1:8000/api/products/"
)
  .then((res) => res.json())
  .then((data) => {
    setProducts(data);
  })
  .catch((error) => {
    console.log(
      "Backend Error:",
      error
    );

    setProducts(
      defaultProducts
    );
  });

}, []);

const categories = [ "All", ...new Set( products.map(
(p) => p.category
)
),
];

const filteredProducts = products.filter( (product) => {
const matchesSearch = product.name .toLowerCase() .includes(
search.toLowerCase()
);


    const matchesCategory = selectedCategory ===
        "All" ||
      product.category === selectedCategory;

    return (
      matchesSearch &&
      matchesCategory
    );
  }
);


const topRatedProducts = [ ...products, ]
  .map((p) => ({ ...p,
  rating:
  ratings?.[p.id] || 0,
  }))
  .filter(
  (p) => p.rating > 0
  )
  .sort( (a, b) => b.rating - a.rating );


  

return ( <main className="min-h-screen bg-gray-50">


  {/* Search */}
  <section className="max-w-7xl mx-auto px-6 py-8">

    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) =>
        setSearch(
          e.target.value
        )
      }
      className="w-full px-6 py-4 border rounded-2xl"
    />

  </section>

  {/* Categories */}
  <section className="max-w-7xl mx-auto px-6 pb-8">

    <div className="flex flex-wrap gap-3">

      {categories.map(
        (category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(
                category
              )
            }
            className={`px-5 py-2 rounded-2xl font-semibold ${
              selectedCategory ===
              category
                ? "bg-violet-600 text-white"
                : "bg-white shadow"
            }`}
          >
            {category}
          </button>
        )
      )}

    </div>

  </section>

  {/* Top Rated Products */}
  {topRatedProducts.length >
    0 && (
    <section className="max-w-7xl mx-auto px-8 pb-10">

      <h2 className="text-3xl font-black mb-6">
        ⭐ Top Rated Products
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {topRatedProducts.map(
          (product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
            >
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 transition">

                <img
                  src={
                    product.image
                  }
                  alt={
                    product.name
                  }
                  className="w-full h-64 object-cover"
                />

                <div className="p-5">

                  <h3 className="text-xl font-bold">
                    {
                      product.name
                    }
                  </h3>

                  <p className="text-yellow-500 font-bold mt-2">
                    ⭐{" "}
                    {
                      product.rating
                    }
                    /5
                  </p>

                  <p className="text-2xl font-black mt-2">
                    $
                    {
                      product.price
                    }
                  </p>

                </div>

              </div>
            </Link>
          )
        )}

      </div>

    </section>
  )}

  {/* Products */}
  <section className="max-w-7xl mx-auto px-8 pb-24">

    <div className="grid md:grid-cols-3 gap-10">

      {filteredProducts.length >
      0 ? (
        filteredProducts.map(
          (product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition">

                <img
                  src={
                    product.image
                  }
                  alt={
                    product.name
                  }
                  className="w-full h-80 object-cover"
                />

                <div className="p-6">

                  <h3 className="text-2xl font-bold">
                    {
                      product.name
                    }
                  </h3>

                  <p className="text-3xl font-black mt-3">
                    $
                    {
                      product.price
                    }
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    {
                      product.category
                    }
                  </p>

                </div>

              </div>
            </Link>
          )
        )
      ) : (
        <div className="col-span-3 text-center py-20">

          <h2 className="text-3xl font-black">
            No Products Found
          </h2>

        </div>
      )}

    </div>

  </section>

  {/* Footer */}
  <footer className="bg-black text-white py-12 text-center">

    <h2 className="text-2xl font-black">
      Subecha
    </h2>

    <p className="text-gray-400">
      © 2026 All Rights
      Reserved
    </p>

  </footer>

</main>


);
}
