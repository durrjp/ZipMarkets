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
                label: "ZVHI Values",
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
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