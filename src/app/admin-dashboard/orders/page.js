"use client";

import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/orders/"
      );

      const data = await response.json();

      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (
    orderId,
    status
  ) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/orders/${orderId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      if (!response.ok) {
        const error =
          await response.json();

        console.log(error);

        alert(
          "Status Update Failed"
        );
        return;
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status,
              }
            : order
        )
      );

      alert(
        "Status Updated Successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Something Went Wrong"
      );
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-10">
        <h1 className="text-4xl font-black">
          Loading...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black mb-10">
          Order Management
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            No Orders Found
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-white p-6 rounded-3xl shadow-lg"
              >

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

                  <div>

                    <h2 className="text-3xl font-black">
                      {order.title ||
                        `Order #${order.id}`}
                    </h2>

                    <p className="text-gray-600 mt-2">
                      User:
                      {" "}
                      {order.user}
                    </p>

                    <p className="text-gray-600">
                      Total:
                      {" "}
                      $
                      {order.total_price}
                    </p>

                    <p className="text-gray-600">
                      Date:
                      {" "}
                      {new Date(
                        order.created_at
                      ).toLocaleString()}
                    </p>

                  </div>

                  <div>

                    <select
                      value={
                        order.status ||
                        "Pending"
                      }
                      onChange={(e) =>
                        updateStatus(
                          order.id,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 px-4 py-3 rounded-xl"
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </main>
  );
}