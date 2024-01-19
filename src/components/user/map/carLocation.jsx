import React, { useContext, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import { LocationContext } from "../../../context/LocationContext";


mapboxgl.accessToken = 'pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNscmpkYW91bjAyNmgybGswOWM0dnBhN2UifQ.LqhoTnHN03JQ1PpyLu-t1g'

const Map = () => {
    const { pickupCoordinates, dropoffCoordinates } = useContext(LocationContext);
    console.log(pickupCoordinates, dropoffCoordinates, "llllllll")
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

        map.on("load", async () => {
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

    return <div className="flex-1 h-full w-full fixed" id="map" />;
};

export default Map;