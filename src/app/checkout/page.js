"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { CartContext } from "../../context/CartContext";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, clearCart } =
    useContext(CartContext);

  const [address, setAddress] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.price *
        (item.quantity || 1),
    0
  );

  const handleOrder = async () => {
    if (!address) {
      alert("Please enter address");
      return;
    }

    const userId =
      localStorage.getItem("user_id");

    if (!userId) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    const firstProduct = cart[0]?.name || "Product";
    

    try {
      setLoading(true);

      const Response = await fetch(
        "http://127.0.0.1:8000/api/orders/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: Number(userId),
            total_price: total,
            title:
              cart.length > 1
                ? `${firstProduct} + ${cart.length - 1} more`
                : firstProduct,
          }),
        }
      );

      const order =
        await Response.json();

      if (!Response.ok) {
        alert("Order Failed");
        return;
      }

      console.log("Order:", order);

      for (const item of cart) {
        await fetch(
          "http://127.0.0.1:8000/api/order-items/",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              order: order.id,
              product_name: item.name,
              image: item.image,
              price: item.price,
              quantity: item.quantity || 1,
            }),
          }
        );
      }

      alert(
        "Order Placed Successfully"
      );

      clearCart();

      router.push("/orders");
    } catch (error) {
      console.error(error);

      alert("Order Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100 p-10">

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-lg">

          <h1 className="text-4xl font-black mb-8">
            Checkout
          </h1>

          <div className="space-y-3 mb-8">

            {cart.length === 0 ? (
              <p className="text-gray-500">
                No items in cart
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b pb-2"
                >
                  <span>
                    {item.name}
                  </span>

                  <span>
                    $
                    {item.price *
                      (item.quantity ||
                        1)}
                  </span>
                </div>
              ))
            )}

          </div>

          <div className="text-3xl font-black mb-6">
            Total: ${total}
          </div>

          <textarea
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            placeholder="Enter your address"
            className="w-full border p-4 rounded-xl mb-6"
          />

          <button
            onClick={handleOrder}
            disabled={
              loading ||
              cart.length === 0
            }
            className="w-full bg-black text-white py-4 rounded-xl"
          >
            {loading
              ? "Processing..."
              : "Place Order"}
          </button>

          <Link
            href="/cart"
            className="block text-center mt-5 text-blue-600"
          >
            Back To Cart
          </Link>

        </div>

      </main>
    </ProtectedRoute>
  );
}