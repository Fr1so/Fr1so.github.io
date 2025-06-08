import POI from './POI'
import POIContent from './POIContent';
import Area from './Area';
import amelisweerdSound1 from './assets/audio/amelisweerd1.mp3';
import birdhouse from './assets/img/birdhouse.jpeg';
import chessboard from './assets/img/chessboard.jpeg';
import magnifying_glass from './assets/img/magnifying_glass.jpeg';
import wood_thingy from './assets/img/wood_thingy.jpeg';
import yellow_house from './assets/img/yellow_house.jpeg';
import grove_den from './assets/img/grove_den.jpeg';
import waterlelies from './assets/img/waterlelies.jpeg';
import zwarte_vlier from './assets/img/zwarte_vlier.jpeg';

export default class AreaHandler {
    constructor() {
        // create pois here with coords and content

        // Griftsteede POIS
        // TODO!! IMAGE ANSWERS
        const griftsteede1 = new POI([5.128442, 52.101841], 20, new POIContent('Vogelhuisje', amelisweerdSound1, birdhouse, 'Welk dier leeft hier?', ['Uil', 'Mees', 'Merel', 'Muis'], 1, 'Vogelpotten zoals deze worden al sinds de 16e eeuw gebruikt. Kleine vogels zoals mezen en mussen kunnen hier nestelen of schuilen tegen slecht weer.'), true);
        const griftsteede2 = new POI([5.129285, 52.102039], 20, new POIContent('Schaakbord', amelisweerdSound1, chessboard, 'Welke van deze rupsen zal op een dag uitgroeien tot de bekende dagpauwoog?', ['Rups 1', 'Rups 2', 'Rups 3', 'Rups 4'], 3, 'Als rups voeden deze vlinders zich bijna uitsluitend met brandnetels. De grote valse ogen aan de binnenkant van hun vleugels dienen om roofdieren af te schrikken. De andere kant van hun vleugels is echter totaal anders: als ze hun vleugels inklappen, vormen ze met hun grijsbruine kleur een uitstekende camouflage.'), true);
        const griftsteede3 = new POI([5.129093, 52.101391], 20, new POIContent('Vergrootglas', amelisweerdSound1, magnifying_glass, 'Hoe maken krekels geluid?', ['door twee lichaamsdelen tegen elkaar te schuren', 'door heel snel met hun vleugels te slaan', 'door te schreeuwen', 'door hun vleugels over een stuk hout te wrijven'], 0, 'Krekels maken hun kenmerkende geluid door twee geribbelde delen van hun lichaam tegen elkaar te wrijven. Hoe warmer de temperatuur, hoe sneller ze kunnen bewegen, waardoor het tsjirpen luider wordt. Ze zijn ook nachtdieren. Daarom associëren we hun geluid met warme zomernachten.'), true);
        const griftsteede4 = new POI([5.129072 , 52.101826], 20, new POIContent('Houten huisje', amelisweerdSound1, wood_thingy, 'Welke soort bestuiver zou in een insectenhotel leven?', ['honigbij', 'hommel', 'solitaire bij', 'papierswesp'], 2, 'Bijenhotels zijn een geweldige manier om solitaire (of wilde) bijen te helpen, omdat veel van hun natuurlijke nestgelegenheden verloren zijn gegaan. Wilde bijen leven niet in kolonies zoals honingbijen, maar leven alleen. De meeste van de meer dan 300 bijensoorten in Nederland zijn solitaire bijen. Andere bijen, zoals honingbijen of hommels, geven de voorkeur aan andere nestplaatsen en worden niet aangetrokken door bijenhotels.'), true);
        const griftsteede5 = new POI([5.128988 , 52.100962], 20, new POIContent('Gele huisje', amelisweerdSound1, yellow_house, 'Wat zou dit gele huisje kunnen zijn?', ['een plek waar de natuur aan zichzelf wordt overgelaten', 'het is bedoeld om je aan het denken te zetten', 'het is kunst', 'het beschermt de natuur binnenin'], [0, 1, 2, 3], 'Deze gele huisjes, natuurvrijplaatsen, zijn een kunstwerk van Marieke Vromans, die de natuur in Utrecht symbolisch een thuis geven door de binnenkant onaangeroerd te laten. De binnenkant van deze huisjes kan interessante vragen oproepen over hoe we naar de natuur kijken: Kan de natuur alleen zichzelf zijn als we haar mooi of nuttig vinden? Kan de natuur ook gewoon bestaan ​​zonder een doel te dienen?'), true);

        // Griftpark West POIS
        const griftparkWest1 = new POI([5.127361, 52.101611], 20, new POIContent('Grove Den', amelisweerdSound1, grove_den, 'Welke feiten over de grove den zijn onjuist?', ['De boom heeft mannelijke en vrouwelijke bloemen', 'De kegels openen zich als het regent', 'De zaden rijpen in de kegels gedurende twee jaar', 'Hars van dennen werd ooit gebruikt om kauwgom te maken'], 1, 'De grove den is een van de weinige inheemse naaldbomen. De dennenappels zijn natuurlijke weersindicatoren: ze openen zich bij droog weer en sluiten zich bij regen. Dit zorgt ervoor dat de zaden in de dennenappels alleen bij droog weer vrijkomen en eerder door de wind worden meegevoerd.'), true);
        const griftparkWest2 = new POI([5.126332, 52.101158], 20, new POIContent('Waterlelies', amelisweerdSound1, waterlelies, 'Welke voordelen hebben waterlelies voor hun ecosysteem?', ['Ze bieden vissen beschutting tegen roofdieren', 'Ze voorkomen algengroei', 'Ze filteren zout water', 'De kleur van hun bloemen geeft de gezondheid van de vijver aan'], [0, 1], 'Naast het bieden van beschutting aan dieren, bieden waterlelies ook schaduw tegen de zon voor het water eronder. Dit verlaagt de watertemperatuur en helpt algengroei te voorkomen.'), true);
        const griftparkWest3 = new POI([5.126660, 52.100431], 20, new POIContent('Zwarte Vlier', amelisweerdSound1, zwarte_vlier, 'Welke delen van deze struik zijn eetbaar?', ['Bladeren', 'Bessen (na het koken)', 'Bloemen', 'Wortels'], [1, 2], 'De vlierbloesem struik wordt al honderden jaren gekweekt als kook- en medicinale plant. In de middeleeuwen werd hij zelfs als heilig beschouwd, omdat hij het kwaad zou afweren. Tegenwoordig wordt hij nog steeds gebruikt om siroop van de bloemen te maken (vlierbloesemsiroop) en om de bessen te gebruiken bij het bakken of om wijn te maken (vlierbessenwijn).'), true);

        // create area's here with coords (outline polygon) and pois
        const amsterdamCoords = [
            [4.888518, 52.373351],
            [4.888449, 52.373207],
            [4.887358, 52.373314],
            [4.887379, 52.373454],
            [4.888518, 52.373351]
        ];

        const griftsteedeCoords = [
            [5.129724, 52.102086],
            [5.128947, 52.100142],
            [5.128228, 52.100046],
            [5.127960, 52.100923],
            [5.128001, 52.101242],
            [5.127621, 52.101633],
            [5.128260, 52.101938],
            [5.128255, 52.102270],
            [5.129113, 52.102204],
            [5.129724, 52.102086]
        ];

        const griftparkWestCoords = [
            [5.127521, 52.101704],
            [5.127421, 52.101775],
            [5.126226, 52.101867],
            [5.126096, 52.101340],
            [5.125652, 52.101278],
            [5.125632, 52.100909],
            [5.125441, 52.099226],
            [5.125926, 52.099243],
            [5.126855, 52.099449],
            [5.127706, 52.099655],
            [5.128247, 52.099809],
            [5.128201, 52.100055],
            [5.127925, 52.100924],
            [5.127968, 52.101244],
            [5.127521, 52.101704]
        ];

        const griftparkSouthCoords = [
            [5.128308, 52.099768],
            [5.126416, 52.099241],
            [5.127245, 52.098726],
            [5.127487, 52.098471],
            [5.127645, 52.098145],
            [5.128675, 52.098234],
            [5.128568, 52.098711],
            [5.128413, 52.099471],
            [5.128308, 52.099768]
        ];

        

        this.areas = [
            // new Area('amsterdam', amsterdamCoords, [amsterdam1]),
            new Area('Stadsboerderij Griftsteede', griftsteedeCoords, [griftsteede1, griftsteede2, griftsteede3, griftsteede4, griftsteede5]),
            new Area('Griftpark West', griftparkWestCoords, [griftparkWest1, griftparkWest2, griftparkWest3]),
            new Area('Griftpark Zuid', griftparkSouthCoords, [])
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