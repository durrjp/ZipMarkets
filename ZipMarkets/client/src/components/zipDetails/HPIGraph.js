import React from "react"
import {Line} from "react-chartjs-2"

export default function HPIGraph({oneZip}) {
    const yearArray = oneZip.hpiList.map(hpi => hpi.year)
    const valueArray = oneZip.hpiList.map(hpi => hpi.hpi)
    const data ={
        labels: yearArray,
        datasets: [
            {
                label: "HPI Values",
                data: valueArray
            }
        ]
    }
    return (
        <Line 
            data={data}
        />
    )
}