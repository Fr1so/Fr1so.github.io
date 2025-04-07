import 'ol/ol.css';
import './style.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Overlay from 'ol/Overlay';
import POI from './poi'

// Create map
const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM()
        })
    ],
    view: new View({
        center: fromLonLat([0, 0]), // Default center
        zoom: 2
    })
});

// --- POINT OF INTEREST (POI) SETUP ---
const pois = [new POI([5.134037, 52.080354], 'test 1', 'this is a very cool place')];

for(let i = 0; i < pois.length; i++){
    map.addLayer(pois[i].getLayer());
}

// --- POPUP SETUP ---
const popupElement = document.createElement('div');
popupElement.className = 'ol-popup';
popupElement.style.background = 'white';
popupElement.style.padding = '10px';
popupElement.style.borderRadius = '8px';
popupElement.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
popupElement.style.position = 'absolute';

const popupOverlay = new Overlay({
    element: popupElement,
    positioning: 'bottom-center',
    stopEvent: false,
    offset: [0, -15],
});

map.addOverlay(popupOverlay);

// --- DISTANCE CHECK FUNCTION ---
function getDistanceMeters(coord1, coord2) {
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

// Create a vector source to store the user's location
const userLocationSource = new VectorSource();
const userLocationLayer = new VectorLayer({ source: userLocationSource });
map.addLayer(userLocationLayer);

function updateUserLocation(coords) {
    userLocationSource.clear();

    const userLocation = new Feature({
        geometry: new Point(fromLonLat(coords))
    });

    userLocation.setStyle(new Style({
        image: new Icon({
            src: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
            scale: 0.05
        })
    }));

    userLocationSource.addFeature(userLocation);

    map.getView().animate({
        center: fromLonLat(coords),
        duration: 500
    });

    document.getElementById('info').innerHTML = `<span>coords: ${coords.toFixed(2)}</span>`

    // Check distance to POI
    for(let i = 0; i < pois.length; i++)
    {
        const distance = getDistanceMeters(coords, pois[i].getCoords());

        if (distance <= 10) {
            popupElement.innerHTML = `
                ${pois[i].name} 😎
                ${pois[i].content}
            `;
            popupOverlay.setPosition(fromLonLat(pois[i].getCoords()));
            break;
        } else {
            popupOverlay.setPosition(undefined); // Hide popup
        }
    }
}

// Watch the user's location continuously
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const coords = [position.coords.longitude, position.coords.latitude];
            console.log('Updated Location:', coords);

            updateUserLocation(coords);
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