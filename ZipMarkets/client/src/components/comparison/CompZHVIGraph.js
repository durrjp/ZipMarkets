import React, { useContext, useEffect } from "react"
import {Line} from "react-chartjs-2"
import { ZVHIContext } from "../../providers/ZVHIProvider"
import { Table } from "reactstrap"


export default function ZVHIGraph({twoZips}) {
    const {avgZVHIs, getAvgZVHIs} = useContext(ZVHIContext)


    useEffect(() => {
        getAvgZVHIs()
    },[])

    const usYearArray = avgZVHIs.map(year => {
        return year.date
    })
    
    const missedYearsArray = usYearArray.map(year => {
        const yearObj = {"year": year}
        if(twoZips[0].zvhiList.find(zhvi => zhvi.date === year) && twoZips[1].zvhiList.find(zhvi => zhvi.date === year)) {
            const foundZHVI1 = twoZips[0].zvhiList.find(zhvi => zhvi.date === year)
            const foundZHVI2 = twoZips[1].zvhiList.find(zhvi => zhvi.date === year)
            yearObj["zip1"] = foundZHVI1.value
            yearObj["zip2"] = foundZHVI2.value
        }
        else if (twoZips[0].zvhiList.find(zhvi => zhvi.date === year)) {
            const foundZHVI1 = twoZips[0].zvhiList.find(zhvi => zhvi.date === year)
            yearObj["zip1"] = foundZHVI1.value
            yearObj["zip2"] = null
        }
        else if (twoZips[1].zvhiList.find(zhvi => zhvi.date === year)) {
            const foundZHVI2 = twoZips[1].zvhiList.find(zhvi => zhvi.date === year)
            yearObj["zip1"] = null
            yearObj["zip2"] = foundZHVI2.value
        }
        else {
            yearObj["zip1"] = null
            yearObj["zip2"] = null
        }
        return yearObj
    })

    const shortYearArray = usYearArray.map(year => {
        const splitDate = year.split("")
        return `${splitDate[0]}${splitDate[1]}${splitDate[2]}${splitDate[3]}`
    })  

    const zip1Values = missedYearsArray.map(year => {
        return year.zip1
    })

    const zip2Values = missedYearsArray.map(year => {
        return year.zip2
    })
    
    
    const data ={
        labels: shortYearArray,
        datasets: [
            {
                data: zip1Values,
                label: twoZips[0].zipCode,
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
                data: zip2Values,
                fill: false,
                label: twoZips[1].zipCode,
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

    // if(oneZip.zvhiList.length === 0 || avgZVHIs.length === 0) {
    //     return null
    // }
    // const newArray = oneZip.zvhiList.slice()
    // const reverseArray = newArray.reverse()
    // const yearPercChange = (((reverseArray[0].value - reverseArray[1].value) / reverseArray[1].value)*100).toFixed(2)
    // const fiveYearPercChange = (((reverseArray[0].value - reverseArray[4].value) / reverseArray[4].value)*100).toFixed(2)

    // const newUSArray = avgZVHIs.slice()
    // const reverseUsArray = newUSArray.reverse()
    // const yearUSPercChange = (((reverseUsArray[0].average - reverseUsArray[1].average) / reverseUsArray[1].average)*100).toFixed(2)
    // const fiveUSYearPercChange = (((reverseUsArray[0].average - reverseUsArray[4].average) / reverseUsArray[4].average)*100).toFixed(2)

    // let ypcColor = ""
    // if (yearPercChange > 0) {
    //     ypcColor = "rgb(114, 207, 114)"
    // } 
    // else {
    //     ypcColor = "rgb(238, 49, 49)"

    // }

    // let fpcColor = ""
    // if (fiveYearPercChange > 0) {
    //     fpcColor = "rgb(114, 207, 114)"
    // } 
    // else {
    //     fpcColor = "rgb(238, 49, 49)"

    // }

    // let ypcUSColor = ""
    // if (yearUSPercChange > 0) {
    //     ypcUSColor = "rgb(114, 207, 114)"
    // } 
    // else {
    //     ypcUSColor = "rgb(238, 49, 49)"

    // }

    // let fpcUSColor = ""
    // if (fiveUSYearPercChange > 0) {
    //     fpcUSColor = "rgb(114, 207, 114)"
    // } 
    // else {
    //     fpcUSColor = "rgb(238, 49, 49)"

    // }


    return (
        <>
        <h3 style={{textAlign: "center", marginBottom: "1em"}}>Median Home Price Comparison</h3>
        <Line 
            data={data}
            options={{
                lineHeightAnnotation: {
                    color: "rgb(255,255,255,.5)",
                    hover: false,
                    always: false,
                    noDash: true
                },
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
        {/* <Table style={{marginTop:"1em", color: "white"}}>
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
            </Table> */}
        </>
    )
}