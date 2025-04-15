import POI from './poi'
import POIContent from './POIContent';

export default class POIHandler {
    constructor() {
        // create poi content here
        const amsterdam1 = new POIContent('Amsterdam', 'testing');

        // create pois here with coords and content
        this.pois = [new POI([4.8876, 52.3733], 100, amsterdam1)];
    }

    getPois() {
        return this.pois;
    }
}