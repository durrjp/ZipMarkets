import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "../../providers/UserProvider";
import PinnedMarket from "./PinnedMarket";
import "./Dashboard.css"
import PinView from "./PinView";

export default function Dashboard() {
    const {getUser} = useContext(UserContext)
    const [pinView, setPinView] = useState([])
    const [currentUser, setCurrentUser] = useState({
        userPinnedMarkets: []
    })

    useEffect(() => {
        getUser().then(setCurrentUser)
    },[])

    return (
        <main className="dashboard-container">
            <h1 style={{color: "white"}}>Pinned Markets</h1>
            <div className="secondmain-container">
                <div className="pinnedMarkets-container">
                    {
                        currentUser.userPinnedMarkets.map(pm => {
                            return <PinnedMarket key={pm.id} pm={pm} pinView={pinView} setPinView={setPinView} />
                        })
                    }
                </div>
                <div className="pinView-container">
                    <PinView pinView={pinView} />
                </div>
            </div>
        </main>
    )
}