import Feature from 'ol/Feature';
import CircleGeom from 'ol/geom/Circle';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

export default class POI {
    constructor(coords, radius, poiContent, isFound = false) {
        this.radius = radius; // In meters
        this.coords = coords;
        this.poiContent = poiContent;
        this.isFound = isFound;

        // Convert center to map projection
        const projectedCenter = fromLonLat(this.coords);

        // Create a circle geometry
        this.poiFeature = new Feature({
            geometry: new CircleGeom(projectedCenter, this.radius)
        });

        this.poiSource = new VectorSource({
            features: [this.poiFeature]
        });

        this.poiLayer = new VectorLayer({
            source: this.poiSource
        });

        this.updateStyle();
    }

    getCoords() {
        return this.coords;
    }

    getRadius() {
        return this.radius;
    }

    setFound(isFound) {
        this.isFound = isFound;
        this.updateStyle();
    }

    updateStyle() {
        const opacity = this.isFound ? 0.3 : 0.0;
        this.poiFeature.setStyle(new Style({
            stroke: new Stroke({
                color: `rgba(0, 0, 255, ${opacity * 3})`,
                width: 2
            }),
            fill: new Fill({
                color: `rgba(30, 144, 255, ${opacity})`
            })
        }));
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