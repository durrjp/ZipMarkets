import React, { useContext, useEffect } from "react"
import { ZipContext } from "../../providers/ZipProvider"
import HPIGraph from "./HPIGraph"
import ZVHIGraph from "./ZVHIGraph"
import MortgageRateGraph from "./MortgageRateGraph"
import COLTable from "./COLTable"
import { useParams } from "react-router-dom"

export default function Comparison() {
    const {twoZips, getTwoZips} = useContext(ZipContext)
    const zips = useParams()
    
    useEffect(() => {
        getTwoZips(zips.zips)
    },[])

    if(twoZips.length === 0) {
        return null
    }

    return (
        <main className="maindetails-container">
            <div className="title-container">
                <h1><span style={{color: "#3B5FB5", fontWeight: "bold"}}>{twoZips[0].zipCode}</span> vs {twoZips[1].zipCode}</h1>
            </div>
            {/* <div className="graphs-container">
                <div className ="oneGraph">
                   <HPIGraph twoZips={twoZips} />
                    
                </div>
                <div className="oneGraph">
                    <ZVHIGraph twoZips={twoZips} />
                </div>
            </div>
            <div className="mrGraph-container">
                <div className="mrGraph">
                    <MortgageRateGraph />
                </div>
            </div>
            <div className="COL-container">
                <COLTable twoZips={twoZips} />
            </div> */}
        </main>
    )
}