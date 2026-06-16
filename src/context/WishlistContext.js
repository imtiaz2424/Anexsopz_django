"use client";

import {
  createContext,
  useState,
  useEffect,
} from "react";

export const WishlistContext =
  createContext();

export default function WishlistProvider({
  children,
}) {

  const [wishlist, setWishlist] =
    useState([]);

  useEffect(() => {

    const savedWishlist =
      localStorage.getItem("wishlist");

    if (savedWishlist) {
      setWishlist(
        JSON.parse(savedWishlist)
      );
    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

  }, [wishlist]);

  const toggleWishlist = (
    product
  ) => {

    const exists =
      wishlist.find(
        (item) =>
          item.id === product.id
      );

    if (exists) {

      setWishlist(
        wishlist.filter(
          (item) =>
            item.id !== product.id
        )
      );

    } else {

      setWishlist([
        ...wishlist,
        product,
      ]);

    }

  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}


const addToWishlist = async (
  product
) => {

  const userId =
    localStorage.getItem(
      "user_id"
    );

  if (!userId) {
    alert("Login First");
    return;
  }

  await fetch(
    "http://127.0.0.1:8000/api/wishlist/",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        user: Number(userId),
        product: product.id,
      }),
    }
  );

  alert(
    "Added To Wishlist ❤️"
  );
};