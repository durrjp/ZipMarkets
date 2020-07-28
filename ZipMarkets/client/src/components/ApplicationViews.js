import React from "react"
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./auth/Login";

export default function ApplicationViews() {
    return (
        <main>
            <Switch>
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