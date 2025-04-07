"use client";
import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export default function CartContextProvider({ children }) {

  const [items, setItems] = useState([]);

  const addItem = async (item) => {
    if(items.length === 0){
      item.quantity = 1;
      setItems([...items, item]);
    }else{
      item.quantity += 1;
      updateItem(item);
    }
  };

  const subItem = async (item) => {
    if(item.quantity === 1){
      setItems(items.filter((i) => i.id !== item.id));
    }else{
      item.quantity -= 1;
      updateItem(item);
    }
  };

  const updateItem = async (item) => {
    setItems(items.map((i) => i.id === item.id ? item : i));
  };

  const clearCart = async () => {
    setItems([]);
  };


  return (
    <CartContext.Provider value={{ items, addItem, subItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };
