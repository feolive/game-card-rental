import { useContext, useState,useEffect } from "react";
import { CartContext } from "@/app/_utils/cart-context";
import CartItem from "./cart-item";

export default function Cart() {

  const { items, clearCart } = useContext(CartContext);
  
  const handleCheckout = async () => {
    await clearCart();
  };

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <ul className="list bg-base-100 rounded-box h-[95%]">
        {items && items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="flex justify-center items-center">
        <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  )
}