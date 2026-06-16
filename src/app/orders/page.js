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
  const {
    isLoggedIn,
    loading: authLoading,
  } = useContext(AuthContext);

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    const userId =
      localStorage.getItem("user_id");

    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/orders/?user=${userId}`
        );

        const data =
          await res.json();

        setOrders(data);
      } catch (err) {
        console.error(
          "Orders Error:",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isLoggedIn]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100 p-10">

        <div className="max-w-5xl mx-auto">

          <Link
            href="/"
            className="inline-block mb-8 bg-black text-white px-6 py-3 rounded-xl"
          >
            ← Back Home
          </Link>

          <h1 className="text-4xl font-black mb-8">
            📦 My Orders
          </h1>

          {loading ? (
            <div className="bg-white p-8 rounded-3xl shadow">
              Loading Orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl shadow">
              No Orders Found
            </div>
          ) : (
            <div className="space-y-6">

              {orders.map((order) => (

                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                >
                  <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition cursor-pointer">

                    <h2 className="text-2xl font-bold">
                      {order.title ||
                        `Order #${order.id}`}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {new Date(
                        order.created_at
                      ).toLocaleString()}
                    </p>

                    <div className="flex justify-between items-center mt-4">

                      <p className="text-2xl font-black">
                        $
                        {order.total_price}
                      </p>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold
                        ${
                          order.status ===
                          "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : ""
                        }
                        ${
                          order.status ===
                          "Processing"
                            ? "bg-blue-100 text-blue-700"
                            : ""
                        }
                        ${
                          order.status ===
                          "Shipped"
                            ? "bg-purple-100 text-purple-700"
                            : ""
                        }
                        ${
                          order.status ===
                          "Delivered"
                            ? "bg-green-100 text-green-700"
                            : ""
                        }
                        ${
                          order.status ===
                          "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : ""
                        }
                      `}
                      >
                        {order.status ||
                          "Pending"}
                      </span>

                    </div>

                  </div>
                </Link>

              ))}

            </div>
          )}

        </div>

      </main>
    </ProtectedRoute>
  );
}