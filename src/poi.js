import Feature from 'ol/Feature';
import CircleGeom from 'ol/geom/Circle';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

export default class POI {
    constructor(coords, radius, poiContent) {
        this.radius = radius; // In meters
        this.coords = coords;
        this.poiContent = poiContent;

        // Convert center to map projection
        const projectedCenter = fromLonLat(this.coords);

        // Create a circle geometry
        this.poiFeature = new Feature({
            geometry: new CircleGeom(projectedCenter, radius)
        });

        // Style: solid blue outline + semi-transparent fill
        this.poiFeature.setStyle(new Style({
            stroke: new Stroke({
                color: 'blue',
                width: 2
            }),
            fill: new Fill({
                color: 'rgba(30, 144, 255, 0.3)' // DodgerBlue with transparency
            })
        }));

        this.poiSource = new VectorSource({
            features: [this.poiFeature]
        });

        this.poiLayer = new VectorLayer({
            source: this.poiSource
        });
    }

    getCoords() {
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

    getAudio() {
        return this.poiContent.getAudio();
    }
}