import React, { useContext } from "react"
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./auth/Login";
import { UserContext } from "../providers/UserProvider";
import Explore from "./explore/Explore";
import ZipDetails from "./zipDetails/ZipDetails";
import Dashboard from "./dashboard/Dashboard";

export default function ApplicationViews() {
    const { isLoggedIn, isAdmin } = useContext(UserContext);
    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {   isLoggedIn ? <Explore /> : <Redirect to="/login" />}
                </Route>

                <Route path="/dashboard" exact>
                    {   isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
                </Route>

                <Route path="/zip/:id" exact>
                    {isLoggedIn ? <ZipDetails /> : <Redirect to="/login" />}
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