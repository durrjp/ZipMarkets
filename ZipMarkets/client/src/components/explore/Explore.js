import React, {useState, useRef} from "react"
import ReactMapGL from "react-map-gl"

export default function Explore() {
    const [viewport, setViewPort] = useState({
        latitude: 36.007373,
        longitude: -86.79121,
        width: "100vw",
        height: "100vh",
        zoom: 12

    })
    const mapRef= useRef();


    return (
        <div>
            <ReactMapGL
                {...viewport}
                maxZoom = {12}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/durrjp/ckd3q2q5h0b3k1iqrd06bgyw4"
                onViewportChange={newViewport => {
                    setViewPort({...newViewport})
                }}
                ref={mapRef}>
                markers
            </ReactMapGL>
        </div>
    )
}