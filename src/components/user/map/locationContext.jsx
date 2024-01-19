import { createContext, useState, useEffect } from "react";
let accessToken = 'pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNscmpkYW91bjAyNmgybGswOWM0dnBhN2UifQ.LqhoTnHN03JQ1PpyLu-t1g'


export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [pickup, setPickup] = useState("");
    const [dropoff, setDropoff] = useState("");
    const [pickupCoordinates, setPickupCoordinates] = useState();
    const [dropoffCoordinates, setDropoffCoordinates] = useState();

    const createLocationCoordinate = (locationName, locationType) => {
        return new Promise(async (resolve, reject) => {
            try {
                const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationName}.json?access_token=${accessToken}`;
                const response = await fetch(mapboxUrl);
                const data = await response.json()
                const location = data.features[0].center;
                console.log(location, 'this location');
                if (location.length) {
                    console.log('location 00000000');
                    switch (locationType) {
                        case `pickup`:
                            setPickupCoordinates(location);

                            break;
                        case "dropoff":
                            setDropoffCoordinates(location);
                            break;
                    }


                    resolve();
                } else {
                    reject();
                }
            } catch (error) {
                console.log(error.message);
                reject();
            }
        });
    };

    useEffect(() => {
        if (pickup && dropoff) {
            (async () => {
                await Promise.all([createLocationCoordinate(pickup, "pickup"), createLocationCoordinate(dropoff, "dropoff")]);
            })();
        } else return;
    }, [pickup, dropoff]);

    return (
        <LocationContext.Provider
            value={{
                pickup,
                setPickup,
                dropoff,
                setDropoff,
                pickupCoordinates,
                setDropoffCoordinates,
                setPickupCoordinates,
                dropoffCoordinates,
            }}>
            {children}
        </LocationContext.Provider>
    );
};