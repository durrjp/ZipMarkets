import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "../../providers/UserProvider";
import PinnedMarket from "./PinnedMarket";
import "./Dashboard.css"

export default function Dashboard() {
    const {getUserById} = useContext(UserContext)
    const [currentUser, setCurrentUser] = useState({
        userPinnedMarkets: []
    })
    const currentUserSesh = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        getUserById(currentUserSesh.id).then(setCurrentUser)
    },[])

    return (
        <>
        <div className="pinnedMarkets-container">
            <h1>Pinned Markets</h1>
            {
                currentUser.userPinnedMarkets.map(pm => {
                    return <PinnedMarket key={pm.id} pm={pm}  />
                })
            }
        </div>
        </>
    )
}