import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "../../providers/UserProvider";
import PinnedMarket from "./PinnedMarket";
import "./Dashboard.css"

export default function Dashboard() {
    const {getUser} = useContext(UserContext)
    const [currentUser, setCurrentUser] = useState({
        userPinnedMarkets: []
    })

    useEffect(() => {
        getUser().then(setCurrentUser)
    },[])

    return (
        <main className="dashboard-container">
            <div className="pinnedMarkets-container">
                <h1 style={{color: "white"}}>Pinned Markets</h1>
                {
                    currentUser.userPinnedMarkets.map(pm => {
                        return <PinnedMarket key={pm.id} pm={pm}  />
                    })
                }
            </div>
        </main>
    )
}