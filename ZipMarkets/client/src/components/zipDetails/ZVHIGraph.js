import React, { useContext, useEffect } from "react"
import {Line} from "react-chartjs-2"
import { ZVHIContext } from "../../providers/ZVHIProvider"
import { Table } from "reactstrap"


export default function ZVHIGraph({oneZip}) {
    const {avgZVHIs, getAvgZVHIs} = useContext(ZVHIContext)


    useEffect(() => {
        getAvgZVHIs()
    },[])

    const usYearArray = avgZVHIs.map(year => {
        const splitDate = year.date.split("")
        return `${splitDate[0]}${splitDate[1]}${splitDate[2]}${splitDate[3]}`
    })
    
    const yearArray = oneZip.zvhiList.map(zvhi => {
        const splitDate = zvhi.date.split("")
        return `${splitDate[0]}${splitDate[1]}${splitDate[2]}${splitDate[3]}`
    } )
    const usValueArray = avgZVHIs.map(zvhi => zvhi.average.toFixed())
    const valueArray = oneZip.zvhiList.map(zvhi => zvhi.value)
    const data ={
        labels: usYearArray,
        datasets: [
            {
                data: valueArray,
                label: oneZip.zipCode,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(255,187,99,0.4)',
                borderColor: 'rgba(255,187,99,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(255,187,99,1)',
                pointBackgroundColor: '#fff',
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
                pointHitRadius: 10,
                fontColor: "white",
            }

        ]
    }

    if(oneZip.zvhiList.length === 0 || avgZVHIs.length === 0) {
        return null
    }
    const newArray = oneZip.zvhiList.slice()
    const reverseArray = newArray.reverse()
    const yearPercChange = (((reverseArray[0].value - reverseArray[1].value) / reverseArray[1].value)*100).toFixed(2)
    const fiveYearPercChange = (((reverseArray[0].value - reverseArray[4].value) / reverseArray[4].value)*100).toFixed(2)

    const newUSArray = avgZVHIs.slice()
    const reverseUsArray = newUSArray.reverse()
    const yearUSPercChange = (((reverseUsArray[0].average - reverseUsArray[1].average) / reverseUsArray[1].average)*100).toFixed(2)
    const fiveUSYearPercChange = (((reverseUsArray[0].average - reverseUsArray[4].average) / reverseUsArray[4].average)*100).toFixed(2)


    return (
        <>
        <h3 style={{textAlign: "center", marginBottom: "1em"}}>Median Home Price (Zillow)</h3>
        <Line 
            data={data}
            options={{
                legend: {
                    labels: {
                        fontColor: "rgb(236, 236, 236)"
                    }
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Home Value ($)",
                            fontSize:15,
                            fontColor: "rgb(236, 236, 236)"
                        },
                        ticks: {
                            fontColor: "rgb(236, 236, 236)"
                        },
                        gridLines: {
                            color: "rgb(168, 168, 168,.3)"
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Year",
                            fontSize: 15,
                            fontColor: "rgb(236, 236, 236)"
                        },
                        ticks: {
                            fontColor: "rgb(236, 236, 236)"
                        },
                        gridLines: {
                            color: "rgb(168, 168, 168,.3)"
                        }
                    }]
                },
                labels: {
                    fontColor: "white"
                }
            }}
        />
        <Table style={{marginTop:"1em", color: "white", border:"5px solid", borderColor: "rgb(0,0,0,.5)"}}>
                <thead>
                    <tr>
                        <th></th>
                        <th>% Change - 1 Year</th>
                        <th>% Change - 5 Years</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{oneZip.zipCode}</th>
                        <td>{yearPercChange}%</td>
                        <td>{fiveYearPercChange}%</td>
                    </tr>
                    <tr>
                        <th>US Average</th>
                        <td>{yearUSPercChange}%</td>
                        <td>{fiveUSYearPercChange}%</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}