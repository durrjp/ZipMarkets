import React, { useState, useEffect, useContext } from "react"
import {Button} from "reactstrap";
import { UserContext } from "../../providers/UserProvider";
import PinnedMarket from "./PinnedMarket";
import "./Dashboard.css"
import PinView from "./PinView";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
    const {getUser} = useContext(UserContext)
    const [pinView, setPinView] = useState([])
    const [firstZip, setFirstZip] = useState(0)
    const [secondZip, setSecondZip] = useState(0)
    const history = useHistory()
    const [currentUser, setCurrentUser] = useState({
        userPinnedMarkets: []
    })

    useEffect(() => {
        getUser().then(setCurrentUser)
    },[])

    const refreshUser = () => {
        getUser().then(setCurrentUser)
    }

    const routeToCompare = () => {
        if(firstZip !== 0 && secondZip !== 0) {
            history.push(`/comparison/${firstZip.zipCode.zipCode},${secondZip.zipCode.zipCode}`)
        }
    }

    const onDragOver = (e) => {
        e.preventDefault()
    }

    const onDrop = (e, boxName) => {
        let transferZip = parseInt(e.dataTransfer.getData("zip"))
        if(boxName === "chosenMarket1") {
            let chosenZip = currentUser.userPinnedMarkets.find(market => market.zipCode.zipCode === transferZip)
            setFirstZip(chosenZip)
        }
        else if (boxName === "chosenMarket2") {
            let chosenZip = currentUser.userPinnedMarkets.find(market => market.zipCode.zipCode === transferZip)
            setSecondZip(chosenZip)
        }
    }


    
    return (
        <main className="dashboard-container">
            <div className="title-container" style={{marginTop: "1em", marginBottom: "2em"}}>
                <h1>Dashboard</h1>
            </div>
            <div className="bodycontainer">
                <div className="secondmain-container">
                    <div style={{textAlign: "center"}}>
                        <h1 style={{color: "white"}}>Pinned Markets</h1>
                    </div>
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
                <div className="compare-container">
                    <h1 style={{color: "white"}}>Market Comparison</h1>
                    <div className="dropboxes-container">
                        <div className="dropbox" 
                            onDragOver={e => onDragOver(e)}
                            onDrop={e => onDrop(e, "chosenMarket1")}
                        >
                            <span className="drag-text">Drag zip code here</span>
                            {
                                firstZip !== 0 &&
                                    <PinnedMarket key={firstZip.id} pm ={firstZip} pinView={pinView} setPinView={setPinView} />
                            }
                        </div>
                            <Button className="compare-button" onClick={e => {
                                e.preventDefault()
                                routeToCompare()

                            }}>
                                Compare
                            </Button>
                        <div className="dropbox"
                            onDragOver={e => onDragOver(e)}
                            onDrop = {e => onDrop(e, "chosenMarket2")}
                        >
                            <span className="drag-text">Drag zip code here</span>
                            {
                                secondZip !== 0 &&
                                    <PinnedMarket key={secondZip.id} pm ={secondZip} pinView={pinView} setPinView={setPinView} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}