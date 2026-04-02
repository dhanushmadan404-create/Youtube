import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import userApi from "../api/User";

function CheckRouter({ children }) {
  const [ok, setOk] = useState(null);
  

  React.useEffect(() => {
    const check = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setOk(false);
      } else {
        try {
           const user = await userApi.me();

          if (user.status === 200) {
            setOk(true);
          } else {
            setOk(false);
          }
        } catch (error) {
          setOk(false);
        }
      }
    };

    check();
  }, []);

  if (ok === null) {
    return <h1>Loading...</h1>;
  }

  return ok ? children : <Navigate to="/" />;
}

export default CheckRouter;
