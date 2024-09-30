import { createContext, useState, useEffect } from "react";

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    useEffect(() => {
        // Check if the accessToken cookie is present
        const token = getCookie("token");
        if (token) {
          setIsAuthenticated(true); // Set authenticated state if cookie is found
        } else {
          setIsAuthenticated(false)
        }
      }, []);


    const [isAuthenticated, setIsAuthenticated] = useState(false);



    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;