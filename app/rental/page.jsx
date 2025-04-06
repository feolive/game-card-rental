"use client";

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/app/_utils/auth-context";
import clsx from "clsx";
import Card from "@/app/_components/card";
import OrderDetails from "@/app/_components/order-details";
import Close from "@/app/_icons/Close";
import CartIcon from "@/app/_icons/CartIcon";
import SDCard from "@/app/_icons/SDCard";
import RightArrow from "@/app/_icons/RightArrow"
import tryCatch from "@/app/_utils/try-catch";

export default function Rental() {
  const { customer, signOut } = useContext(AuthContext);
  const [rotateItem, setRotateItem] = useState("rotate-y-0");
  const [rotateCart, setRotateCart] = useState("rotate-y-180");
  const [isCart, setIsCart] = useState(false);
  const [me, setMe] = useState(null);
  const [isOrderDetails, setIsOrderDetails] = useState(false);
  const [orders, setOrders] = useState([]);
  const [currOrder, setCurrOrder] = useState({});

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
      <div className="w-80 relative h-screen flex flex-col justify-end items-center gap-8 pb-24">
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
              <p className="text-neutral-content">{me?.description || "--"}</p>
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
        <div className={clsx("w-full card h-1/2 bg-base-100 shadow-sm overflow-y-auto transition-transform duration-600", {
          "scale-150": isOrderDetails,
          "left-20 bottom-20": isOrderDetails,
          "backdrop-blur-xs": isOrderDetails,
          "z-10": isOrderDetails,
          "opacity-90": isOrderDetails,
        })}>
        {!isOrderDetails ? (
          <div className="card-body">
            <h2 className="card-title">Orders</h2>
            {orders && <ul className="list bg-base-100 rounded-box shadow-md">
                {orders.map((order) => (
                  <li className="list-row cursor-pointer flex justify-between items-center" key={order.id} onClick={() => {orderDetails({orderId: order.id, cost: order.cost})}}>
                    <div>{order.id}</div>
                    <div className="text-xs uppercase text-success font-semibold opacity-60">$ {order.cost}</div>
                    <div className="text-xs text-success font-semibold opacity-60">Done</div>
                    <RightArrow color="var(--color-success)" />
                  </li>
                ))}
              </ul>}
          </div>
        ): (
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="card-title">Order Details</h2>
                <div className="text-xl text-success">$ {currOrder.cost||0}</div>
              </div>
              <button className="btn btn-circle btn-sm btn-error" onClick={() => {setIsOrderDetails(false)}}><Close color="var(--color-neutral-content)" /></button>
            </div>
            <OrderDetails id={currOrder.orderId} />
          </div>
        )}
        </div>
      </div>
      <div className="h-screen w-2/3 perspective-distant">
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
