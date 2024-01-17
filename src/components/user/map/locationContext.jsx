//import { createContext, useState, useEffect } from "react";
//import Map3 from "./map3";


//export const LocationContext = createContext();

//export const LocationProvider = () => {
//    const [pickup, setPickup] = useState("kerala");
//    const [dropoff, setDropoff] = useState("kochi");
//    const [pickupCoordinates, setPickupCoordinates] = useState();
//    const [dropoffCoordinates, setDropoffCoordinates] = useState();

//    const createLocationCoordinate = (locationName, locationType) => {
//        return new Promise(async (resolve, reject) => {
//            try {
//                const mapboxUrl = `https://api.mapbox.com/geocoding/v4/mapbox.places/${locationName}.json?access_token=pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNsZzNwaWFncTBocHozb28zb3YzcHpvejEifQ.CJcMCCKk4SKR6JBo2-JNnQ`;
//                const response = await fetch(mapboxUrl);

//                if (!response.ok) {
//                    console.error(`Error fetching data. Status: ${response.status}`);
//                    reject();
//                    return;
//                }

//                const data = await response.json();
//                console.log(data, 'this is my data')

//                if (data.features && data.features.length > 0) {
//                    const location = data.features[0].center;

//                    switch (locationType) {
//                        case "pickup":
//                            setPickupCoordinates(location);
//                            break;
//                        case "dropoff":
//                            setDropoffCoordinates(location);
//                            break;
//                    }
//                    resolve();
//                } else {
//                    console.error("No features found in the Mapbox response.");
//                    reject();
//                }
//            } catch (error) {
//                console.error(error.message);
//                reject();
//            }
//        });
//    };


//    useEffect(() => {
//        if (pickup && dropoff) {
//            (async () => {
//                await Promise.all([createLocationCoordinate(pickup, "pickup"), createLocationCoordinate(dropoff, "dropoff")]);
//            })();
//        } else return;
//    }, [pickup, dropoff]);

//    return (
//        <>
//            {pickupCoordinates &&
//                < LocationContext.Provider
//                    value={{
//                        pickup,
//                        setPickup,
//                        dropoff,
//                        setDropoff,
//                        pickupCoordinates,
//                        setDropoffCoordinates,
//                        setPickupCoordinates,
//                        dropoffCoordinates,
//                    }
//                    }>
//                    <Map3 />
//                </LocationContext.Provider >
//            }
//        </>
//    );
//};