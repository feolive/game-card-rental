"use client";

import { useEffect, useState } from "react";
import tryCatch from "@/app/_utils/try-catch";

export default function OrderDetails({ id }) {

  const [details, setDetails] = useState([]);

  useEffect(() => {
    async function fetchDetails() {
      const [data, error] = await tryCatch(async () => await fetch(`/api/rental/order/details/${id}`));
      if(error){
        console.error(error);
        return;
      }
      if(!data){
        return;
      }
      const orderData = await data.json();
      setDetails(orderData);
    }
    if(!id){
      return;
    }
    fetchDetails();
  }, [id]);


  return (
    <>
      {details && <ul className="list bg-base-100 rounded-box shadow-md">
        {details.map((detail) => (
          <li className="list-row" key={detail.id}>
            <div><img src={detail.img} alt="Card Cover" className="size-12 rounded-box" /></div>
            <div>
              <div className="text-xs uppercase font-semibold opacity-60">{detail.name}</div>
              <div>{detail.description||"--"}</div>
            </div>
            <div>$ {detail.price} x {detail.quantity}</div>
          </li>
        ))}
      </ul>}
    </>
  );
}