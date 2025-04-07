import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

export default class POI {
    constructor(coords, name, content) {
        this.coords = coords;
        this.name = name;
        this.content = content;

        this.poiFeature = new Feature({
            geometry: new Point(fromLonLat(poiCoords))
        });

        this.poiFeature.setStyle(new Style({
            image: new Icon({
                src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                scale: 0.05
            })
        }));

        this.poiSource = new VectorSource({
            features: [poiFeature]
        });

        this.poiLayer = new VectorLayer({
            source: poiSource
        });
    }

    getCoords(){
        return this.coords;
    }

    getLayer() {
        return this.poiLayer;
    }
}