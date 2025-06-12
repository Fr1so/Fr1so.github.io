import Feature from 'ol/Feature';
import CircleGeom from 'ol/geom/Circle';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import poi_icon from './assets/icons/poi_icon.png';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import { Style as IconStyle } from 'ol/style';

export default class POI {
    constructor(coords, radius, poiContent, isFound = false) {
        this.radius = radius; // In meters
        this.coords = coords;
        this.poiContent = poiContent;
        this.userInside = false;

        this.poiMarker = new Feature({
            geometry: null,
            poiReference: this
        });

        this.poiMarker.setStyle(new IconStyle({
            image: new Icon({
                src: poi_icon,
                scale: 0.8
            })
        }));

        this.poiSource = new VectorSource({
            features: [this.poiMarker]
        });

        this.poiLayer = new VectorLayer({
            source: this.poiSource
        });

        this.setFound(isFound);
    }

    getCoords() {
        return this.coords;
    }

    getRadius() {
        return this.radius;
    }

    setFound(isFound) {
        this.isFound = isFound;
        this.updateMarkerVisibility();
    }

    updateMarkerVisibility() {
        if (this.isFound || this.userInside) {
            this.poiMarker.setGeometry(new Point(fromLonLat(this.coords)));
        } else {
            this.poiMarker.setGeometry(null);
        }
    }

    getLayer() {  
        return this.poiLayer;
    }

    getContent() {
        return this.poiContent;
    }

    getAudio() {
        return this.poiContent.getAudio();
    }
}