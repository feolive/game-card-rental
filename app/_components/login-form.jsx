"use client";

import { useState, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "@/app/_utils/auth-context";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { signIn } = useContext(AuthContext);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsPending(true);
    setErrorMessage(null);

    const reqData = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    const [data, error] = await signIn(reqData);
    if (error) {
      setErrorMessage("Invalid credentials.");
    }
    setIsPending(false);
  };

  return (
    <div className="card bg-base-100 w-full h- max-w-sm shrink-0 shadow-2xl mr-4 opacity-90">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control ">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered text-base-content"
            required
            ref={emailRef}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered text-base-content"
            required
            ref={passwordRef}
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" aria-disabled={isPending}>
            Login
          </button>
        </div>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <p className="text-center text-sm text-red-500">{errorMessage}</p>
          )}
          
        </div>
      </form>
    </div>
  );
}
