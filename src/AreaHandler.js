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
        // create pois here with coords and content
        const amsterdamPoi1 = new POI([5.134193, 52.080148], 20, new POIContent('Amsterdam 1', 'Amsterdam testing location', amsterdamSound), true);

        // Amelis Weerd POIS
        const amelisWeerdPoi1 = new POI([5.169642143598895, 52.068005992977746], 20, new POIContent('Amelis Weerd 1', 'Congrats! You found point 1/5', amelisweerdSound1));
        const amelisWeerdPoi2 = new POI([5.169405256008835, 52.06722847589258], 20, new POIContent('Amelis Weerd 2', 'Congrats! You found point 2/5', amelisweerdSound2));
        const amelisWeerdPoi3 = new POI([5.169252184001826, 52.06814756590774], 20, new POIContent('Amelis Weerd 3', 'Congrats! You found point 3/5', amelisweerdSound3));
        const amelisWeerdPoi4 = new POI([5.1700515416997375, 52.06728206086768], 20, new POIContent('Amelis Weerd 4', 'Congrats! You found point 4/5', amelisweerdSound4));
        const amelisWeerdPoi5 = new POI([5.169959040341838, 52.068197756130914], 20, new POIContent('Amelis Weerd 5', 'Congrats! You found point 5/5', amelisweerdSound5));

        const finlandPoi1 = new POI([25.310620, 60.630724], 20, new POIContent('Finland Test', 'Testing point 1', amsterdamSound));

        const griftPark1 = new POI([5.127110, 52.100298], 40 , new POIContent('Beelden Griftpark', '', amelisweerdSound1));
        const griftPark2 = new POI([5.128639, 52.101224], 40, new POIContent('Speeltuin Griftsteede', '', amelisweerdSound2));
        const griftPark3 = new POI([5.127680, 52.098828], 40, new POIContent('Skatepark', '', amelisweerdSound3));

        // create area's here with coords (outline polygon) and pois
        const amsterdamCoords = [
            [4.888518, 52.373351],
            [4.888449, 52.373207],
            [4.887358, 52.373314],
            [4.887379, 52.373454],
            [4.888518, 52.373351]
        ];

        const amelisWeerdCoords = [
            [5.168812, 52.067038],
            [5.168461, 52.068208],
            [5.170350, 52.068254],
            [5.170438, 52.067280],
            [5.168812, 52.067038]
        ];

        const finlandCoords = [
            [25.289142, 60.626276],
            [25.296987, 60.624724],
            [25.329634, 60.617337],
            [25.326534, 60.633909],
            [25.301416, 60.637415],
            [25.289142, 60.626276]
        ];

        const griftparkCoords = [
            [5.127653, 52.098138],
            [5.127491, 52.098499],
            [5.127161, 52.098780],
            [5.127049, 52.098760],
            [5.126412, 52.099210],
            [5.125540, 52.098955],
            [5.125433, 52.099117],
            [5.124611, 52.098880],
            [5.124622, 52.098997],
            [5.124824, 52.099777],
            [5.124766, 52.099781],
            [5.124819, 52.100090],
            [5.124539, 52.100108],
            [5.124608, 52.100568],
            [5.123776, 52.100629],
            [5.123883, 52.101181],
            [5.125141, 52.101228],
            [5.125102, 52.101684],
            [5.126158, 52.101613],
            [5.126290, 52.102183],
            [5.127113, 52.102276],
            [5.128159, 52.102234],
            [5.128288, 52.102278],
            [5.129114, 52.102215],
            [5.129728, 52.102090],
            [5.129336, 52.101028],
            [5.129254, 52.100914],
            [5.128968, 52.100167],
            [5.128912, 52.100005],
            [5.129028, 52.098996],
            [5.129147, 52.098604],
            [5.129114, 52.098418],
            [5.129012, 52.098314],
            [5.128810, 52.098249],
            [5.127653, 52.098138]
        ];

        this.areas = [
            new Area('amsterdam', amsterdamCoords, [amsterdamPoi1]),
            new Area('Amelisweerd', amelisWeerdCoords, [amelisWeerdPoi1, amelisWeerdPoi2, amelisWeerdPoi3, amelisWeerdPoi4, amelisWeerdPoi5]),
            new Area('Finland', finlandCoords, [finlandPoi1]),
            new Area('Griftpark', griftparkCoords, [griftPark1, griftPark2, griftPark3])
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