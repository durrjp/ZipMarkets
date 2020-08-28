import React, { useState, useEffect, useContext } from "react"
import {Input, Button} from "reactstrap";
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
            <div>
                <h1>Compare</h1>
                <div className="dropboxes-container">
                    <div className="dropbox" 
                         onDragOver={e => onDragOver(e)}
                         onDrop={e => onDrop(e, "chosenMarket1")}
                    >
                        Drag zip code here
                        {
                            firstZip !== 0 &&
                                <PinnedMarket key={firstZip.id} pm ={firstZip} pinView={pinView} setPinView={setPinView} />
                        }
                    </div>
                    <div className="dropbox"
                         onDragOver={e => onDragOver(e)}
                         onDrop = {e => onDrop(e, "chosenMarket2")}
                    >
                        Drag zip code here
                        {
                            secondZip !== 0 &&
                                <PinnedMarket key={secondZip.id} pm ={secondZip} pinView={pinView} setPinView={setPinView} />
                        }
                    </div>
                </div>
                {/* <Input
                    type="select"
                    onChange={e => setFirstZip(e.target.value)}
                >
                    <option value="0">Select a zip code...</option>
                    {
                        currentUser.userPinnedMarkets.map(pm => {
                            return <option value={pm.zipCode.zipCode}>{pm.zipCode.zipCode}</option>
                        })
                    }
                </Input>
                <Input
                    type="select"
                    onChange={e => setSecondZip(e.target.value)}
                >
                    <option value="0">Select a zip code...</option>
                    {
                        currentUser.userPinnedMarkets.map(pm => {
                            return <option value={pm.zipCode.zipCode}>{pm.zipCode.zipCode}</option>
                        })
                    }
                </Input> */}
                <Button onClick={e => {
                    e.preventDefault()
                    routeToCompare()

                }}>
                    Compare
                </Button>
            </div>
        </main>
    )
}