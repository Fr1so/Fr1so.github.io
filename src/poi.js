import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

export default class POI {
    constructor(coords, name, content) {
        this.coords = coords;
        this.name = name;
        this.content = content;

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

    getLayer() {
        return this.poiLayer;
    }
}