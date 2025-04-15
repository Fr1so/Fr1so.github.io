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
import POIHandler from './POIHandler';

// --- POPUP SETUP ---
const popupElement = document.createElement('div');
popupElement.className = 'ol-popup';

const popupOverlay = new Overlay({
    element: popupElement,
    positioning: 'bottom-center',
    stopEvent: false,
    offset: [0, -15],
});

// Create a vector source to store the user's location
const userLocationSource = new VectorSource();
const userLocationLayer = new VectorLayer({ source: userLocationSource });


// -- MAIN UPDATE LOOP CALLBACK --
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

    // map follows user
    // map.getView().animate({
    //     center: fromLonLat(coords),
    //     duration: 500
    // });

    document.getElementById('info').innerHTML = `<span>coords: ${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}</span>`

    // Check distance to POI
    const pois = poiHandler.getPois();
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


// --- MAP AND GEO SETUP ---
const layers = [userLocationLayer];
const overlays = [popupOverlay];

const geoHandler = new GeoHandler(updateUserLocation);
const poiHandler = new POIHandler();
const mapHandler = new MapHandler(geoHandler, layers, overlays, poiHandler.getPois());