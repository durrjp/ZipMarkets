import React, { useEffect, useState, useContext } from "react"
import {Line} from "react-chartjs-2"
import { ZipContext } from "../../providers/ZipProvider"

export default function HPIGraph({oneZip}) {
    const {avgHPIs, getAvgHPIs} = useContext(ZipContext)


    useEffect(() => {
        getAvgHPIs().then(res => {
            debugger
            res.map(r => {
                return r.HPI
            })
        })
    },[])

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

    if(oneZip.hpiList.length > 0) {
        const newArray = oneZip.hpiList.slice()
        const reverseArray = newArray.reverse()
        const yearPercChange = (((reverseArray[0].hpi - reverseArray[1].hpi) / reverseArray[1].hpi)*100).toFixed(2)
        const fiveYearPercChange = (((reverseArray[0].hpi - reverseArray[4].hpi) / reverseArray[4].hpi)*100).toFixed(2)
        let tenYearPercChange = "not enough data"
        if(oneZip.hpiList.length >= 10)
        {
            tenYearPercChange = (((reverseArray[0].hpi - reverseArray[9].hpi) / reverseArray[9].hpi)*100).toFixed(2)
        }
    
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
                <div>Change 1 Year: {yearPercChange}%</div>
                <div>Change 5 Years: {fiveYearPercChange}%</div>
                <div>Change 10 Years: {tenYearPercChange}%</div>
            </div>
            </>
        )
        
    }
    
}