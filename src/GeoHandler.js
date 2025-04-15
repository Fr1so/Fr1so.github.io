export default class GeoHandler {
    constructor(updateCallback) {
        this.updateCallback = updateCallback;
        // Watch the user's location continuously
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const coords = [position.coords.longitude, position.coords.latitude];
                    
                    console.log('updated location');
                    this.updateCallback(coords);
                },
                (error) => {
                    console.error('Error watching location:', error);
                },
                {
                    enableHighAccuracy: true, // More accurate location
                    maximumAge: 0, // No cached positions
                    timeout: 5000 // Timeout before error
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }


    // --- DISTANCE CHECK FUNCTION ---
    getDistanceMeters(coord1, coord2) {
        const [lon1, lat1] = coord1;
        const [lon2, lat2] = coord2;

        const R = 6371000; // Radius of the Earth in meters
        const toRad = (x) => x * Math.PI / 180;

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a = Math.sin(dLat / 2) ** 2 +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    }
}