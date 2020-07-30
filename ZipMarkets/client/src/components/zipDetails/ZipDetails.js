import React, { useContext, useState, useEffect } from "react"
import { ZipContext } from "../../providers/ZipProvider"
import { useParams } from "react-router-dom"
import HPIGraph from "./HPIGraph"
import "./ZipDetails.css"
import ZVHIGraph from "./ZVHIGraph"
import COLTable from "./COLTable"

export default function ZipDetails() {
    const {getZipById} = useContext(ZipContext)
    const [oneZip, setOneZip] = useState({
        hpiList: [],
        zvhiList: [],
        state: []
    })
    const id = useParams()
    const parsedId = parseInt(id.id)

    useEffect(() => {
        getZipById(parsedId).then(setOneZip)
    },[])
    
    

    return (
        <>
        <h1>{oneZip.zipCode} {oneZip.city}, {oneZip.state.stateAbbr}</h1>
        <div className="graphs-container">
            <div className ="oneGraph">
            <HPIGraph oneZip={oneZip} />
            </div>
            <div className="oneGraph">
            <ZVHIGraph oneZip={oneZip} />
            </div>
        </div>
        <div className="COL-container">
            <COLTable oneZip={oneZip} />
        </div>
        <div className="feed-container">
            Live Feed
        </div>
        </>
    )
}