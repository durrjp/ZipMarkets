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
        } else {
            alert("Please select two zip codes to compare...")
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

    const dragText1 = () => {
        if(firstZip ===0) {
            return "drag-text"
        } else {
            return "none"
        }
    }

    const dragtext2 = () => {
        if(secondZip ===0) {
            return "drag-text"
        } else {
            return "none"
        }
    }

    const clearBtn1 = () => {
        if(firstZip === 0) {
            return "none"
        } else {
            return "clearSelection-btn"
        }
    }

    const clearBtn2 = () => {
        if(secondZip === 0) {
            return "none"
        } else {
            return "clearSelection-btn"
        }
    }

    const compareButton = () => {
        if(firstZip !== 0 && secondZip !== 0) {
            return "compare-button-ready"
        } else {
            return "compare-button"
        }
    }


    
    return (
        <main className="dashboard-container">
            <div className="title-container" style={{marginTop: "1em", marginBottom: "2em"}}>
                <h1>Dashboard - <span style={{color: "#3B5FB5", fontWeight: "bold"}}>{currentUser.displayName}</span></h1>
            </div>
            <div className="body-container">
                <div className="secondmain-container">
                    <div style={{textAlign: "center"}}>
                        <h1 style={{color: "white"}}>Pinned Markets</h1>
                    </div>
                    <div className="pinnedMarkets-container" id="scroll-style">
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
                            <h4 className={dragText1()}>Drag zip code here</h4>
                            {
                                firstZip !== 0 &&
                                    <PinnedMarket key={firstZip.id} pm ={firstZip} pinView={pinView} setPinView={setPinView} />
                            }
                            <Button className={clearBtn1()} onClick={e => {
                                e.preventDefault()
                                setFirstZip(0)}
                            }
                            >
                                Clear selection
                            </Button>
                        </div>
                            <Button className={compareButton()} onClick={e => {
                                e.preventDefault()
                                routeToCompare()

                            }}>
                                Compare
                            </Button>
                        <div className="dropbox"
                            onDragOver={e => onDragOver(e)}
                            onDrop = {e => onDrop(e, "chosenMarket2")}
                        >
                            <h4 className={dragtext2()}>Drag zip code here</h4>
                            {
                                secondZip !== 0 &&
                                    <PinnedMarket key={secondZip.id} pm ={secondZip} pinView={pinView} setPinView={setPinView} />
                            }
                            <Button className={clearBtn2()} onClick={e => {
                                e.preventDefault()
                                setSecondZip(0)}
                            }
                            >
                                Clear selection
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}