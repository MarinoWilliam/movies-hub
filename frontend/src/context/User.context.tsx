import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface User {
  id: number;
  name: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  validateToken: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children} : {children:React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);

  const validateToken = async () => {
    const accessToken = Cookies.get("access_token") || "";
    try {
      const response = await axios.get("http://localhost:3333/auth", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.valid) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, validateToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
    const context = useContext(UserContext);
  
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
  
    return context;
  };
