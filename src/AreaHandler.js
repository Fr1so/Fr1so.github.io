import POI from './POI'
import POIContent from './POIContent';
import Area from './Area';
import amsterdamSound from './assets/audio/amsterdam_street_testing.mp3';
import amelisweerdSound1 from './assets/audio/amelisweerd1.mp3';
import amelisweerdSound2 from './assets/audio/amelisweerd2.mp3';
import amelisweerdSound3 from './assets/audio/amelisweerd3.mp3';
import amelisweerdSound4 from './assets/audio/amelisweerd4.mp3';
import amelisweerdSound5 from './assets/audio/amelisweerd5.mp3';

export default class AreaHandler {
    constructor() {
        // create poi content here
        const amsterdamContent1 = new POIContent('Amsterdam 1', 'Amsterdam testing location', amsterdamSound);
        const griftparkContent1 = new POIContent('Griftpark 1', 'testing griftpark area');

        // Amelis Weerd Content
        const amelisWeerdContent1 = new POIContent('Amelis Weerd 1', 'Congrats! You found point 1/5', amelisweerdSound1);
        const amelisWeerdContent2 = new POIContent('Amelis Weerd 2', 'Congrats! You found point 2/5', amelisweerdSound2);
        const amelisWeerdContent3 = new POIContent('Amelis Weerd 3', 'Congrats! You found point 3/5', amelisweerdSound3);
        const amelisWeerdContent4 = new POIContent('Amelis Weerd 4', 'Congrats! You found point 4/5', amelisweerdSound4);
        const amelisWeerdContent5 = new POIContent('Amelis Weerd 5', 'Congrats! You found point 5/5', amelisweerdSound5);

        // create pois here with coords and content
        const amsterdamPoi1 = new POI([5.134193, 52.080148], 20, amsterdamContent1);
        const griftparkPoi1 = new POI([5.128037, 52.099107], 30, griftparkContent1);

        // Amelis Weerd POIS
        const amelisWeerdPoi1 = new POI([5.169642143598895, 52.068005992977746], 20, amelisWeerdContent1);
        const amelisWeerdPoi2 = new POI([5.169405256008835, 52.06722847589258], 20, amelisWeerdContent2);
        const amelisWeerdPoi3 = new POI([5.169252184001826, 52.06814756590774], 20, amelisWeerdContent3);
        const amelisWeerdPoi4 = new POI([5.1700515416997375, 52.06728206086768], 20, amelisWeerdContent4);
        const amelisWeerdPoi5 = new POI([5.169959040341838, 52.068197756130914], 20, amelisWeerdContent5);

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

        const amelisWeerdCoords = [
            [5.168812, 52.067038],
            [5.168461, 52.068208],
            [5.170350, 52.068254],
            [5.170438, 52.067280],
            [5.168812, 52.067038]
        ];

        this.areas = [
            new Area('amsterdam', amsterdamCoords, [amsterdamPoi1]),
            new Area('griftpark', griftparkCoords, [griftparkPoi1]),
            new Area('Amelisweerd', amelisWeerdCoords, [amelisWeerdPoi1, amelisWeerdPoi2, amelisWeerdPoi3, amelisWeerdPoi4, amelisWeerdPoi5])
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