import React, { useEffect, useContext } from "react"
import {Line} from "react-chartjs-2"
import { HPIContext } from "../../providers/HPIProvider"

export default function HPIGraph({oneZip}) {
    const {avgHPIs, getAvgHPIs} = useContext(HPIContext)


    useEffect(() => {
        getAvgHPIs()
    },[])
    const usYearArray = avgHPIs.map(hpi => {
        return hpi.year
    })
    const usValueArray = avgHPIs.map(hpi => {
        return hpi.average
    })

    const yearArray = oneZip.hpiList.map(hpi => hpi.year)
    const valueArray = oneZip.hpiList.map(hpi => hpi.hpi)
    const data ={
        labels: usYearArray,
        datasets: [
            {
                label: oneZip.zipCode,
                data: valueArray,
                fill: false,
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
                pointRadius: 1,
                pointHitRadius: 10
            },
            {
                data: usValueArray,
                fill: false,
                label: "US Average",
                lineTension: 0.1,
                backgroundColor: 'rgba(82,113,255,0.4)',
                borderColor: 'rgba(82,113,255,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(82,113,255,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointRadius: 1,
                pointHitRadius: 10
            }
        ]
    }
    
    if(oneZip.hpiList.length === 0) {
        return (
            <div>
                <h4>Insufficient data...</h4>
            </div>
        )
    }

    if(oneZip.hpiList.length > 0) {
        const newArray = oneZip.hpiList.slice()
        const reverseArray = newArray.reverse()
        const yearPercChange = (((reverseArray[0].hpi - reverseArray[1].hpi) / reverseArray[1].hpi)*100).toFixed(2)
        const fiveYearPercChange = (((reverseArray[0].hpi - reverseArray[4].hpi) / reverseArray[4].hpi)*100).toFixed(2)
    
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
            </div>
            </>
        )
        
    }
    
}