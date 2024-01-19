import React, { useContext, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import { LocationContext } from "./locationContext";



//mapboxgl.accessToken = 'pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNsZzNwaWFncTBocHozb28zb3YzcHpvejEifQ.CJcMCCKk4SKR6JBo2-JNnQ'
//mapboxgl.accessToken = 'pk.eyJ1Ijoic2NvdGhpcyIsImEiOiJjaWp1Y2ltYmUwMDBicmJrdDQ4ZDBkaGN4In0.sbihZCZJ56-fsFNKHXF8YQ'
mapboxgl.accessToken = 'pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNscmpkYW91bjAyNmgybGswOWM0dnBhN2UifQ.LqhoTnHN03JQ1PpyLu-t1g'

const Map = () => {

    //const contextValues = useContext(LocationContext);
    const pickupCoordinates = [76.2673, 9.9312]; // Bangalore, India
    const dropoffCoordinates = [76.9366, 8.5241]; // Sample dropoff coordinates


    //const { pickupCoordinates, dropoffCoordinates } = contextValues;
    console.log(pickupCoordinates);

    //const getDirection = async (pickup, dropoff) => {
    //    console.log(pickup, dropoff, 'this is url ................................')
    //    let url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup[0]},${pickup[1]};${dropoff[0]},${dropoff[1]}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxgl.accessToken}`;
    //    const result = await axios.get(url)
    //    console.log(result.data?.routes[0].geometry)
    //    const data = result.data?.routes[0].geometry
    //    return data;
    //};

    const getDirection = async (pickupCoordinates, dropoffCoordinates) => {
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxgl.accessToken}`;
        const result = await axios.get(url);
        console.log(result)
        return result;
    };


    useEffect(() => {
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v12",
            center: [76.6413, 10.1632],
            zoom: 7,
        });

        map.on("mousehover", async () => {
            const bounds = new mapboxgl.LngLatBounds();

            if (pickupCoordinates && dropoffCoordinates) {

                await getDirection(pickupCoordinates, dropoffCoordinates).then(
                    (result) => {
                        const routeLayer = {
                            id: "route",
                            type: "line",
                            source: {
                                type: "geojson",
                                data: {
                                    type: "Feature",
                                    properties: {},
                                    geometry: result.data.routes[0].geometry,
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
                    }
                );
            }
            if (pickupCoordinates) {
                addToMap(map, pickupCoordinates);
                bounds.extend(pickupCoordinates);
            }

            if (dropoffCoordinates) {
                addToMap(map, dropoffCoordinates);
                bounds.extend(dropoffCoordinates);
            }
            addBoundsToMap(map, bounds);
        });
    }, [pickupCoordinates, dropoffCoordinates]);

    const addToMap = (map, coordinates) => {
        // eslint-disable-next-line no-unused-vars
        const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    };

    const addBoundsToMap = (map, bounds) => {
        map.fitBounds(bounds, { padding: 20 });
    };



    return <div id="map" style={{ height: '200px', width: '100%', border: '2px' }}></div>;
};

export default Map;