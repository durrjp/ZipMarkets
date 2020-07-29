import React, {useState, useRef, useContext, useEffect} from "react"
import MapGL, { Marker } from '@urbica/react-map-gl';
import Cluster from '@urbica/react-map-gl-cluster';
import { ZipContext } from "../../providers/ZipProvider";
import 'mapbox-gl/dist/mapbox-gl.css';

const markerStyle = {
    padding: '3px',
    color: '#fff',
    background: '#1978c8',
    borderRadius: '10px',
    textAlign: 'center'
  };

const clusterStyle = {
    background: '#f28a25',
    textAlign: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '20px'
}

export default function Explore() {
    const [viewport, setViewPort] = useState({
        latitude: 36.007373,
        longitude: -86.79121,
        width: "100",
        height: "100",
        zoom: 20

    })
    const mapRef= useRef();
    const clusterRef = useRef();
    const {allZips, getAllZips} = useContext(ZipContext)
    // const [selectedZip, setSelectedZip] = useState(null);

    useEffect(() => {
        getAllZips()
        // eslint-disable-next-line 
    },[])

    const ClusterMarker = ({ longitude, latitude, pointCount }) => (
        <Marker longitude={longitude} latitude={latitude}>
          <div style={{ ...clusterStyle }}>{pointCount}</div>
        </Marker>
      );

    if(allZips.length === 0) {
        return null
    }
    
    


    return (
        <MapGL
            style={{width: '100vw', height: '100vh'}}
            {...viewport}
            maxZoom = {12}
            accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/durrjp/ckd3q2q5h0b3k1iqrd06bgyw4?optimize=true"
            onViewportChange={newViewport => {
                setViewPort({...newViewport})
            }}
            ref={mapRef}
        >
            <Cluster
                ref={clusterRef}
                radius={200}
                extent={512}
                nodeSize={64}
                component= {ClusterMarker}
                
            >
                {allZips.map(point => (
                    <Marker
                        key={point.id}
                        longitude={point.longitude}
                        latitude={point.latitude}
                    >
                        <div style={markerStyle}>{point.zipCode}</div>
                    </Marker>
                ))}

            </Cluster>
        </MapGL>
    )
}
