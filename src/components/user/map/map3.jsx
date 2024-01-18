import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = 'pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNsZzNwaWFncTBocHozb28zb3YzcHpvejEifQ.CJcMCCKk4SKR6JBo2-JNnQ';

const Map = () => {
    const pickupCoordinates = [76.2673, 9.9312]; // Bangalore, India
    const dropoffCoordinates = [76.9366, 8.5241]; // Sample dropoff coordinates

    const getDirection = async (pickup, dropoff) => {
        try {
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup[0]},${pickup[1]};${dropoff[0]},${dropoff[1]}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxgl.accessToken}`;

            const result = await axios.get(url);
            console.log(result.data?.routes[0].geometry);
            return result.data?.routes[0].geometry;
        } catch (error) {
            console.error("Error fetching directions:", error);
            return null;
        }
    };

    useEffect(() => {
        const initializeMap = async () => {
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [76.6413, 10.1632],
                zoom: 7,
                maxZoom: 15,
            });

            map.on("load", async () => {
                const bounds = new mapboxgl.LngLatBounds();

                if (pickupCoordinates && dropoffCoordinates) {
                    const result = await getDirection(pickupCoordinates, dropoffCoordinates);

                    if (result) {
                        const routeLayer = {
                            id: "route",
                            type: "line",
                            source: {
                                type: "geojson",
                                data: {
                                    type: "Feature",
                                    properties: {},
                                    geometry: result,
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
        };

        initializeMap();
    }, [pickupCoordinates, dropoffCoordinates]);

    const addToMap = (map, coordinates) => {
        new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    };

    const addBoundsToMap = (map, bounds) => {
        map.fitBounds(bounds, { padding: 20 });
    };

    return <div id="map" style={{ height: '200px', width: '100%', border: '2px' }}></div>;
};

export default Map;