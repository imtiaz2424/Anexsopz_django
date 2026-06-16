"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

        <Link href="/" className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl font-black">
              S
            </span>
          </div>

          <div>
            <h1 className="text-3xl font-black">
              Subecha
            </h1>

            <p className="text-sm text-gray-500">
              Premium Shopping
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-lg font-semibold">

          <Link href="/">
            Home
          </Link>

          <Link href="/wishlist">
            Wishlist
          </Link>

          <Link href="/cart">
            Cart ({cart.length})
          </Link>

          <Link href="/orders">
            Orders
          </Link>

          {user ? (
                <div className="flex items-center gap-4">

                  <Link
                    href="/profile"
                    className="text-violet-600 font-bold"
                  >
                    {user.username}
                  </Link>

                  <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl"
                  >
                    Logout
                  </button>

                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-violet-600 text-white px-6 py-3 rounded-2xl"
                >
                  Login
                </Link>
              )}

        </div>

      </div>
    </nav>
  );
}