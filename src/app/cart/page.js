"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CartContext } from "../../context/CartContext";

export default function CartPage() {

  const router = useRouter();

  const {
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = useContext(CartContext);

  const totalPrice = cart.reduce(
  (total, item) =>
    total + item.price * item.quantity,
  0
);

const handleCheckout = () => {
  const token =
    localStorage.getItem("access_token");

  if (!token) {
    alert("Please login first");
    router.push("/login");
    return;
  }

  router.push("/checkout");
};

  return (
    
    
    <main className="min-h-screen bg-gray-100 py-16 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-12">

          <div>

            <p className="uppercase tracking-[5px] text-gray-500 mb-3">
              Shopping Cart
            </p>

            <h1 className="text-5xl font-black">
              Your Cart
            </h1>

          </div>

          <Link
            href="/"
            className="bg-black text-white px-6 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>

        </div>

        {/* Empty Cart */}

        {cart.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-20 text-center">

            <h2 className="text-4xl font-black mb-6">
              Your Cart Is Empty
            </h2>

            <p className="text-gray-500 text-lg mb-10">
              Add products to your cart to continue shopping.
            </p>

            <Link
              href="/"
              className="bg-black text-white px-8 py-4 rounded-2xl text-lg font-bold"
            >
              Go Shopping
            </Link>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left Side */}

            <div className="lg:col-span-2 space-y-8">

              {cart.map((item, index) => (

                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full md:w-52 h-52 object-cover rounded-2xl"
                  />

                  <div className="flex-1 w-full">

                    <div className="flex justify-between items-start mb-4">

                      <div>

                        <h2 className="text-3xl font-black mb-2">
                          {item.name}
                        </h2>

                        <p className="text-gray-500">
                          Premium Quality Product
                        </p>

                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-600 transition"
                      >
                        Remove
                      </button>

                    </div>

                    <div className="flex justify-between items-center mt-8">

                     <div>

                        <p className="text-gray-500">
                          ${item.price} × {item.quantity}
                        </p>

                        <p className="text-4xl font-black">
                          ${item.price * item.quantity}
                        </p>

                      </div>

                      <div className="flex items-center gap-3">

                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            className="w-10 h-10 bg-gray-200 rounded-lg text-xl font-bold"
                          >
                            -
                          </button>

                          <div className="bg-gray-100 px-5 py-2 rounded-lg font-bold">
                            {item.quantity}
                          </div>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            className="w-10 h-10 bg-black text-white rounded-lg text-xl font-bold"
                          >
                            +
                          </button>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* Right Side */}

            <div>

              <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-10">

                <h2 className="text-4xl font-black mb-8">
                  Order Summary
                </h2>

                <div className="space-y-5 mb-8">

                  <div className="flex justify-between text-lg">

                    <span className="text-gray-600">
                      Products
                    </span>

                    <span>
                      {cart.length}
                    </span>

                  </div>

                  <div className="flex justify-between text-lg">

                    <span className="text-gray-600">
                      Shipping
                    </span>

                    <span>
                      Free
                    </span>

                  </div>

                </div>

                <div className="border-t pt-6 flex justify-between items-center mb-10">

                  <h3 className="text-3xl font-black">
                    Total
                  </h3>

                  <p className="text-4xl font-black">
                    ${totalPrice}
                  </p>

                </div>

                <button
                  onClick={clearCart}
                  className="w-full mb-4 bg-red-500 text-white py-4 rounded-2xl font-bold hover:bg-red-600"
                >
                  Clear Cart
                </button>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-xl mt-4"
                >
                  Checkout
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}