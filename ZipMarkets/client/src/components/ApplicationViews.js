import React, { useContext } from "react"
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./auth/Login";
import { UserContext } from "../providers/UserProvider";
import Explore from "./explore/Explore";

export default function ApplicationViews() {
    const { isLoggedIn, isAdmin } = useContext(UserContext);
    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {   isLoggedIn ? <Explore /> : <Redirect to="/login" />}
                </Route>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    {/* <Register/> */}
                </Route>
            </Switch>
        </main>
    )
}