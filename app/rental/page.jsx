"use client";

import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "@/app/_utils/auth-context";
import clsx from "clsx";
import Card from "@/app/_components/card";
import OrderDetails from "@/app/_components/order-details";
import Close from "@/app/_icons/Close";
import CardMenu from "@/app/_components/card-menu";
import CartIcon from "@/app/_icons/CartIcon";
import TrashCan from "@/app/_icons/TrashCan";
import SDCard from "@/app/_icons/SDCard";
import Cart from "@/app/_components/cart";
import RightArrow from "@/app/_icons/RightArrow"
import tryCatch from "@/app/_utils/try-catch";
import { CartContext } from "@/app/_utils/cart-context";
import ModalDialog from "@/app/_components/modal-dialog";


export default function Rental() {
  const { customer, signOut } = useContext(AuthContext);
  const [rotateItem, setRotateItem] = useState("rotate-y-0");
  const [rotateCart, setRotateCart] = useState("rotate-y-180");
  const [isCart, setIsCart] = useState(false);
  const [me, setMe] = useState(null);
  const [isOrderDetails, setIsOrderDetails] = useState(false);
  const [orders, setOrders] = useState([]);
  const [currOrder, setCurrOrder] = useState({});
  const { clearCart } = useContext(CartContext);
  const modalRef = useRef(null);
  const [isClearCart, setIsClearCart] = useState(false);


  const flipCard = () => {
    if (isCart) {
      setRotateCart("rotate-y-180");
      setRotateItem("rotate-y-0");
      setIsCart(false);
    } else {
      setRotateCart("rotate-y-0");
      setRotateItem("-rotate-y-180");
      setIsCart(true);
    }
  };

  const orderDetails = ({orderId, cost}) => {
    setIsOrderDetails(true);
    setCurrOrder({orderId, cost});
  };

  const clearTheCart = async () => {
    modalRef.current.showModal();
    // if(isClearCart) {
    //   await clearCart();
    // }
    // setIsClearCart(!isClearCart);
  };

  useEffect(() => {
    setMe(customer?.[0]);
  }, [customer]);

  /**
   * Fetch customer orders
   */
  useEffect(() => {
    async function fetchOrders() {
      const [data, error] = await tryCatch(async () => await fetch(`/api/rental/order/${me?.id}`));
      if(error){
        console.error(error);
        return;
      }
      if(!data){
        return;
      }
      const orderData = await data.json();
      setOrders(orderData);
    }
    if(!me){
      return;
    }
    fetchOrders();
  }, [me?.id]);


  return (
    <div className="w-full h-full flex justify-center items-center min-h-screen gap-24 font-[family-name:var(--font-geist-sans)]">
      <div className="w-1/5 relative h-screen flex flex-col justify-end items-center gap-8 pb-24">
        <div className="w-full card h-1/3 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title">Account</h2>
              <div>
                <label className="toggle text-base-content">
                  <input
                    type="checkbox"
                    value="dim"
                    className="theme-controller"
                  />

                  <svg
                    aria-label="sun"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="4"></circle>
                      <path d="M12 2v2"></path>
                      <path d="M12 20v2"></path>
                      <path d="m4.93 4.93 1.41 1.41"></path>
                      <path d="m17.66 17.66 1.41 1.41"></path>
                      <path d="M2 12h2"></path>
                      <path d="M20 12h2"></path>
                      <path d="m6.34 17.66-1.41 1.41"></path>
                      <path d="m19.07 4.93-1.41 1.41"></path>
                    </g>
                  </svg>

                  <svg
                    aria-label="moon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                    </g>
                  </svg>
                </label>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
              <img
                src={me?.avatar_addr || "/default-avatar.png"}
                alt="Avatar"
                className="w-16 h-16 rounded-full"
              />
              <p className="text-primary">
                {me?.first_name} {me?.last_name}
              </p>
              <p className="text-base-content opacity-60">{me?.description || "--"}</p>
              <p className="text-primary">credits: {me?.credits}</p>
              <button
                className="btn btn-outline btn-xs absolute bottom-4 left-4"
                onClick={signOut}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className={clsx("w-full card h-1/2 bg-base-100 shadow-sm transition-transform duration-600", {
          "scale-150": isOrderDetails,
          "left-[25%] bottom-[12%]": isOrderDetails,
          "backdrop-blur-xs": isOrderDetails,
          "z-10": isOrderDetails,
          "bg-transparent": isOrderDetails,
          "shadow-slate-500": isOrderDetails,
        })}>
        {!isOrderDetails ? (
          <div className="card-body">
            <h2 className="card-title">Orders</h2>
            {orders && <ul className="list w-full h-[22em] 2xl:h-[25em] bg-base-100 rounded-box overflow-y-auto overflow-x-hidden">
                {orders.map((order) => (
                  <li className="list-row cursor-pointer flex justify-between items-center hover:bg-[var(--color-hover-highlight)]" key={order.id} onClick={() => {orderDetails({orderId: order.id, cost: order.cost})}}>
                    <div>{order.id}</div>
                    <div className="text-xs uppercase text-success font-semibold opacity-60">$ {order.cost}</div>
                    <div className="text-xs text-success font-semibold opacity-60">Done</div>
                    <RightArrow color="var(--color-success)" />
                  </li>
                ))}
              </ul>}
          </div>
        ): (
          <>
          <div className="card-body bg-transparent z-20">
            <div className="flex justify-between items-center bg-transparent">
              <div>
                <h2 className="card-title text-sm">Order Details</h2>
                <div className="text-md text-success flex items-baseline gap-1">Total: <div className="stat-value text-sm"> ${currOrder.cost||0}</div></div>
              </div>
              <button className="btn btn-circle btn-sm btn-error" onClick={() => {setIsOrderDetails(false)}}><Close color="var(--color-neutral-content)" /></button>
            </div>
            <OrderDetails id={currOrder.orderId} />
          </div>
          </>
        )}
        </div>
      </div>
      <div className="h-screen w-3/5 perspective-distant">
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2">
          <div className="flex text-primaryText text-sm font-bold">
            <div
              className={isCart ? "eml-btn" : "eml-btn active-btn"}
              onClick={flipCard}
            >
              <SDCard
                color={isCart ? "var(--color-slate-500)" : "var(--color-info)"}
              />
            </div>
            <div
              className={
                isCart ? "ml-14 eml-btn active-btn-2" : "ml-14 eml-btn"
              }
              onClick={flipCard}
            >
              <CartIcon
                color={
                  isCart ? "var(--color-secondary)" : "var(--color-slate-500)"
                }
              />
            </div>
          </div>
        </div>
        <Card rotate={rotateItem}>
          <h2 className="card-title mb-3">Game Cards</h2>
          <CardMenu />
        </Card>
        <Card rotate={rotateCart}>
          <div className="flex justify-between items-center">
            <h2 className="card-title mb-3">Cart</h2>
            <button className="btn btn-square btn-sm rounded-lg btn-error" onClick={() => {clearTheCart()}}>
              <TrashCan color="var(--color-base-100)" />
            </button>
          </div>
          <Cart />
        </Card>
      </div>
      <ModalDialog refName={modalRef} title="Clear Cart" description="Are you sure you want to clear your cart?" onConfirm={clearCart} />
    </div>
  );
}
