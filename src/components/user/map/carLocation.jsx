import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import { useRef } from 'react';

const Map = ({ location }) => {
    const [coordinates, setCoordinates] = useState(null);
    const Mapref = useRef();

    useEffect(() => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/palakkad.json?access_token=pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNscmpkYW91bjAyNmgybGswOWM0dnBhN2UifQ.LqhoTnHN03JQ1PpyLu-t1g`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.features.length > 0) {
                    setCoordinates([data.features[0].center[1], data.features[0].center[0]]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [location]);

    return (
        <div className='h-[210px] w-[400px]'>
            {coordinates && (
                <ReactMapGL
                    ref={Mapref}
                    mapboxAccessToken='pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNscmpkYW91bjAyNmgybGswOWM0dnBhN2UifQ.LqhoTnHN03JQ1PpyLu-t1g'
                    containerStyle={{
                        height: '100%',
                        width: '100%'
                    }}
                    initialViewState={{
                        longitude: coordinates[1],
                        latitude: coordinates[0],
                        zoom: 10
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                >
                    {/*<Marker
                        longitude={coordinates[1]}
                        latitude={coordinates[0]}
                        offsetLeft={0}
                        offsetTop={0}>
                        <div style={{ color: 'red', fontSize: 30 }} >📍</div>
                    </Marker>*/}
                </ReactMapGL>
            )
            }
        </div >
    );
};

export default Map;
