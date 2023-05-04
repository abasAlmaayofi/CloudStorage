import React, {useContext, useState} from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthDetails";

export const PrivateRoute = ({children}) => {
    const {currentUser} = useContext(AuthContext);
    return currentUser ? children : <Navigate to="/signin" replace/>;
}
