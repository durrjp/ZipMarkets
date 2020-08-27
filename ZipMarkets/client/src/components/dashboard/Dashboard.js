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
    const [firstZip, setFirstZip] = useState()
    const [secondZip, setSecondZip] = useState()
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
        history.push(`/comparison/${firstZip},${secondZip}`)
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
                <Input
                    type="select"
                    onChange={e => setFirstZip(e.target.value)}
                >
                    {
                        currentUser.userPinnedMarkets.map(pm => {
                            return <option value={pm.zipCode.id}>{pm.zipCode.zipCode}</option>
                        })
                    }
                </Input>
                <Input
                    type="select"
                    onChange={e => setSecondZip(e.target.value)}
                >
                    {
                        currentUser.userPinnedMarkets.map(pm => {
                            return <option>{pm.zipCode.zipCode}</option>
                        })
                    }
                </Input>
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