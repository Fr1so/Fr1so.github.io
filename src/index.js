import 'ol/ol.css';
import './style.css';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Overlay from 'ol/Overlay';
import GeoHandler from './geoHandler';
import MapHandler from './MapHandler';
import AreaHandler from './AreaHandler';
import arrayIcon from './assets/icons/navigation.png'

// GLOBAL VARIABLES
let firstLocationUpdate = true;
let lastCoords = null;

// Create a vector source to store the user's location
const userLocationSource = new VectorSource();
const userLocationLayer = new VectorLayer({ source: userLocationSource });


// -- GEO UPDATE CALLBACK --
function updateUserLocation(coords, heading) {
    lastCoords = coords;
    userLocationSource.clear();

    const userLocation = new Feature({
        geometry: new Point(fromLonLat(coords))
    });

    userLocation.setStyle(new Style({
        image: new Icon({
            src: arrayIcon,
            scale: 0.08,
            rotation: heading,
            rotateWithView: true
        })
    }));

    userLocationSource.addFeature(userLocation);

    // zoom to user when starting the website
    if (firstLocationUpdate) {
        mapHandler.getMap().getView().animate({
            center: fromLonLat(coords),
            zoom: 18,
            duration: 1000
        });
        firstLocationUpdate = false;
    }

    // map follows user
    // map.getView().animate({
    //     center: fromLonLat(coords),
    //     duration: 500
    // });


    // display location based info on the map
    document.getElementById('info').innerHTML = `<span>coords: ${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}</span>`

    // Check distance to POI
    const pois = areaHandler.getPois();
    for(let i = 0; i < pois.length; i++)
    {
        const distance = geoHandler.getDistanceMeters(coords, pois[i].getCoords());

        if (distance <= pois[i].getRadius()) {
            // display poi content
            popupElement.innerHTML = pois[i].getContent();
            popupOverlay.setPosition(fromLonLat(pois[i].getCoords()));
            break;
        } else {
            popupOverlay.setPosition(undefined); // Hide popup
        }
    }
}


// SETUP
// --- POPUP SETUP ---
const popupElement = document.createElement('div');
popupElement.className = 'ol-popup';

const popupOverlay = new Overlay({
    element: popupElement,
    positioning: 'bottom-center',
    stopEvent: false,
    offset: [0, -25],
});

// --- MAP AND GEO SETUP ---
const geoHandler = new GeoHandler(updateUserLocation);
const areaHandler = new AreaHandler();

const layers = [userLocationLayer];
const overlays = [popupOverlay];

const mapHandler = new MapHandler(geoHandler, layers, overlays, areaHandler.getAreas());

// MAIN PROGRAM
function main() {
    // Add event listener to recenter button
    document.getElementById('recenterBtn').addEventListener('click', () => {
        if (lastCoords) {
            mapHandler.getMap().getView().animate({
                center: fromLonLat(lastCoords),
                zoom: 17,
                duration: 500
            });
        }
    });
}


// START THE PROGRAM    
main();
