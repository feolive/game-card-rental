"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/app/_utils/auth-context";
import Card from "@/app/_components/card";
import CartIcon from "@/app/_icons/CartIcon";
import SDCard from "@/app/_icons/SDCard";

export default function Rental() {
  const { customer, signOut } = useContext(AuthContext);
  const [rotateItem, setRotateItem] = useState("rotate-y-0");
  const [rotateCart, setRotateCart] = useState("rotate-y-180");
  const [isCart, setIsCart] = useState(false);

  const flipCard = () => {
    if (isCart) {
      setRotateCart("rotate-y-180");
      setRotateItem("rotate-y-0");
      setIsCart(false);
    } else{
      setRotateCart("rotate-y-0");
      setRotateItem("-rotate-y-180");
      setIsCart(true);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center min-h-screen gap-24 font-[family-name:var(--font-geist-sans)]">
      <div className="w-80 h-screen flex flex-col justify-end items-center gap-8 pb-24">
        <div className="w-full card h-1/3 bg-base-100 shadow-sm">
          <div className="card-body flex flex-col justify-center items-center">
            <h2 className="card-title">Customer</h2>
            <p className="text-primary">{customer?.firstName} {customer?.lastName}</p>
            <button className="btn btn-outline" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </div>
        <div className="w-full card h-1/2 bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Orders</h2>
          </div>
        </div>
      </div>
      <div className="h-screen w-2/3 perspective-distant">
        <div className="absolute top-20 left-1/2 -translate-x-1/2">
          {/* <button className="btn btn-info " onClick={() => flipCard("item")}>Items</button>
          <button id="cart" type="radio" className="btn btn-secondary ml-1" onClick={() => flipCard("cart")}>Cart</button> */}
          <div className="flex text-primaryText text-sm font-bold">
                  <div
                    className={
                      isCart ? "eml-btn" : "eml-btn active-btn"
                    }
                    onClick={flipCard}
                  >
                    <SDCard color={isCart ? "var(--color-slate-500)" : "var(--color-info)"} />
                  </div>
                  <div className={isCart ? "ml-14 eml-btn active-btn-2" : "ml-14 eml-btn"} onClick={flipCard}>
                    <CartIcon color={isCart ? "var(--color-secondary)" : "var(--color-slate-500)"} />
                  </div>
                </div>
        </div>
        <Card rotate={rotateItem}>
          <h2 className="card-title">Game Cards</h2>
        </Card>
        <Card rotate={rotateCart}>
          <div className="bg-secondary w-full h-full">
            <h2 className="card-title">Cart</h2>
          </div>
        </Card>
      </div>
    </div>
  );
}
