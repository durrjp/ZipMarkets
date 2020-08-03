import React, { useEffect, useState } from "react"
import {Line} from "react-chartjs-2"

export default function HPIGraph({oneZip}) {
    const yearArray = oneZip.hpiList.map(hpi => hpi.year)
    const valueArray = oneZip.hpiList.map(hpi => hpi.hpi)
    const data ={
        labels: yearArray,
        datasets: [
            {
                label: "Home Price Index",
                data: valueArray,
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(255,187,99,0.4)',
                borderColor: '#FFBB63',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#FFBB63',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#FFBB63',
                pointHoverBorderColor: 'rgba(255,187,99,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10
            }
        ]
    }
    
    if(oneZip.hpiList.length === 0) {
        return null
    }
    
    const newArray = oneZip.hpiList.slice()
    const reverseArray = newArray.reverse()
    const yearPercChange = ((reverseArray[0].hpi - reverseArray[1].hpi) / reverseArray[1].hpi)*100
    const fiveYearPercChange = ((reverseArray[0].hpi - reverseArray[4].hpi) / reverseArray[4].hpi)*100
    const tenYearPercChange = ((reverseArray[0].hpi - reverseArray[9].hpi) / reverseArray[9].hpi)*100

    return (
        <>
        <Line 
            data={data}
            options={{
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "HPI",
                            fontSize:15
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Year",
                            fontSize: 15
                        }
                    }]
                }
            }}

        />
        <div>
            <div>Change 1 Year: {yearPercChange.toFixed(2)}%</div>
            <div>Change 5 Years: {fiveYearPercChange.toFixed(2)}%</div>
            <div>Change 10 Years: {tenYearPercChange.toFixed(2)}%</div>
        </div>
        </>
    )
}