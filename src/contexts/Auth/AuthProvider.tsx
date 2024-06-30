'use client'
import React, { useState, createContext, ReactNode, useEffect } from "react";
import { Models } from 'appwrite'; 
import axios from "axios";
import { cookies } from "next/headers";


interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  setUser: React.Dispatch<React.SetStateAction<Models.User<Models.Preferences> | null>>;
}

// Auth Context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => { }
});

// Auth Provider
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

  // initialy fetching user details on application load 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/getUser")
        console.log("got user in response")
        if(response.data.success)
          setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
