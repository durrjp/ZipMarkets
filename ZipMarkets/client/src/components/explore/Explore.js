import React, {useState, useRef, useContext, useEffect} from "react"
import MapGL, { Marker, Popup } from '@urbica/react-map-gl';
import Cluster from '@urbica/react-map-gl-cluster';
import { ZipContext } from "../../providers/ZipProvider";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";

const markerStyle = {
    padding: '3px',
    color: '#000000',
    background: '#98E6FF',
    borderRadius: '8px',
    textAlign: 'center'
  };

export default function Explore() {
    const [currentUser, setCurrentUser] = useState()
    const currentUserSesh = JSON.parse(sessionStorage.getItem("user"));
    const {getUser} = useContext(UserContext)
    const mapRef= useRef();
    const clusterRef = useRef();
    const history = useHistory();
    const {allZips, getAllZips, getZipById} = useContext(ZipContext)
    const [chosenZip, setChosenZip] = useState(null)
    
    useEffect(() => {
        getAllZips()
        // eslint-disable-next-line 
    },[])
    
    useEffect(() => {
        getUser(currentUserSesh.id).then((cu) => {
            setCurrentUser(cu)
            setViewPort({
                latitude: cu.homeZip.latitude,
                longitude: cu.homeZip.longitude,
                width: "100",
                height: "100",
                zoom: 12
            })
        })
        // eslint-disable-next-line
    },[])
    
    const [viewport, setViewPort] = useState({
        latitude: 0,
        longitude: 0,
        width: "100",
        height: "100",
        zoom: 5
    })
    


    const ClusterMarker = ({ longitude, latitude, pointCount }) => (
        <Marker longitude={longitude} latitude={latitude}>
          <div style={{
                background: '#f28a25',
                textAlign: 'center',
                padding: 'auto',
                width: `${20 + (pointCount/1000) *20}px`,
                height: `${20 + (pointCount/1000) *20}px`,
                borderRadius: '100px'
            }}
          >
              {pointCount}
          </div>
        </Marker>
      );

    const handleClick = () => {
        history.push(`/zip/${chosenZip.id}`);
    }

    if(allZips.length === 0) {
        return null
    }
    
    const renderPopop = () => (
        chosenZip ? (
            <Popup
                tipSize={10}
                anchor="bottom"
                latitude={chosenZip.latitude}
                longitude={chosenZip.longitude}
                closeOnClick={false}
                onClose={() => {
                    setChosenZip(null)}
                }
            >
                <h2>{chosenZip.zipCode}</h2>
                <p>{chosenZip.city}, {chosenZip.state.stateName}</p>
                <p>{chosenZip.county}</p>
                <p>ZVHI: {chosenZip.zvhiList.slice(-1)[0].value}</p>
                <Button onClick={handleClick}>Details</Button>
            </Popup>
        ) : null
    )

    return (
        <MapGL
            style={{width: '100vw', height: '100vh'}}
            {...viewport}
            maxZoom = {13}
            accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/durrjp/ckd6b1pjv02ad1iqra64vul75?optimize=true"
            onViewportChange={newViewport => {
                setViewPort({...newViewport})
            }}
            ref={mapRef}
        >
            <Cluster
                ref={clusterRef}
                radius={40}
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
                        <Button
                            style={markerStyle}
                            onClick={(e) => {
                                e.preventDefault()
                                getZipById(point.id).then(setChosenZip)
                            }}  
                        >
                            {point.zipCode}
                        </Button>
                    </Marker>
                ))}
            </Cluster>
                {renderPopop()}
        </MapGL>
    )
}
