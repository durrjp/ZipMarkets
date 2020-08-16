import React, { useContext, useEffect } from "react"
import { MortgageRateContext } from "../../providers/MortgageRateProvider"
import { Line } from "react-chartjs-2"
import moment from "moment";
import "chartjs-plugin-lineheight-annotation";

export default function MortgageRateGraph() {
    const {mortgageRates, getMortgageRates} = useContext(MortgageRateContext)

    useEffect(() => {
        getMortgageRates()
    }, [])

    const mrDates = mortgageRates.map(mr => {
        return moment(mr.date).format("MMM YYYY")
    })
    
    const mrValues = mortgageRates.map(mr => {
        return mr.value
    })

    const data = {
        labels: mrDates,
        datasets: [
            {
                label: "US Fixed Mortgage Rates",
                data: mrValues,
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
            }
        ]
    }

    if(mortgageRates.length === 0) {
        return null
    }

    return (
        <>
        <h3 style={{textAlign: "center", marginBottom: "1em"}}>Fixed Mortgage Rate (US)</h3>
        <Line 
            data={data}
            options={{
                lineHeightAnnotation: {
                    color: "rgb(255,255,255,.5)",
                    hover: true,
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
                            labelString: "Mortgage Rate (%)",
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
                            labelString: "Date",
                            fontSize: 15,
                            fontColor: "rgb(236, 236, 236)"
                        },
                        ticks: {
                            fontColor: "rgb(236, 236, 236)",
                            fontSize: 11,
                            autoSkip: true,
                            maxTicksLimit: mortgageRates.length/6
                        },
                        gridLines: {
                            color: "rgb(168, 168, 168,.3)"
                        }
                    }]
                }
            }}
        />
        </>
    )
}