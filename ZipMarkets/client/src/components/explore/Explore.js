import React, {useState, useRef, useContext, useEffect} from "react"
import MapGL, { Marker, Popup } from '@urbica/react-map-gl';
import Cluster from '@urbica/react-map-gl-cluster';
import { ZipContext } from "../../providers/ZipProvider";
import 'mapbox-gl/dist/mapbox-gl.css';

const markerStyle = {
    padding: '3px',
    color: '#000000',
    background: '#98E6FF',
    borderRadius: '10px',
    textAlign: 'center'
  };

export default function Explore() {
    const [viewport, setViewPort] = useState({
        latitude: 36.007373,
        longitude: -86.79121,
        width: "100",
        height: "100",
        zoom: 12

    })
    const mapRef= useRef();
    const clusterRef = useRef();
    const {allZips, getAllZips} = useContext(ZipContext)
    const [selectedMarker, setSelectedMarker] = useState(null)
    // const [selectedZip, setSelectedZip] = useState(null);

    useEffect(() => {
        getAllZips()
        // eslint-disable-next-line 
    },[])

    const ClusterMarker = ({ longitude, latitude, pointCount }) => (
        <Marker longitude={longitude} latitude={latitude}>
          <div style={{
                background: '#f28a25',
                textAlign: 'center',
                padding: 'auto',
                width: `${20 + (pointCount/1000) *25}px`,
                height: `${20 + (pointCount/1000) *25}px`,
                borderRadius: '100px'
            }}
          >
              {pointCount}
          </div>
        </Marker>
      );

    if(allZips.length === 0) {
        return null
    }
    
    const renderPopop = () => (
        selectedMarker ? (
            <Popup
                tipSize={10}
                anchor="bottom"
                latitude={selectedMarker.latitude}
                longitude={selectedMarker.longitude}
                closeOnClick={false}
                onClose={() => setSelectedMarker(null)}
            >
                <h2>{selectedMarker.zipCode}</h2>
                <p>{selectedMarker.city}, {selectedMarker.state.stateName}</p>
                <p>{selectedMarker.county}</p>
                <button>Details</button>
            </Popup>
        ) : null
    )


    return (
        <MapGL
            style={{width: '100vw', height: '100vh'}}
            {...viewport}
            maxZoom = {15}
            accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/durrjp/ckd6b1pjv02ad1iqra64vul75?optimize=true"
            onViewportChange={newViewport => {
                setViewPort({...newViewport})
            }}
            ref={mapRef}
        >
            <Cluster
                ref={clusterRef}
                radius={100}
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
                        <button
                            style={markerStyle}
                            onClick={(e) => {
                                e.preventDefault()
                                setSelectedMarker(point)
                            }}  
                        >
                            {point.zipCode}
                        </button>
                    </Marker>
                ))}
            </Cluster>
                {renderPopop()}
        </MapGL>
    )
}
