"use client";

import { useContext } from "react";
import { AuthContext } from "@/app/_utils/auth-context";
import Card from "../_components/card";

export default function Rental() {

  const { customer, signOut } = useContext(AuthContext);

  return (
    <div className="w-full h-full flex justify-center items-center min-h-screen gap-24 font-[family-name:var(--font-geist-sans)]">
      <div className="w-80 h-screen flex flex-col justify-end items-center gap-8 pb-24">
        <div className="w-full card h-1/3 bg-base-100 shadow-sm">
          <div className="card-body flex flex-col justify-center items-center">
            <h2 className="card-title">Customer</h2>
            <button className="btn btn-outline" onClick={signOut}>Sign Out</button>
          </div>
        </div>
        <div className="w-full card h-1/2 bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Orders</h2>
          </div>
        </div>
      </div>
      <div className="h-screen w-2/3 relative">
        <Card>
          <h2 className="card-title">Game Cards</h2>
        </Card>
        <Card>
          <h2 className="card-title">Cart</h2>
        </Card>
      </div>
    </div>
  );
}