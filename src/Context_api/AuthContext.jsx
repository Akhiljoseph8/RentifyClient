import React, { createContext, useEffect, useState } from "react";

export const tokenAuthContext = createContext();

function AuthContext({ children }) {
  const [authStatus, SetAuthStatus] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      SetAuthStatus(true);
    } else {
      SetAuthStatus(false);
    }
  }, []);
  return (
    <>
      <tokenAuthContext.Provider value={{ authStatus, SetAuthStatus }}>
        {children}
      </tokenAuthContext.Provider>
    </>
  );
}

export default AuthContext;
