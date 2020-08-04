import React, { useContext, useEffect } from "react"
import {Line} from "react-chartjs-2"
import { ZVHIContext } from "../../providers/ZVHIProvider"


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
    const usValueArray = avgZVHIs.map(zvhi => zvhi.average.toFixed(2))
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
                fontColor: "white"
            }

        ]
    }

    if(oneZip.zvhiList.length === 0) {
        return null
    }
    const newArray = oneZip.zvhiList.slice()
    const reverseArray = newArray.reverse()
    const yearPercChange = ((reverseArray[0].value - reverseArray[1].value) / reverseArray[1].value)*100
    const fiveYearPercChange = ((reverseArray[0].value - reverseArray[4].value) / reverseArray[4].value)*100


    return (
        <>
        <Line 
            data={data}
            options={{
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Home Value",
                            fontSize:15
                        },
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function(value, index, values) {
                                if(value >= 1000){
                                    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                } else {
                                return '$' + value;
                                }
                            }
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
        </div>
        </>
    )
}