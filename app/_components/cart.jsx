import { useContext, useState,useEffect } from "react";
import { CartContext } from "@/app/_utils/cart-context";
import {AuthContext} from "@/app/_utils/auth-context";
import CartItem from "./cart-item";
import tryCatch from "@/app/_utils/try-catch";

export default function Cart() {

  const { items, setItems, clearCart } = useContext(CartContext);
  const {customer} = useContext(AuthContext);
  const [me, setMe] = useState({});
  
  const handleCheckout = async () => {
    await clearCart();
  };

  useEffect(() => {
    setMe(customer?.[0]);
  }, [customer]);

  useEffect(() => {
    async function fetchCart() {
      const data = await fetch(`/api/rental/cart/${me?.id}`);
      if(!data){
        return;
      }
      const cartData = await data.json();
      setItems(cartData);
    }
    if(!me?.id){
      return;
    }
    fetchCart();
  },[me?.id]);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <ul className="list bg-base-100 rounded-box h-[80%] overflow-y-auto overflow-x-hidden">
        {(items&&items.length>0) && items.map((item) => (
          <CartItem key={item.id} item={item} cId={me?.id}/>
        ))}
      </ul>
      <div className="flex justify-center items-center mt-4">
        <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  )
}