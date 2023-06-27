import React, { useEffect, useState } from "react";
import { Route ,Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({ children,component: Component , ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("CURRENT ADMIN RES", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("ADMIN ROUTE ERR", err);
          setOk(false);
        });
    }
  }, [user]);

  return (ok &&  <Route {...rest} render={(props) => {
            if (user===null) {
              return <Redirect to="/login" />;
            }

            

            return <Component {...props} />;
          }}/> )
};

export default AdminRoute;