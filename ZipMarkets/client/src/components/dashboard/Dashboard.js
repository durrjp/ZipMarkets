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

    const refreshUser = () => {
        getUser().then(setCurrentUser)
    }

    

    return (
        <main className="dashboard-container">
            <div className="title-container" style={{marginTop: "1em", marginBottom: "2em"}}>
                <h1>Pinned Markets</h1>
            </div>
            <div className="secondmain-container">
                <div className="pinnedMarkets-container">
                    {
                        currentUser.userPinnedMarkets.map(pm => {
                            return <PinnedMarket key={pm.id} pm={pm} pinView={pinView} setPinView={setPinView} />
                        })
                    }
                </div>
                <div className="pinView-container">
                    <PinView setPinView={setPinView} refresh={refreshUser} currentUser={currentUser} pinView={pinView} />
                </div>
            </div>
        </main>
    )
}