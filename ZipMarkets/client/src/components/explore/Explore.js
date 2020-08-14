import React, {useState, useRef, useContext, useEffect} from "react"
import MapGL, { Marker, Popup} from '@urbica/react-map-gl';
import Cluster from '@urbica/react-map-gl-cluster';
import { ZipContext } from "../../providers/ZipProvider";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import "./Explore.css"

const markerStyle = {
    padding: '3px',
    color: '#000000',
    background: '#E6E8F9',
    borderRadius: '8px',
    textAlign: 'center'
  };

export default function Explore() {
    const {allZips, getAllZips, getZipById, getZipByZipCode, getZipsByPrice, zipsByPrice} = useContext(ZipContext)
    const {getUser} = useContext(UserContext)
    const [currentUser, setCurrentUser] = useState()
    const mapRef= useRef();
    const clusterRef = useRef();
    const history = useHistory();
    const [chosenZip, setChosenZip] = useState(null)
    const [zipSearched, setZipSearched] = useState()
    
    useEffect(() => {
        getAllZips()
        // eslint-disable-next-line 
    },[])

    useEffect(() => {
        
        // eslint-disable-next-line 
    },[currentUser])
    
    
    useEffect(() => {
        getUser().then((cu) => {
            setCurrentUser(cu)
            getZipsByPrice(`${cu.minHomePrice},${cu.maxHomePrice}`)
            setViewPort({
                latitude: cu.homeZip.latitude,
                longitude: cu.homeZip.longitude,
                zoom: 12
            })
        })
        // eslint-disable-next-line
    },[])
    
    const [viewport, setViewPort] = useState({
        latitude: 38.5,
        longitude: -98,
        zoom: 3.5,
    })

    
    


    const ClusterMarker = ({ longitude, latitude, pointCount }) => (
        <Marker longitude={longitude} latitude={latitude}>
        <div style={{
                background: '#FFBB63',
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
                <h3>{chosenZip.zipCode}</h3>
                <p>{chosenZip.city}, {chosenZip.state.stateName}</p>
                <p>{chosenZip.county}</p>
                <Button onClick={handleClick}>Details</Button>
            </Popup>
        ) : null
    )

    const goToZip = () => {
        getZipByZipCode(zipSearched).then((zip) => {
            setViewPort({
                latitude: zip.latitude,
                longitude: zip.longitude,
                zoom: 12
            })
        })
    }

    const goHome = () => {
        setViewPort({
            latitude: currentUser.homeZip.latitude,
            longitude: currentUser.homeZip.longitude,
            zoom: 12
        })
    }

    const zoomOut = () => {
        setViewPort({
            latitude: 38.5,
            longitude: -98,
            zoom: 3.5,
        })
    }

    const filterMapFunc = () => {
        if(currentUser && zipsByPrice.length !== 0 && allZips.length !== 0) {
            if(currentUser.filterByPrice === true) {
                return (
                    zipsByPrice.map(point => (
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
                    ))
                )
            }
            else {
                return (
                    allZips.map(point => (
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
                    ))
                )
            }
        } 
        else {
            return <span></span>
        }
    }

    return (
        <>
        <div className="map-container">
        <MapGL
            style={{width: '100%', height: "90.8vh"}}
            {...viewport}
            maxZoom = {13}
            accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/durrjp/ckd6b1pjv02ad1iqra64vul75?optimize=true"
            onViewportChange={newViewport => {
                setViewPort({...newViewport})
            }}
            ref={mapRef}
        >
            sadasd
            <div style={{display: "flex", position: "absolute", right: "2em"}}>
                <Input
                    type="number"
                    placeholder="Enter zip code..."
                    onChange={(e) => setZipSearched(e.target.value)}
                >
                </Input>
                <Button
                    type="submit"
                    title="Go to zip code"
                    className="explore-btn"
                    onClick={(e) => {
                        e.preventDefault()
                        goToZip()
                    }}
                >
                    Go
                </Button>
                <Button
                    type="submit"
                    title="Go Home"
                    className="explore-btn"
                    onClick={(e) => {
                        e.preventDefault()
                        goHome()
                    }}
                >
                <svg width="18" height="18" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                        <path d="M34.4122 15.6464L18.7088 1.33755C18.0196 0.7094 16.9802 0.709468 16.2912 1.33748L0.587756 15.6464C0.0356182 16.1496 -0.146764 16.9248 0.122981 17.6213C0.392795 18.3178 1.04973 18.7678 1.79669 18.7678H4.30479V33.1042C4.30479 33.6726 4.76567 34.1334 5.33407 34.1334H13.9415C14.5099 34.1334 14.9707 33.6726 14.9707 33.1042V24.3996H20.0295V33.1042C20.0295 33.6726 20.4903 34.1335 21.0587 34.1335H29.6657C30.2341 34.1335 30.695 33.6727 30.695 33.1042V18.7678H33.2036C33.9505 18.7678 34.6075 18.3177 34.8773 17.6213C35.1467 16.9247 34.9643 16.1496 34.4122 15.6464Z" fill="white"/>
                        <path d="M30.4263 2.9209H23.5139L31.4556 10.1421V3.95012C31.4556 3.38171 30.9948 2.9209 30.4263 2.9209Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0">
                        <rect width="35" height="35" fill="white"/>
                        </clipPath>
                        </defs>
                </svg>
                </Button>
                <Button
                    type="submit"
                    title="Zoom out"
                    className="explore-btn"
                    onClick={(e) => {
                        e.preventDefault()
                        zoomOut()
                    }}
                >
                    <svg width="15" height="4" viewBox="0 0 15 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="15" height="4" fill="white"/>
                    </svg>
                </Button>
            </div>
            <Cluster
                ref={clusterRef}
                radius={50}
                extent={512}
                nodeSize={64}
                component= {ClusterMarker}
            >
                {filterMapFunc()}
            </Cluster>
                {renderPopop()}
        </MapGL>
        </div>
        </>
    )
}
