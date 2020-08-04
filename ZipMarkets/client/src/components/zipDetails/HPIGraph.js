import React, { useEffect, useContext } from "react"
import {Line} from "react-chartjs-2"
import { HPIContext } from "../../providers/HPIProvider"
import { Table } from "reactstrap"

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

    const valueArray = oneZip.hpiList.map(hpi => hpi.hpi)

    const missedYearsArray = usYearArray.map(year => {
        const yearObj = {"year": year}
        if(oneZip.hpiList.find(hpi => hpi.year === year)) {
            const foundUsAvg = avgHPIs.find(avg => avg.year === year)
            const foundHPI = oneZip.hpiList.find(hpi => hpi.year === year)
            yearObj["avg"] = foundUsAvg.average
            yearObj["zip"] = foundHPI.hpi
        }
        else {
            const foundUsAvg = avgHPIs.find(avg => avg.year === year)
            yearObj["avg"] = foundUsAvg.average
            yearObj["zip"] = null
        }
        return yearObj
    })
    
    const zipValues = missedYearsArray.map(year => {
        return year.zip
    })

    const usValues = missedYearsArray.map(year => {
        return year.avg
    })
    
    const data = {
        labels: usYearArray,
        datasets: [
            {
                label: oneZip.zipCode,
                data: zipValues,
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
                data: usValues,
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
    
    if(avgHPIs.length === 0) {
        return null
    }


    let yearPercChange = ""
    let fiveYearPercChange = ""
    if(oneZip.hpiList.length !== 0) {
        const newArray = oneZip.hpiList.slice()
        const reverseArray = newArray.reverse()
        yearPercChange = (((reverseArray[0].hpi - reverseArray[1].hpi) / reverseArray[1].hpi)*100).toFixed(2)
        fiveYearPercChange = (((reverseArray[0].hpi - reverseArray[4].hpi) / reverseArray[4].hpi)*100).toFixed(2)
    }

    const newUSArray = avgHPIs.slice()
    const reverseUsArray = newUSArray.reverse()
    const yearUSPercChange = (((reverseUsArray[0].average - reverseUsArray[1].average) / reverseUsArray[1].average)*100).toFixed(2)
    const fiveUSYearPercChange = (((reverseUsArray[0].average - reverseUsArray[4].average) / reverseUsArray[4].average)*100).toFixed(2)

    let ypcColor = ""
    if (yearPercChange > 0) {
        ypcColor = "rgb(114, 207, 114)"
    } 
    else {
        ypcColor = "rgb(238, 49, 49)"

    }

    let fpcColor = ""
    if (fiveYearPercChange > 0) {
        fpcColor = "rgb(114, 207, 114)"
    } 
    else {
        fpcColor = "rgb(238, 49, 49)"

    }

    let ypcUSColor = ""
    if (yearUSPercChange > 0) {
        ypcUSColor = "rgb(114, 207, 114)"
    } 
    else {
        ypcUSColor = "rgb(238, 49, 49)"

    }

    let fpcUSColor = ""
    if (fiveUSYearPercChange > 0) {
        fpcUSColor = "rgb(114, 207, 114)"
    } 
    else {
        fpcUSColor = "rgb(238, 49, 49)"

    }

    return (
        <>
        <h3 style={{textAlign: "center", marginBottom: "1em"}}>Home Price Index (FHFA)</h3>
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
                            labelString: "Home Price Index",
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
                }
            }}

        />
        <Table style={{marginTop:"1em", color: "white"}}>
            <thead>
                <tr>
                    <th></th>
                    <th>% Change: 1 Year</th>
                    <th>% Change: 5 Years</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>{oneZip.zipCode}</th>
                    <td style={{color: ypcColor}}>{yearPercChange}%</td>
                    <td style={{color: fpcColor}}>{fiveYearPercChange}%</td>
                </tr>
                <tr>
                    <th>US Average</th>
                    <td style={{color: ypcUSColor}}>{yearUSPercChange}%</td>
                    <td style={{color: fpcUSColor}}>{fiveUSYearPercChange}%</td>
                </tr>
            </tbody>
        </Table>
        </>
    )
}