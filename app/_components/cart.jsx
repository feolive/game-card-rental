import { useContext, useState,useEffect } from "react";
import { CartContext } from "@/app/_utils/cart-context";
import {AuthContext} from "@/app/_utils/auth-context";
import CartItem from "./cart-item";

export default function Cart() {

  const { items, setItems, clearCart, setRefreshOrders } = useContext(CartContext);
  const {customer} = useContext(AuthContext);
  const [me, setMe] = useState({});
  
  const handleCheckout = async () => {
    if(!me?.id){
      return;
    }
    if(!items || items.length === 0){
      return;
    }
    let totalCost = 0;
    let cartId = null;
    let cartItems = items.map((item) => {
      totalCost += (item?.price || 0) * (item?.quantity || 0);
      if(!cartId){
        cartId = item?.cartId;
      }
      return {
        cardId: item?.cardId,
        quantity: item?.quantity,
      };
    });
    if(!cartId){
      alert("Cart not found");
      return;
    }
    if(totalCost === 0){
      alert("No items in cart");
      return;
    }
    let params = {
      customerId: me?.id,
      cartItems,
      cost: totalCost,
      cartId
    }
    const res = await fetch(`/api/rental/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params)
    });
    if(!res){
      return;
    }
    const result = await res.json();
    if(!result.success){
      alert(result.message);
      return;
    }
    await clearCart();
    setRefreshOrders(true);
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
          (item.cardId && <CartItem key={item.id} item={item} cId={me?.id}/>)
        ))}
      </ul>
      <div className="flex justify-center items-center mt-4">
        <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  )
}