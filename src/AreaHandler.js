import POI from './POI'
import POIContent from './POIContent';
import Area from './Area';
import amsterdamSound from './assets/audio/amsterdam_street_testing.mp3';

export default class AreaHandler {
    constructor() {
        // create poi content here
        const amsterdamContent1 = new POIContent('Amsterdam 1', 'Amsterdam testing location', amsterdamSound);
        const griftparkContent1 = new POIContent('Griftpark 1', 'testing griftpark area');

        // create pois here with coords and content
        const amsterdamPoi1 = new POI([4.8877, 52.3734], 20, amsterdamContent1);
        const griftparkPoi1 = new POI([5.128037, 52.099107], 30, griftparkContent1);

        // create area's here with coords (outline polygon) and pois
        const amsterdamCoords = [
            [4.888518, 52.373351],
            [4.888449, 52.373207],
            [4.887358, 52.373314],
            [4.887379, 52.373454],
            [4.888518, 52.373351]
        ];

        const griftparkCoords = [
            [5.128912, 52.099931],
            [5.129038, 52.098940],
            [5.129127, 52.098448],
            [5.128907, 52.098261],
            [5.127645, 52.098135],
            [5.127466, 52.098531],
            [5.127199, 52.098782],
            [5.127037, 52.098769],
            [5.126382, 52.099213],
            [5.128912, 52.099931]
          ];

        this.areas = [
            new Area('amsterdam', amsterdamCoords, [amsterdamPoi1]),
            new Area('griftpark', griftparkCoords, [griftparkPoi1])
        ];
    }

    getAreas() {
        return this.areas;
    }

    getPois() {
        let allPois = [];
        this.areas.forEach(area => {
            area.pois.forEach(poi => {
                allPois.push(poi);
            });
        });

        return allPois;
    }
}