//import React, { useContext, useEffect } from "react";
//import mapboxgl from "mapbox-gl";
//import axios from "axios";
//import "mapbox-gl/dist/mapbox-gl.css";
//import { LocationContext } from "./locationContext";


//mapboxgl.accessToken = 'pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNscmpkYW91bjAyNmgybGswOWM0dnBhN2UifQ.LqhoTnHN03JQ1PpyLu-t1g'

//const Map = () => {

//    //const contextValues = useContext(LocationContext);
//    const pickupCoordinates = [76.2673, 9.9312]; // Bangalore, India
//    const dropoffCoordinates = [76.9366, 8.5241]; // Sample dropoff coordinates


//    //const { pickupCoordinates, dropoffCoordinates } = contextValues;
//    console.log(pickupCoordinates);

//    const getDirection = async (pickupCoordinates, dropoffCoordinates) => {
//        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxgl.accessToken}`;
//        const result = await axios.get(url);
//        console.log(result)
//        return result;
//    };


//    useEffect(() => {
//        const map = new mapboxgl.Map({
//            container: "map",
//            style: "mapbox://styles/mapbox/satellite-v9",
//            center: [76.6413, 10.1632],
//            zoom: 7,
//        });

//        map.on("mousemove", async () => {
//            const bounds = new mapboxgl.LngLatBounds();

//            if (pickupCoordinates && dropoffCoordinates) {

//                await getDirection(pickupCoordinates, dropoffCoordinates).then(
//                    (result) => {
//                        const routeLayer = {
//                            id: "route",
//                            type: "line",
//                            source: {
//                                type: "geojson",
//                                data: {
//                                    type: "Feature",
//                                    properties: {},
//                                    geometry: result.data.routes[0].geometry,
//                                },
//                            },
//                            layout: {
//                                "line-join": "round",
//                                "line-cap": "round",
//                            },
//                            paint: {
//                                "line-color": "#888",
//                                "line-width": 8,
//                            },
//                        };
//                        map.addLayer(routeLayer);
//                    }
//                );
//            }
//            if (pickupCoordinates) {
//                addToMap(map, pickupCoordinates);
//                bounds.extend(pickupCoordinates);
//            }

//            if (dropoffCoordinates) {
//                addToMap(map, dropoffCoordinates);
//                bounds.extend(dropoffCoordinates);
//            }
//            addBoundsToMap(map, bounds);
//        });
//    }, [pickupCoordinates, dropoffCoordinates]);

//    const addToMap = (map, coordinates) => {
//        // eslint-disable-next-line no-unused-vars
//        const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
//    };

//    const addBoundsToMap = (map, bounds) => {
//        map.fitBounds(bounds, { padding: 20 });
//    };



//    return <div id="map" style={{ height: '200px', width: '100%', border: '2px' }}></div>;
//};

//export default Map;
////hhdffffa














import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = 'your-mapbox-access-token';

const Map = () => {
    const pickupCoordinates = [76.2673, 9.9312];
    const dropoffCoordinates = [76.9366, 8.5241];

    const getDirection = async (pickup, dropoff) => {
        const url = https://api.mapbox.com/directions/v5/mapbox/driving/${pickup[0]},${pickup[1]};${dropoff[0]},${dropoff[1]}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxgl.accessToken};
        const result = await axios.get(url);
        return result.data.routes[0].geometry;
    };

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/satellite-v9",
            center: [76.6413, 10.1632],
            zoom: 7,
        });

        const bounds = new mapboxgl.LngLatBounds();

        const addRouteLayer = async () => {
            const geometry = await getDirection(pickupCoordinates, dropoffCoordinates);

            // Remove existing "route" layer if it exists
            if (map.getLayer("route")) {
                map.removeLayer("route");
            }

            const routeLayer = {
                id: "route",
                type: "line",
                source: {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        properties: {},
                        geometry: geometry,
                    },
                },
                layout: {
                    "line-join": "round",
                    "line-cap": "round",
                },
                paint: {
                    "line-color": "#888",
                    "line-width": 8,
                },
            };
            map.addLayer(routeLayer);

            bounds.extend(pickupCoordinates);
            bounds.extend(dropoffCoordinates);
            addMarker(map, pickupCoordinates);
            addMarker(map, dropoffCoordinates);
            map.fitBounds(bounds, { padding: 20 });
        };

        addRouteLayer();
    }, [pickupCoordinates, dropoffCoordinates]);

    const addMarker = (map, coordinates) => {
        new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    };

    return <div id="map" style={{ height: '200px', width: '100%', border: '2px' }}></div>;
};

export default Map;