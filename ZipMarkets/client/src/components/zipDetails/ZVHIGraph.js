import React from "react"
import {Line} from "react-chartjs-2"


export default function ZVHIGraph({oneZip}) {
    const yearArray = oneZip.zvhiList.map(zvhi => {
        const splitDate = zvhi.date.split("")
        return `${splitDate[0]}${splitDate[1]}${splitDate[2]}${splitDate[3]}`
    } )
    const valueArray = oneZip.zvhiList.map(zvhi => zvhi.value)
    const data ={
        labels: yearArray,
        datasets: [
            {
                label: "Median Home Price",
                fill: true,
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
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(82,113,255,1)',
                pointHoverBorderColor: 'rgba(82,113,255,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: valueArray
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
    const tenYearPercChange = ((reverseArray[0].value - reverseArray[9].value) / reverseArray[9].value)*100


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
                            callback: function(value) {
                                return '$' + value;
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
            <div>% Change Last Year: {yearPercChange.toFixed(2)}</div>
            <div>% Change Last 5 Years: {fiveYearPercChange.toFixed(2)}</div>
            <div>% Change Last 10 Years: {tenYearPercChange.toFixed(2)}</div>
        </div>
        </>
    )
}