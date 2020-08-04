import React, { useContext, useState, useEffect } from "react"
import { ZipContext } from "../../providers/ZipProvider"
import { useParams } from "react-router-dom"
import HPIGraph from "./HPIGraph"
import "./ZipDetails.css"
import ZVHIGraph from "./ZVHIGraph"
import COLTable from "./COLTable"
import {ReactComponent as Pinned} from "../../images/Pinned.svg"
import NotPinned from "../../images/NotPinned.png"
import { PinnedMarketContext } from "../../providers/PinnedMarketProvider"
import { UserContext } from "../../providers/UserProvider"
import Feed from "./Feed"
import { Spinner } from "reactstrap"

export default function ZipDetails() {
    const {getZipById, setZipReady, zipReady} = useContext(ZipContext)
    const {addPinnedMarket, deletePinnedMarket} = useContext(PinnedMarketContext)
    const {getUser} = useContext(UserContext)
    const [currentUser, setCurrentUser] = useState({
        userPinnedMarkets: []
    })
    const [oneZip, setOneZip] = useState({
        hpiList: [],
        zvhiList: [],
        state: [],
        messageList: []
    })
    const id = useParams()
    const parsedId = parseInt(id.id)
    const [isPinned, setIsPinned] = useState(false)
    const [pinReady, setPinReady] = useState(0)


    useEffect(() => {
        getUser().then(setCurrentUser).then(() => setPinReady(prev => prev + 1))
    },[])

    useEffect(() => {
        getUser().then(setCurrentUser)
    },[isPinned])

    
    useEffect(() => {
        getZipById(parsedId).then((res) => {
            setOneZip(res)}).then(() => setZipReady(true)).then(() => setPinReady(prev => prev + 1))
    },[])
        
    useEffect(() => {
        if(pinReady === 2) {
            if(currentUser.userPinnedMarkets.find(pm => pm.zipCodeId === oneZip.id)) {
                setIsPinned(true)
            }
            else {
                setIsPinned(false)
            }
        }
    },[pinReady, oneZip])
        
    const refreshZip = () => {
        getZipById(parsedId).then(setOneZip).then(() => {
            if(currentUser.userPinnedMarkets.find(pm => pm.zipCodeId === oneZip.id)) {
                setIsPinned(true)
            }
            else {
                setIsPinned(false)
            }
        })
    }
    
    const handlePin = () => {
        
        if(isPinned) {
            debugger
            const foundPM = currentUser.userPinnedMarkets.find(pm => pm.zipCodeId === oneZip.id)
            deletePinnedMarket(foundPM.id)
            setIsPinned(!isPinned)
        }
        else {
            const newPM = {
                UserId: currentUser.id,
                ZipCodeId: oneZip.id
            }
            addPinnedMarket(newPM)
            setIsPinned(!isPinned)
        }
    }

    const pinnedStatus = () => {
        if(pinReady) {
            if (isPinned) {
                return (
                    <div title="Pinned" className="pin-container">
                        <Pinned onClick={handlePin} style={{width: '34px', height: '57px'}}/>
                    </div>
                )
            }
            else {
                return (
                    <div title="Not pinned" className="pin-container">
                        <img onClick={handlePin} width= '34px' height= '57px' src={NotPinned} alt="not pinned"  />
                    </div>
                )
            }
        }
    }
    
    return (
        <>
        <main className="maindetails-container">
            <div className="title-container">
                <h1><span style={{color: "#3B5FB5", fontWeight: "bold"}}>{oneZip.zipCode}</span> {oneZip.city}, {oneZip.state.stateAbbr}</h1>
                {pinnedStatus()}
            </div>
            <div className="graphs-container">
                <div className ="oneGraph">
                    {zipReady ? <HPIGraph oneZip={oneZip} /> : <Spinner />}
                    
                </div>
                <div className="oneGraph">
                    {zipReady ? <ZVHIGraph oneZip={oneZip} /> : <Spinner />}
                </div>
            </div>
            <div className="COL-container">
                <COLTable oneZip={oneZip} />
            </div>
            <Feed refreshZip={refreshZip} oneZip={oneZip} />
        </main>
        </>
    )
}