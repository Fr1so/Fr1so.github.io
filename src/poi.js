import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import POIContent from './POIContent';

export default class POI {
    constructor(coords, radius, poiContent) {
        this.radius = radius;
        this.coords = coords;
        this.poiContent = poiContent;

        // create element that is displayed on the map
        this.poiFeature = new Feature({
            geometry: new Point(fromLonLat(this.coords))
        });

        this.poiFeature.setStyle(new Style({
            image: new Icon({
                src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                scale: 0.05
            })
        }));

        this.poiSource = new VectorSource({
            features: [this.poiFeature]
        });

        this.poiLayer = new VectorLayer({
            source: this.poiSource
        });
    }

    getCoords(){
        return this.coords;
    }

    getRadius() {
        return this.radius;
    }

    getLayer() {
        return this.poiLayer;
    }

    getContent() {
        return this.poiContent.getContent();
    }
}