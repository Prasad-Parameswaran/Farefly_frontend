import React, { useContext, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import { LocationContext } from "./locationContext";


mapboxgl.accessToken = 'pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNscmpkYW91bjAyNmgybGswOWM0dnBhN2UifQ.LqhoTnHN03JQ1PpyLu-t1g'

const Map = ({ local, district }) => {

    const location2 = local ? `${district},${local}` : district ? district : 'malappuram'
    const [pickupCoordinates, setPickupCoordinates] = useState([76.2673, 9.9312])
    const [dropoffCoordinates, setDropoffCoordinates] = useState([76.9366, 8.5241])


    const geocodeUrl = (location) => `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapboxgl.accessToken}`;

    const getLocationCoordinates = async (location, setCoordinates) => {
        try {
            const response = await fetch(geocodeUrl(location));
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                const coordinates = data.features[0].center;
                setCoordinates([coordinates[0], coordinates[1]]);
                return
            } else {
                console.error(`Could not find coordinates for ${location}`);
            }
        } catch (error) {
            console.error(error);
        }
    };


    const getDirection = async (pickupCoordinates, dropoffCoordinates) => {
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxgl.accessToken}`
        try {
            const result = await axios.get(url);

            if (result.data.routes && result.data.routes.length > 0) {
                console.log(result.data)
                return result.data.routes[0].geometry;
            } else {
                console.error("No valid routes found in API response:", result.data);
                throw new Error("No valid routes found.");
            }
        } catch (error) {
            console.error("Error fetching direction:", error);
            throw error
        }
    };


    const renderMap = () => {
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/satellite-streets-v12",
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
                                    geometry: result
                                    ,
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
        })
    }

    const addToMap = (map, coordinates) => {
        const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    }
    const addBoundsToMap = (map, bounds) => {
        map.fitBounds(bounds, { padding: 20 });
    }




    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPickupCoordinates([
                        position.coords.longitude,
                        position.coords.latitude
                    ]);
                    console.log(position.coords.latitude, position.coords.longitude, 'this is my current location ')
                },
                (error) => {
                    console.error('Error getting user location:', error.message);
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser');
        }
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            await getLocationCoordinates(location2, setDropoffCoordinates);
        }
        fetchData()
    }, [location2]);



    useEffect(() => {
        if (pickupCoordinates && dropoffCoordinates) {
            const maploading = async () => {
                await renderMap()
            }
            maploading()
        }
    }, [dropoffCoordinates, location2])

    return <div id="map" style={{ height: '200px', width: '100%', border: '2px' }}></div>;
};

export default Map;
//hhdffffa
