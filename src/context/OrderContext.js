"use client";

import {
  createContext,
  useState,
} from "react";

export const OrderContext =
  createContext();

export default function OrderProvider({
  children,
}) {
  const [orders, setOrders] =
    useState([]);

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
        setOrders,
        addOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}