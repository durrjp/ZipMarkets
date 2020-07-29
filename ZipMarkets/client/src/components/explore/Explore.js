import React, {useState, useRef, useContext, useEffect} from "react"
import ReactMapGL, {Marker, Popup, FlyToInterpolator} from "react-map-gl"
import { ZipContext } from "../../providers/ZipProvider";
import useSupercluster from "use-supercluster";

export default function Explore() {
    const [viewport, setViewPort] = useState({
        latitude: 36.007373,
        longitude: -86.79121,
        width: "100vw",
        height: "100vh",
        zoom: 12

    })
    const mapRef= useRef();
    const {allZips, getAllZips} = useContext(ZipContext)
    // const [selectedZip, setSelectedZip] = useState(null);

    useEffect(() => {
        getAllZips()
        // eslint-disable-next-line 
    },[])

  

    const points = allZips.map((zip => ({
        type: "Feature",
        properties: {cluster: true, zipId: zip.Id},
        geometry: {
            type: "Point",
            coordinates: [
                zip.Longitude,
                zip.Latitude
            ]
        }
    })))

    const bounds = mapRef.current
        ? mapRef.current
            .getMap()
            .getBounds()
            .toArray()
            .flat()
        : null;
    
    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom: viewport.zoom,
        options: { radius: 75, maxZoom: 20 }
    },[allZips]);

    console.log(clusters)

    return (
        <div>
            <ReactMapGL
                {...viewport}
                maxZoom = {12}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/durrjp/ckd3q2q5h0b3k1iqrd06bgyw4?optimize=true"
                onViewportChange={newViewport => {
                    setViewPort({...newViewport})
                }}
                ref={mapRef}
            >

                {clusters.map(cluster => {
                const [longitude, latitude] = cluster.geometry.coordinates;
                const {
                    cluster: isCluster,
                    point_count: pointCount
                } = cluster.properties;

                if (isCluster) {
                    return (
                        <Marker
                            key={`cluster-${cluster.id}`}
                            latitude={latitude}
                            longitude={longitude}
                        >
                            <div
                                style={{
                                    width: `${10 + (pointCount / allZips.length) * 20}px`,
                                    height: `${10 + (pointCount / allZips.length) * 20}px`
                                }}
                                onClick={() => {
                                    const expansionZoom = Math.min(
                                    supercluster.getClusterExpansionZoom(cluster.id),
                                    20
                                    );

                                    setViewPort({
                                        ...viewport,
                                        latitude,
                                        longitude,
                                        zoom: expansionZoom,
                                        transitionInterpolator: new FlyToInterpolator({
                                            speed: 4
                                    }),
                                    transitionDuration: "auto"
                                    });
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="8" fill="#E73333"/>
                                </svg>  
                            </div>
                        </Marker>
                    );
                }
                return (
                    <Marker
                        key={cluster.id}
                        latitude={latitude}
                        longitude={longitude}
                    >
                        <div onClick={e => {
                            e.preventDefault();
                            // setSelectedZip(zip);
                            }} 
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="8" fill="#E73333"/>
                            </svg>
                        </div>
                    </Marker>
                )
                /* {selectedZip ? (
                    <Popup
                        latitude={selectedZip.latitude}
                        longitude={selectedZip.longitude}
                        onClose={() => {
                        setSelectedZip(null);
                        }}
                    >
                        <div>
                        <h2>{selectedZip.zipCode}</h2>
                        <p>{selectedZip.state.stateName}</p>
                        </div>
                    </Popup>
                ) : null} */
            })}
            </ReactMapGL>
        </div>
    )
}