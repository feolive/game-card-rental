"use client";

import { createContext, useState } from "react";
import tryCatch from "@/app/_utils/try-catch";
import { useEffect, useContext } from "react";
import { supabaseGetUser, supabaseSignIn, supabaseSignOut, supabaseSignUp,supabaseGetCustomer } from "@/app/_utils/supabase";

const AuthContext = createContext();


export default function AuthContextProvider({ children, loginPage, needLogin=true }) {

  const [user, setUser] = useState(null);
  const [customer, setCustomer] = useState(null);
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
        setCustomer(null);
        setLoading(true);
    }
    return [data, error];
  };

  const signUp = async ({email, password, firstName, lastName, avatarAddr}) => {
    const [data, error] = await tryCatch(() => supabaseSignUp({ email, password, firstName, lastName, avatarAddr, type: "customer" }));
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
            console.log(error);
            setUser(null);
        }else{
            let user = data[0]['data']['user'];
            setUser(user);
            const [customerData, customerError] = await tryCatch(() => supabaseGetCustomer({user}));
            if(customerError || customerData[0]==null){
                console.log(customerError);
                setCustomer(null);
            }else{
                setCustomer(customerData[0]);
            }
        }
        setLoading(false);
    };
    getUser();
  }, [loading]);


  return <AuthContext.Provider value={{user, signIn, signOut, signUp, customer}}>
    {
      needLogin ? (user ? children : loginPage) : children
    }
    </AuthContext.Provider>;
}

export { AuthContext }


