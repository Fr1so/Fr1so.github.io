import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

export default class MapHandler {
    constructor(geoHandler, layers, overlays, pois) {
        this.geoHandler = geoHandler;
        this.layers = layers;
        this.overlays = overlays;
        this.pois = pois;

        // Create map
        this.map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: fromLonLat([0, 0]), // Default center
                zoom: 2
            })
        });

        // add layers
        this.layers.forEach(layer => {
            this.map.addLayer(layer);
        });

        // add overlays
        this.overlays.forEach(overlay => {
            this.map.addOverlay(overlay);
        });

        // add pois
        this.pois.forEach(poi => {
            this.map.addLayer(poi.getLayer());
        });
    }

    getMap() {
        return this.map;
    }
}