"use client";

import {
  useEffect,
  useState,
  useContext,
} from "react";

import Link from "next/link";

import { AuthContext } from "../../context/AuthContext";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function OrdersPage() {
  const { isLoggedIn } =
    useContext(AuthContext);

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const userId =
      localStorage.getItem("user_id");

    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(
      `http://127.0.0.1:8000/api/orders/?user=${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (!isLoggedIn) {
    return (
      <ProtectedRoute>
        <main className="min-h-screen flex items-center justify-center">
          <div className="bg-white p-10 rounded-3xl shadow-lg text-center">

            <h1 className="text-3xl font-black mb-5">
              Login Required
            </h1>

            <Link
              href="/login"
              className="bg-black text-white px-6 py-3 rounded-xl"
            >
              Go To Login
            </Link>

          </div>
        </main>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100 p-10">

        <div className="max-w-5xl mx-auto">

          <Link
            href="/"
            className="inline-block mb-10 bg-black text-white px-6 py-3 rounded-2xl"
          >
            ← Back To Home
          </Link>

          <h1 className="text-4xl font-black mb-8">
            📦 My Orders
          </h1>

          {loading ? (

            <div className="bg-white p-8 rounded-3xl text-center">
              Loading Orders...
            </div>

          ) : orders.length === 0 ? (

            <div className="bg-white p-8 rounded-3xl text-center">

              <h2 className="text-2xl font-bold">
                No Orders Yet
              </h2>

              <Link
                href="/"
                className="text-violet-600 mt-4 block"
              >
                Start Shopping
              </Link>

            </div>

          ) : (

            <div className="space-y-6">

              {orders.map((order) => (

                <div
                  key={order.id}
                  className="bg-white p-6 rounded-3xl shadow-lg"
                >

                  <div className="flex justify-between mb-4">

                    <div>

                      <Link
                        href={`/orders/${order.id}`}
                        className="font-bold text-blue-600 text-2xl"
                      >
                        {order.title || `Order #${order.id}`}
                      </Link>

                    </div>

                    <p className="text-gray-500">
                      {new Date(
                        order.created_at
                      ).toLocaleString()}
                    </p>

                  </div>

                  <div className="border-t pt-4">

                    <p className="text-2xl font-black">
                      Total:
                      ${order.total_price}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>
    </ProtectedRoute>
  );
}