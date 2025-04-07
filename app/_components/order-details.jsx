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
      {details && <ul className="list w-full bg-base-100 rounded-box shadow-md text-xs">
        {details.map((detail) => (
          <li className="list-row flex justify-between items-center" key={detail.id}>
            <figure><img src={detail.img} alt="Card Cover" className="size-12 rounded-box object-contain" /></figure>
            <div className="w-1/2 flex flex-col justify-center items-start">
              <div className="text-xs uppercase font-semibold line-clamp-2" title={detail.name}>{detail.name}</div>
              <div className="text-xs opacity-60 line-clamp-2" title={detail.description}>{detail.description||"--"}</div>
            </div>
            <div className="text-xs opacity-60">$ {detail.price} x {detail.quantity}</div>
          </li>
        ))}
      </ul>}
    </>
  );
}