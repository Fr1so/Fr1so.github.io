import Polygon from 'ol/geom/Polygon';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { fromLonLat } from 'ol/proj';

export default class Area {
    constructor(name, coords, pois, isUnlocked = false) {
        this.name = name;
        this.coords = coords;
        this.pois = pois;
        this.isUnlocked = isUnlocked;

        // Convert coords to map projection
        const transformedCoords = [coords.map(coord => fromLonLat(coord))];

        // Create polygon geometry
        const areaPolygon = new Polygon(transformedCoords);

        // Create feature
        this.areaFeature = new Feature({
            geometry: areaPolygon
        });
    }

    getLayer() {
        // set area color based on unlocked status
        let fillColor = this.isUnlocked
            ? 'rgba(76, 175, 80, 0.5)'  // natural leafy green
             : 'rgba(128, 128, 128, 0.5)'; // grey for locked

        this.areaFeature.setStyle(new Style({
            fill: new Fill({
            color: fillColor
        }),
        stroke: new Stroke({
            color: '#555',
            width: 2
        })
        }));
    
        // Create layer
        const areaSource = new VectorSource({
            features: [this.areaFeature]
        });
    
        this.areaLayer = new VectorLayer({
            source: areaSource
        });

        return this.areaLayer;
    }

    getPois() {
        return this.pois;
    }
}