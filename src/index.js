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
import QuizOverlay from './QuizOverlay';

// GLOBAL VARIABLES
let quizOverlay;
let geoHandler;
let areaHandler;
let mapHandler;
let firstLocationUpdate = true;
let lastCoords = null;
let currentPoi = null;

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
    document.getElementById('info').innerHTML = `<span>coords: ${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}</span>`


    // IF INSIDE POI ALREADY
    if(currentPoi != null) {
        const distance = geoHandler.getDistanceMeters(coords, currentPoi.getCoords());

        // IN AUDIBLE RANGE OF POI
        const volume = Math.max(0, 1 - distance / currentPoi.getRadius()); // 1 at center, 0 at edge
        const audio = currentPoi.getAudio();
        
        if (audio) {
            audio.volume = volume; // set volume
            if (audio.paused) {
                audio.play();
            }
        }

        // check if user left POI radius
        if (distance >= currentPoi.getRadius() * 0.75) {
            // hide quiz overlay
            // quizOverlay.hide();
            // quizOverlay.setPoi(null);

            // set current poi to null to user can find new pois
            currentPoi = null;

            // hide marker
            poi.userInside = false;
            poi.updateMarkerVisibility();
        }
    } else {
        // Check distance to all POIS if not inside POI already
        const pois = areaHandler.getPois();

        for (let i = 0; i < pois.length; i++) {
            const poi = pois[i];
            const distance = geoHandler.getDistanceMeters(coords, poi.getCoords());
        
            if (distance <= poi.getRadius()) {
                // IN AUDIBLE RANGE OF POI
                const volume = Math.max(0, 1 - distance / poi.getRadius()); // 1 at center, 0 at edge
                const audio = poi.getAudio();
        
                if (audio) {
                    audio.volume = volume; // set volume
                    if (audio.paused) {
                        audio.play();
                    }
                }

                if (distance <= poi.getRadius() * 0.28) {
                    currentPoi = poi;
                    // show popup
                    quizOverlay.setPoi(poi);
                    if(!quizOverlay.Active)
                    {
                        quizOverlay.show();
                    }
                    

                    // show marker on the map
                    poi.userInside = true;
                    poi.updateMarkerVisibility();
                
                    // Vibrate if supported
                    if (navigator.vibrate) {
                        navigator.vibrate(200);
                    }
                    
                    break;
                }

                break;
            } else {
                const audio = poi.getAudio();
                if (audio && !audio.paused) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            }
        }
    }
}

function updateAreaCallback(poi) {
    // force area layer to update
    const parentArea = areaHandler.getAreas().find(area => area.getPois().includes(poi));
    if (parentArea) {
        parentArea.updateStyle();
    }
}


// SETUP
function setup() {
    // --- UI SETUP ---
    quizOverlay = new QuizOverlay(updateAreaCallback);
    // Close event listeners
        document.getElementById('modal-close').addEventListener('click', quizOverlay.hide.bind(quizOverlay));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                quizOverlay.hide();
            }
        });

    // --- MAP AND GEO SETUP ---
    geoHandler = new GeoHandler(updateUserLocation);
    areaHandler = new AreaHandler();

    const layers = [userLocationLayer];
    const overlays = [];

    mapHandler = new MapHandler(geoHandler, layers, overlays, areaHandler.getAreas());
    mapHandler.getMap().on('singleclick', function (event) {
        mapHandler.getMap().forEachFeatureAtPixel(event.pixel, function (feature) {
            if (feature.get('poiReference')) {
                const poi = feature.get('poiReference');
                currentPoi = poi;
                quizOverlay.setPoi(poi);
                quizOverlay.show();
            }
        });
    });
}


// MAIN PROGRAM
function main() {
    quizOverlay.hide();
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


// BUTTON THAT STARTS THE PROGRAM
document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('start-overlay').style.display = 'none';
  
    // 🔊 Now safe to play audio or request user location
    setup();
    main();
});