"use client";

import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/app/_utils/auth-context";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [customer, setCustomer] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });
  const { signUp } = useContext(AuthContext);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const [data, error] = await signUp({ ...customer, type: "customer" });
    if (error) {
      console.error(error);
      return;
    }
    router.replace('/rental');
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">New Customer</legend>

        <label className="fieldset-label">Email</label>
        <input type="email" className="input" placeholder="Email" required value={customer?.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />

        <label className="fieldset-label">Password</label>
        <input type="password" className="input" placeholder="Password" required value={customer?.password} onChange={(e) => setCustomer({ ...customer, password: e.target.value })} />

        <label className="fieldset-label">First Name</label>
        <input type="text" className="input" placeholder="First Name" required value={customer?.firstName} onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })} />

        <label className="fieldset-label">Last Name</label>
        <input type="text" className="input" placeholder="Last Name" required value={customer?.lastName} onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })} />

        <button className="btn btn-secondary mt-4" onClick={handleSubmit}>Signup</button>
      </fieldset>
    </div>
  );
}
