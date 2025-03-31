"use client";

import { createContext, useState } from "react";
import tryCatch from "@/app/_utils/try-catch";
import { useEffect } from "react";
import StaffLogin from "../_components/staff-login";
import { supabaseGetUser, supabaseSignIn, supabaseSignOut, supabaseSignUp } from "@/app/_utils/supabase";

const AuthContext = createContext();


export default function AuthContextProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = async ({email, password}) => {
    const [data, error] = await tryCatch(() => supabaseSignIn({ email, password }));
    if(error){
      console.error(error);
    }else{
      setLoading(true);
    }
    return [data, error];
  };

  const signOut = async () => {
    const [data, error] = await tryCatch(() => supabaseSignOut());
    if(error){
      console.error(error);
    }else{
        setLoading(true);
    }
    return [data, error];
  };

  const signUp = async ({email, password}) => {
    const [data, error] = await tryCatch(() => supabaseSignUp({ email, password }));
    if(error){
      console.error(error);
    }else{
      setLoading(true);
    }
    return [data, error];
  };

  useEffect(() => {
    const getUser = async () => {
        const [data, error] = await tryCatch(() => supabaseGetUser());
        if(error || data[1] !== null){
            console.error(error);
            setUser(null);
        }else{
            let user = data[0]['data']['user'];
            setUser(user);
        }
        setLoading(false);
    };
    getUser();
  }, [loading]);


  return <AuthContext.Provider value={{user, signIn, signOut, signUp}}>
    {user ? children : <StaffLogin />}</AuthContext.Provider>;
}

export { AuthContext }
