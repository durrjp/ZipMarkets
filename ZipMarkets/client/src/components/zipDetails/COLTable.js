import React from "react"
import { Table } from "reactstrap"

export default function COLTable({oneZip}) {
    let cIcolor = ""
    if (oneZip.state.costIndex < 100) {
        cIcolor = "rgb(114, 207, 114)"
    } 
    else {
        cIcolor = "rgb(238, 49, 49)"

    }

    return (
        <>
        <h3 style={{marginBottom: "1em", marginTop: "2em"}}>Cost of Living</h3>
        <Table style={{color: "white", border:"5px solid", borderColor: "rgb(0,0,0,.5)"}}>
            <thead>
                <tr>
                    <th>State</th>
                    <th>Total Cost Index</th>
                    <th>Grocery Cost</th>
                    <th>Housing Cost</th>
                    <th>Utilities Cost</th>
                    <th>Transportation Cost</th>
                    <th>Misc Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>{oneZip.state.stateName}</th>
                    <td style={{color: cIcolor}}>{oneZip.state.costIndex}</td>
                    <td style={{color: cIcolor}}>{oneZip.state.groceryCost}</td>
                    <td style={{color: cIcolor}}>{oneZip.state.housingCost}</td>
                    <td style={{color: cIcolor}}>{oneZip.state.utilitiesCost}</td>
                    <td style={{color: cIcolor}}>{oneZip.state.transportationCost}</td>
                    <td style={{color: cIcolor}}>{oneZip.state.miscCost}</td>
                </tr>
                <tr>
                    <th>Average</th>
                    <td>100.0</td>
                    <td>100.0</td>
                    <td>100.0</td>
                    <td>100.0</td>
                    <td>100.0</td>
                    <td>100.0</td>
                </tr>
            </tbody>
        </Table>
        </>
    )
}