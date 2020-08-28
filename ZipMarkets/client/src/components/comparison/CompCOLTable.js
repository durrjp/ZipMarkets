import React from "react"
import { Table } from "reactstrap"

export default function CompCOLTable({twoZips}) {
    let cIcolor1 = ""
    if (twoZips[0].state.costIndex < 100) {
        cIcolor1 = "rgb(114, 207, 114)"
    } 
    else {
        cIcolor1 = "rgb(238, 49, 49)"

    }
    let cIcolor2 = ""
    if (twoZips[1].state.costIndex < 100) {
        cIcolor2 = "rgb(114, 207, 114)"
    } 
    else {
        cIcolor2 = "rgb(238, 49, 49)"

    }

    return (
        <>
        <h3 style={{marginBottom: "1em", marginTop: "2em"}}>Cost of Living Comparison</h3>
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
                    <th>{twoZips[0].state.stateName}</th>
                    <td style={{color: cIcolor1}}>{twoZips[0].state.costIndex}</td>
                    <td style={{color: cIcolor1}}>{twoZips[0].state.groceryCost}</td>
                    <td style={{color: cIcolor1}}>{twoZips[0].state.housingCost}</td>
                    <td style={{color: cIcolor1}}>{twoZips[0].state.utilitiesCost}</td>
                    <td style={{color: cIcolor1}}>{twoZips[0].state.transportationCost}</td>
                    <td style={{color: cIcolor1}}>{twoZips[0].state.miscCost}</td>
                </tr>
                <tr>
                    <th>{twoZips[1].state.stateName}</th>
                    <td style={{color: cIcolor2}}>{twoZips[1].state.costIndex}</td>
                    <td style={{color: cIcolor2}}>{twoZips[1].state.groceryCost}</td>
                    <td style={{color: cIcolor2}}>{twoZips[1].state.housingCost}</td>
                    <td style={{color: cIcolor2}}>{twoZips[1].state.utilitiesCost}</td>
                    <td style={{color: cIcolor2}}>{twoZips[1].state.transportationCost}</td>
                    <td style={{color: cIcolor2}}>{twoZips[1].state.miscCost}</td>
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