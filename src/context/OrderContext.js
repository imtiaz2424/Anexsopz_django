"use client";

import {
  createContext,
  useState,
  useEffect,
} from "react";

export const OrderContext =
  createContext();

export default function OrderProvider({
  children,
}) {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    const savedOrders =
      localStorage.getItem("orders");

    if (savedOrders) {
      setOrders(
        JSON.parse(savedOrders)
      );
    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

  }, [orders]);

  const addOrder = (order) => {

    setOrders((prev) => [
      ...prev,
      order,
    ]);

  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}