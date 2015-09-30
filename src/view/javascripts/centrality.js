/**
 * Created by Luciano on 29/09/2015.
 */
var app = angular.module('centrality', []);
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
app.controller('CentralityController', ['$scope', '$http', function ($scope, $http) {
    $scope.rows = 15;
    $scope.pag = 1;
    $scope.disableLeft = true;
    $scope.disableRight = false;
    $scope.showSearch = false;
    $scope.fileName = "centrality-startup-net-arg-mini.csv";
    var jtext = '[["208898", "Rouge Reel", "0.006544502617801047", "0.0", "0.6470588235294118"], ["477189", "GameMiles / Miles &amp; Points Entertainment", "0.003926701570680628", "0.0", "1.0"], ["477190", "MobyDigital", "0.003926701570680628", "0.0", "1.0"], ["108553", "CME Group", "0.005235602094240838", "3.0", "1.0"], ["618511", "kurv", "0.002617801047120419", "0.0", "1.0"], ["481296", "ClasApp", "0.0013089005235602095", "0.0", "1.0"], ["518162", "US Nuclear Regulatory Commission", "0.002617801047120419", "0.0", "0.6666666666666666"], ["505878", "NetNet Social", "0.005235602094240838", "0.0", "1.0"], ["579613", "PetalDrop Mineral Water", "0.0013089005235602095", "0.0", "1.0"], ["213022", "Endeavor Global", "0.09424083769633508", "0.0", "0.9090909090909091"], ["229070", "Geniusly", "0.04712041884816754", "0.0", "0.1912889935256033"], ["36897", "Ecosense Lighting", "0.09424083769633508", "0.0", "0.9090909090909091"], ["36899", "The Savvy Source", "0.09424083769633508", "0.0", "0.9090909090909091"], ["280612", "Athleta (sold to GAP)", "0.09424083769633508", "0.0", "0.9090909090909091"], ["36902", "Caisfunds", "0.09424083769633508", "0.0", "0.9090909090909091"], ["280615", "Color Kinetics (IPO & sold to Philipps)", "0.09424083769633508", "0.0", "0.9090909090909091"], ["509992", "Actitud Web", "0.0013089005235602095", "0.0", "0.16718106995884774"], ["280617", "Internet Securities (sold to Euromoney)", "0.09424083769633508", "0.0", "0.9090909090909091"], ["38955", "Telefonica", "0.010471204188481676", "1284.0", "0.24109792284866471"], ["280620", "aQuantive (IPO & sold to Microsoft)", "0.09424083769633508", "0.0", "0.9090909090909091"], ["280621", "Violin Memory (IPO)", "0.09424083769633508", "0.0", "0.9090909090909091"], ["354355", "Con Vista al Mar", "0.002617801047120419", "0.0", "1.0"], ["81975", "Netoven", "0.002617801047120419", "0.0", "0.6666666666666666"], ["501820", "feria", "0.0013089005235602095", "0.0", "1.0"], ["356414", "Oficinamoderna.com", "0.005235602094240838", "0.0", "0.18227706113292202"], ["317503", "Handouts, Inc", "0.010471204188481676", "0.3333333333333333", "0.5263157894736842"], ["184384", "Red Brick Systems", "0.007853403141361256", "0.0", "1.0"], ["274498", "Exo", "0.09424083769633508", "0.0", "0.9090909090909091"], ["174147", "MTV/Viacom Media Networks", "0.005235602094240838", "0.0", "0.19472738166566805"], ["71752", "HP Software", "0.003926701570680628", "0.0", "0.5599999999999999"], ["180301", "Officenet", "0.010471204188481676", "0.3333333333333333", "0.5263157894736842"], ["180302", "Quasar Ventures", "0.10209424083769633", "140.3333333333333", "0.9756097560975611"], ["180303", "Wanako Games", "0.009162303664921465", "0.0", "0.5228758169934641"], ["131153", "Cloudadmin, Inc", "0.04712041884816754", "0.0", "0.1912889935256033"], ["264547", "Survmetrics", "0.04712041884816754", "0.0", "0.1912889935256033"], ["38997", "Toyota", "0.009162303664921465", "0.0", "0.17105263157894737"], ["223318", "The Bubble", "0.04712041884816754", "0.0", "0.1912889935256033"], ["58041", "Wound Care Technologies", "0.015706806282722512", "0.0", "0.2191503708698584"], ["493583", "Lookeate", "0.007853403141361256", "8.0", "1.0"], ["20573", "Planwise", "0.002617801047120419", "0.0", "0.53125"], ["63582", "United Virtualities", "0.005235602094240838", "0.0", "1.0"], ["49247", "Lend Lease", "0.002617801047120419", "0.0", "1.0"], ["487520", "451", "0.005235602094240838", "0.0", "0.7"], ["63586", "Gamifier", "0.04057591623036649", "0.0", "0.23861967694566813"], ["551092", "VMN Software Critico", "0.006544502617801047", "0.0", "0.1774017467248908"], ["487524", "Zyk?sthenia", "0.005235602094240838", "0.0", "0.7"], ["311655", "Funnely", "0.04712041884816754", "0.0", "0.1912889935256033"], ["512109", "Red Link", "0.006544502617801047", "0.0", "0.1774017467248908"], ["554685", "Fresh Choice", "0.007853403141361256", "0.0", "0.6071428571428572"], ["270696", "Eachnet (acquired by eBay)", "0.09424083769633508", "0.0", "0.9090909090909091"], ["495731", "trinkoo", "0.002617801047120419", "1.0", "1.0"], ["469326", "MobLabs", "0.04057591623036649", "0.0", "0.23861967694566813"], ["125045", "Adsnative", "0.09424083769633508", "0.0", "0.9090909090909091"], ["22648", "NXTP Labs", "0.07722513089005235", "28846.576190476244", "0.30009233610341646"], ["53370", "Simpli.fi", "0.09424083769633508", "0.0", "0.9090909090909091"], ["47228", "Masterfoods", "0.009162303664921465", "0.0", "0.20337922403003755"], ["397438", "autominuto.com", "0.0013089005235602095", "0.0", "1.0"], ["288897", "Post + BIM", "0.009162303664921465", "0.0", "0.2090032154340836"], ["30850", "Sinimanes", "0.006544502617801047", "0.6666666666666666", "0.16137040714995035"], ["372075", "Vates", "0.007853403141361256", "0.0", "1.0"], ["235652", "Go and Up", "0.002617801047120419", "0.0", "1.0"], ["488470", "WpointStudio", "0.006544502617801047", "0.0", "0.128053585500394"], ["379016", "Quanthica", "0.011780104712041885", "28.0", "0.8461538461538461"], ["488471", "Sourcing Up", "0.006544502617801047", "0.0", "0.128053585500394"], ["505197", "Denimtex SRL", "0.009162303664921465", "0.0", "0.6666666666666666"], ["452753", "FG Angels Syndicate Fund II", "0.09424083769633508", "0.0", "0.9090909090909091"], ["358548", "Real Trends", "0.005235602094240838", "20800.085714285644", "0.3020446096654275"], ["487573", "Graion", "0.002617801047120419", "0.0", "0.5833333333333334"], ["127129", "Double Doods", "0.01832460732984293", "646.0", "0.20012315270935963"], ["32922", "OLX", "0.005235602094240838", "0.0", "0.75"], ["231791", "BothMedia", "0.005235602094240838", "1.0", "1.0"], ["127138", "T&G Minds", "0.002617801047120419", "0.0", "0.16692347200821778"], ["57512", "HP Enterprise Services", "0.003926701570680628", "0.0", "0.6666666666666666"], ["82089", "Devicescape", "0.003926701570680628", "0.0", "0.20249221183800623"], ["18602", "InsideVault", "0.010471204188481676", "454.33333333333616", "0.2353367125271542"], ["264903", "Brainedpage", "0.009162303664921465", "0.0", "0.2230610844200412"], ["553132", "CanPharma Labs", "0.002617801047120419", "0.0", "1.0"], ["53421", "Lemon", "0.002617801047120419", "0.0", "1.0"], ["53422", "BuscaPe", "0.007853403141361256", "0.0", "0.2192982456140351"], ["202927", "Shyp", "0.09424083769633508", "0.0", "0.9090909090909091"], ["190642", "MyCoffeeBox", "0.04712041884816754", "0.0", "0.1912889935256033"], ["217268", "Hexacta", "0.005235602094240838", "0.0", "0.75"], ["551094", "Transporte Stelli", "0.006544502617801047", "0.0", "0.1774017467248908"], ["489657", "ElectroSmart", "0.003926701570680628", "10.0", "0.5789473684210527"], ["145595", "Vinylfy", "0.04057591623036649", "0.0", "0.23861967694566813"], ["227516", "Bukeala", "0.020942408376963352", "2226.0", "0.20074119827053738"], ["36900", "Fiksu", "0.09424083769633508", "0.0", "0.9090909090909091"], ["493197", "SongKernel", "0.0013089005235602095", "0.0", "1.0"], ["37058", "Ushi", "0.09424083769633508", "0.0", "0.9090909090909091"], ["64203", "Sontra", "0.015706806282722512", "0.0", "0.2191503708698584"], ["323780", "ExpensasOnline", "0.007853403141361256", "645.9999999999999", "0.16489091831557584"], ["593612", "SolidOpinion", "0.015706806282722512", "0.0", "0.2191503708698584"], ["336074", "Guala", "0.015706806282722512", "0.0", "0.19987699876998768"], ["512203", "Maberik", "0.0013089005235602095", "0.0", "0.6666666666666666"], ["65744", "Globant", "0.015706806282722512", "4110.0", "0.2222982216142271"], ["112849", "TasteSpace", "0.05366492146596859", "1600.6666666666665", "0.19185360094451004"], ["424149", "Raskovsky & Asociados | Abogados", "0.0013089005235602095", "0.0", "1.0"], ["473302", "EscuelasEnRed.com.ar", "0.007853403141361256", "0.0", "0.17769272826681246"], ["499928", "+OTROS", "0.002617801047120419", "0.0", "0.4"], ["473305", "YaQueVoy", "0.011780104712041885", "390.0", "0.2142386288727752"], ["315610", "Philips Medical Systems", "0.0013089005235602095", "0.0", "1.0"], ["84187", "Walt Disney Internet Group", "0.003926701570680628", "0.0", "0.18217488789237668"], ["45276", "Sony Music Entertainment", "0.0013089005235602095", "0.0", "1.0"], ["67809", "QuickPlay Media", "0.003926701570680628", "0.0", "0.8"], ["51426", "Endeavor Argentina", "0.013089005235602094", "6384.0", "0.20161290322580647"], ["413923", "Figgu", "0.0013089005235602095", "0.0", "1.0"], ["489700", "Turismocity", "0.003926701570680628", "10.0", "0.6363636363636364"], ["39143", "Buuteeq", "0.09424083769633508", "0.0", "0.9090909090909091"], ["174313", "yap.TV", "0.017015706806282723", "0.0", "1.0"], ["415984", "Genencor International", "0.006544502617801047", "0.0", "0.5862068965517242"], ["280616", "Americanas.com (merged with Submarino)", "0.09424083769633508", "0.0", "0.9090909090909091"], ["116978", "Sanborn Media Factory", "0.006544502617801047", "0.0", "0.5714285714285714"], ["547060", "TD International", "0.006544502617801047", "0.0", "1.0"], ["227580", "AD60", "0.006544502617801047", "0.0", "0.5714285714285714"], ["256256", "Park City Mountain Resort", "0.005235602094240838", "0.0", "0.46153846153846156"], ["235777", "TeraCode", "0.003926701570680628", "324.0", "0.1807563959955506"], ["33026", "AdChina", "0.09424083769633508", "0.0", "0.9090909090909091"], ["147715", "Baker Hughes", "0.002617801047120419", "0.0", "0.1546882436934793"], ["375044", "Smowtion", "0.011780104712041885", "0.0", "0.16962421711899792"], ["342278", "HESIODO", "0.003926701570680628", "0.0", "0.16121031746031747"], ["340012", "Crol.io", "0.04712041884816754", "0.0", "0.1912889935256033"], ["229644", "Founders Place Palermo", "0.003926701570680628", "0.0", "1.0"], ["123266", "ONtheGO Platforms", "0.09424083769633508", "0.0", "0.9090909090909091"], ["426263", "Universidad de Buenos Aires", "0.006544502617801047", "3368.4999999999973", "0.21724598930481284"], ["110980", "Xtreamis", "0.003926701570680628", "0.0", "1.0"], ["332847", "Taller Technologies", "0.003926701570680628", "0.0", "1.0"], ["205085", "Vumii Imaging ", "0.006544502617801047", "0.0", "1.0"], ["43296", "Sprint", "0.011780104712041885", "0.0", "0.16962421711899792"], ["424230", "Socialcense", "0.002617801047120419", "11.0", "0.5217391304347826"], ["424232", "Willdom", "0.0013089005235602095", "0.0", "0.3529411764705882"], ["106796", "El Cronista", "0.003926701570680628", "0.0", "0.17876787678767878"], ["106797", "La Nacion", "0.003926701570680628", "0.0", "0.17876787678767878"], ["383281", "ShareMyPhone", "0.005235602094240838", "0.0", "0.16971279373368145"], ["295221", "Uomotors", "0.0013089005235602095", "0.0", "0.5714285714285714"], ["504119", "Flimper", "0.01832460732984293", "60.0", "1.0"], ["504120", "Vipoplas", "0.002617801047120419", "0.0", "0.5384615384615384"], ["504121", "DescuentosARG", "0.010471204188481676", "3.0", "0.7"], ["24893", "The Social Radio", "0.010471204188481676", "0.0", "0.23705324580598106"], ["22847", "Assured Labor", "0.010471204188481676", "0.0", "0.23705324580598106"], ["123201", "Eventdoo", "0.010471204188481676", "0.0", "0.23705324580598106"], ["47429", "Travelocity", "0.0013089005235602095", "0.0", "0.5714285714285714"], ["510279", "CoinFabrik", "0.005235602094240838", "1.5", "0.19208037825059102"], ["272717", "Enzyme Venture Capital", "0.020942408376963352", "502.7500000000014", "0.2412769116555308"], ["57678", "Solar Cells Inc (Former First Solar)", "0.007853403141361256", "0.0", "1.0"], ["57679", "Alternative Resource Electric Corp", "0.007853403141361256", "0.0", "1.0"], ["57680", "Advanced Technology Industries Inc", "0.007853403141361256", "0.0", "1.0"], ["57681", "Enviromental Prototype Homes of Tomorrow Inc", "0.007853403141361256", "0.0", "1.0"], ["487763", "Sin Rutina", "0.003926701570680628", "2.0", "1.0"], ["57684", "EPHOTinc", "0.007853403141361256", "0.0", "1.0"], ["272727", "Copernico Capital Partners", "0.009162303664921465", "0.0", "0.2090032154340836"], ["272728", "Burato.net", "0.009162303664921465", "0.0", "0.2090032154340836"], ["489821", "Areaoff", "0.002617801047120419", "1.0", "1.0"], ["428212", "Song Kernel", "0.0013089005235602095", "0.0", "1.0"], ["133862", "CINEPAPAYA", "0.04057591623036649", "0.0", "0.23861967694566813"], ["106854", "Flextracker", "0.003926701570680628", "0.0", "0.22184300341296928"], ["37223", "Fnbox", "0.015706806282722512", "0.0", "0.2191503708698584"], ["360", "Olapic", "0.0013089005235602095", "0.0", "1.0"], ["67947", "Renault", "0.003926701570680628", "0.0", "0.6666666666666666"], ["164204", "State", "0.09424083769633508", "0.0", "0.9090909090909091"], ["33135", "Microsoft", "0.009162303664921465", "3387.2", "0.2252252252252252"], ["620606", "Wayniloans", "0.006544502617801047", "1121.5", "0.2368804664723032"], ["420214", "Lectorati", "0.005235602094240838", "0.0", "0.19472738166566805"], ["301436", "Simple Transit", "0.005235602094240838", "0.0", "0.75"], ["489853", "Cooperativa de Trabajo Equality", "0.0013089005235602095", "0.0", "0.6666666666666666"], ["51585", "Avaya", "0.011780104712041885", "390.0", "0.2142386288727752"], ["27010", "AgeNation", "0.002617801047120419", "0.0", "0.6666666666666666"], ["270723", "Pi-Coral", "0.09424083769633508", "0.0", "0.9090909090909091"], ["594308", "Expensas Online", "0.002617801047120419", "0.0", "0.14167393199651263"], ["362888", "Quaddra Software", "0.09424083769633508", "0.0", "0.9090909090909091"], ["418186", "PRECISO", "0.007853403141361256", "322.0", "0.2192982456140351"], ["246157", "brandart", "0.003926701570680628", "0.0", "1.0"], ["221582", "Anheuser-Busch Inbev", "0.0013089005235602095", "0.0", "0.13303315595579207"], ["10645", "NRG llp", "0.007853403141361256", "0.0", "1.0"], ["63895", "Konica Minolta Business Solutions", "0.002617801047120419", "0.0", "1.0"], ["108957", "HashPlay", "0.003926701570680628", "0.0", "1.0"], ["452800", "ShareSmartphone Service", "0.005235602094240838", "0.0", "0.16971279373368145"], ["80291", "Neoris", "0.005235602094240838", "0.0", "0.18227706113292202"], ["404291", "Wisboo", "0.030104712041884817", "9356.616666666683", "0.24583963691376703"], ["160174", "RABBL", "0.09424083769633508", "0.0", "0.9090909090909091"], ["557496", "Apicatus", "0.002617801047120419", "0.0", "0.21841397849462366"], ["455104", "Datahipsters", "0.0013089005235602095", "0.0", "0.16121031746031747"], ["33218", "IBM", "0.032722513089005235", "15144.114285714244", "0.27896995708154504"], ["74184", "Royal Dutch Shell", "0.006544502617801047", "32.0", "0.6315789473684211"], ["123381", "Social Tools", "0.04712041884816754", "0.0", "0.1912889935256033"], ["471500", "Prisett", "0.002617801047120419", "0.0", "0.1991421568627451"], ["95309", "BBVA", "0.005235602094240838", "0.0", "0.16778523489932887"], ["201123", "Lazos Argentinos", "0.005235602094240838", "0.0", "0.5714285714285714"], ["322005", "Wolox", "0.003926701570680628", "0.0", "0.5599999999999999"], ["512470", "Bondi Paleo", "0.006544502617801047", "0.0", "1.0"], ["322008", "Impulso Labs", "0.013089005235602094", "320.0", "0.14652840396753833"], ["410074", "Guarnic", "0.002617801047120419", "0.0", "0.22033898305084745"], ["51279", "Startup Grind", "0.003926701570680628", "0.0", "0.23792093704245976"], ["494045", "Colegio de Ingenieros Especialistas de la Provincia de Santa Fe- Distrito II", "0.0013089005235602095", "0.0", "0.6666666666666666"], ["223712", "Sentisis", "0.04712041884816754", "0.0", "0.1912889935256033"], ["580065", "Spirit Consulting", "0.002617801047120419", "0.0", "1.0"], ["481764", "DeptoLibre", "0.005235602094240838", "0.0", "0.18227706113292202"], ["394663", "ReservaRest?", "0.009162303664921465", "481.5", "0.16804550155118925"], ["270831", "iLovMode", "0.009162303664921465", "372.81428571428586", "0.24923312883435586"], ["598512", "ReservaTurno", "0.003926701570680628", "2547.880952380957", "0.25252525252525254"], ["201202", "Jotatec", "0.005235602094240838", "0.0", "0.5714285714285714"], ["49651", "Net-People", "0.015706806282722512", "0.0", "0.19987699876998768"], ["49653", "Novacash", "0.015706806282722512", "0.0", "0.19987699876998768"], ["49654", "iKen Solutions Pvt. Ltd.", "0.015706806282722512", "0.0", "0.19987699876998768"], ["422391", "Negri, Torres & Figueroa Contreras", "0.003926701570680628", "0.0", "0.4782608695652174"], ["68088", "Recommind", "0.007853403141361256", "0.0", "1.0"], ["45563", "IBM Software Labs", "0.003926701570680628", "0.0", "0.1801552106430155"], ["119295", "infobae.com", "0.020942408376963352", "3150.0", "0.17051416579223505"], ["49668", "Gemalto", "0.011780104712041885", "390.0", "0.2142386288727752"], ["352773", "Brandtrack.fm", "0.05759162303664921", "11927.0", "0.2296819787985866"], ["32069", "Bling Nation", "0.009162303664921465", "0.0", "0.1951951951951952"], ["352775", "Genwords", "0.051047120418848166", "2332.4999999999995", "0.2412769116555308"], ["406036", "Vint", "0.005235602094240838", "0.0", "0.75"], ["414241", "CoderHouse", "0.005235602094240838", "0.0", "0.22663877266387727"], ["152099", "TopicFlower", "0.011780104712041885", "14.999999999999998", "0.196256038647343"], ["260650", "Wavestack", "0.04712041884816754", "0.0", "0.1912889935256033"], ["21042", "SendHub", "0.09424083769633508", "0.0", "0.9090909090909091"], ["434739", "Infinite Ventures Malaysia", "0.0013089005235602095", "0.0", "1.0"], ["39478", "Novartis", "0.0013089005235602095", "0.0", "1.0"], ["279348", "Accor Hotels", "0.0013089005235602095", "0.0", "1.0"], ["211513", "Bulltick Capital Markets", "0.003926701570680628", "0.0", "0.20236612702366127"], ["415839", "mapsology", "0.0013089005235602095", "0.0", "0.5714285714285714"], ["371260", "RLF CAPITAL MANAGEMENT", "0.005235602094240838", "0.0", "1.0"], ["371261", "ASPRO GNC", "0.005235602094240838", "0.0", "1.0"], ["371262", "Brno University of Technology", "0.005235602094240838", "0.0", "1.0"], ["371263", "Acondicionadora Cereales Bah?a Blanca", "0.005235602094240838", "0.0", "1.0"], ["20235", "OmbuShop", "0.015706806282722512", "0.0", "0.19987699876998768"], ["510537", "Kleppe S.A.", "0.005235602094240838", "0.0", "1.0"], ["37450", "Core Security Technologies", "0.005235602094240838", "324.0", "0.19208037825059102"], ["510540", "Cuaribar S.A.", "0.005235602094240838", "0.0", "1.0"], ["510541", "Kleppe", "0.005235602094240838", "0.0", "1.0"], ["390584", "Unbound VR", "0.010471204188481676", "3884.03333333333", "0.2200406228842248"], ["41554", "ExxonMobil", "0.002617801047120419", "0.0", "0.6666666666666666"], ["47700", "Independent Consultant", "0.006544502617801047", "0.0", "0.5714285714285714"], ["35417", "Popego", "0.003926701570680628", "0.0", "0.8"], ["498266", "Pilgrim", "0.0013089005235602095", "0.0", "1.0"], ["479835", "Paez Shoes", "0.006544502617801047", "0.0", "0.23247496423462088"], ["479836", "MACA", "0.006544502617801047", "0.0", "0.23247496423462088"], ["125533", "Modern Meadow", "0.09424083769633508", "0.0", "0.9090909090909091"], ["172638", "BankBoston", "0.005235602094240838", "0.0", "0.22169167803547066"], ["313951", "Grupo Vi-Da", "0.009162303664921465", "0.0", "0.14633048176497074"], ["224557", "Kalakai", "0.009162303664921465", "0.0", "0.1951951951951952"], ["51815", "Greenberg Traurig PA", "0.04057591623036649", "0.0", "0.23861967694566813"], ["217704", "NuVerse", "0.009162303664921465", "0.0", "0.6666666666666666"], ["51817", "Contemporanea", "0.04057591623036649", "0.0", "0.23861967694566813"], ["51818", "Gemelos", "0.04057591623036649", "0.0", "0.23861967694566813"], ["463975", "Vatler", "0.09424083769633508", "0.0", "0.9090909090909091"], ["485996", "MerIT", "0.002617801047120419", "0.0", "0.4444444444444444"], ["432752", "Clic Head", "0.0013089005235602095", "0.0", "1.0"], ["369269", "Quantifind", "0.003926701570680628", "0.0", "1.0"], ["141944", "Humin", "0.09424083769633508", "0.0", "0.9090909090909091"], ["432762", "Localprop", "0.0013089005235602095", "0.0", "1.0"], ["520830", "FG Angels Syndicate Fund III", "0.09424083769633508", "0.0", "0.9090909090909091"], ["129665", "Cordis Corporation", "0.007853403141361256", "0.0", "0.6071428571428572"], ["494210", "Trision", "0.014397905759162303", "956.0", "0.2006172839506173"], ["33411", "Motorola", "0.009162303664921465", "0.0", "0.1951951951951952"], ["43652", "Capgemini", "0.010471204188481676", "646.0", "0.17788724685276408"], ["146053", "Sony Computer Entertainment", "0.005235602094240838", "0.0", "0.1896149358226371"], ["144006", "MexicoDestinos", "0.04712041884816754", "0.0", "0.1912889935256033"], ["195210", "Sprig", "0.0013089005235602095", "0.0", "0.5151515151515151"], ["27275", "MySollars", "0.0013089005235602095", "0.0", "0.5714285714285714"], ["170638", "Incutex", "0.011780104712041885", "2227.333333333333", "0.19649334945586455"], ["25231", "Fanwards", "0.04057591623036649", "0.0", "0.23861967694566813"], ["64144", "Cupoint", "0.010471204188481676", "454.33333333333616", "0.2353367125271542"], ["133785", "Kloc", "0.005235602094240838", "0.0", "0.8333333333333334"], ["39579", "Citigroup", "0.017015706806282723", "4569.299999999996", "0.2531152647975078"], ["570014", "Simple Candidate", "0.0013089005235602095", "0.0", "0.6666666666666666"], ["31393", "Latinda", "0.0013089005235602095", "0.0", "1.0"], ["404131", "Obsequio", "0.002617801047120419", "0.0", "0.5063291139240506"], ["419953", "My Hall", "0.0013089005235602095", "0.0", "1.0"], ["539304", "Inputmobi", "0.006544502617801047", "4.0", "1.0"], ["41641", "Deloitte Consulting", "0.014397905759162303", "1284.0", "0.2038895859473024"], ["588461", "Wikimedia Argentina", "0.0013089005235602095", "0.0", "0.23214285714285715"], ["70318", "Schneider Electric", "0.0013089005235602095", "0.0", "1.0"], ["500399", "Digital Tape", "0.002617801047120419", "0.0", "1.0"], ["424051", "BuscoEstudiar.com", "0.015706806282722512", "0.0", "0.19987699876998768"], ["33848", "Amyris Biotechnologies", "0.006544502617801047", "0.0", "0.5862068965517242"], ["477880", "Mixmax", "0.002617801047120419", "0.0", "0.4375"], ["271033", "Gobierno de la Ciudad de Buenos Aires", "0.002617801047120419", "0.0", "1.0"], ["217789", "PAEZ", "0.006544502617801047", "0.0", "0.23247496423462088"], ["74431", "Oracle", "0.005235602094240838", "0.0", "0.21900269541778974"], ["498374", "Gesto", "0.0013089005235602095", "0.0", "1.0"], ["37575", "Yahoo", "0.0013089005235602095", "0.0", "1.0"], ["494283", "Jomofis", "0.003926701570680628", "0.0", "0.17876787678767878"], ["37586", "Unilever", "0.005235602094240838", "0.0", "0.24038461538461536"], ["357076", "Limbo Digital", "0.0013089005235602095", "0.0", "1.0"], ["355033", "Livedeos", "0.002617801047120419", "0.0", "1.0"], ["183002", "TheFanLeague", "0.003926701570680628", "160.5", "0.21900269541778974"], ["537308", "Flexsensing", "0.003926701570680628", "0.0", "0.22184300341296928"], ["221917", "Vorcu", "0.002617801047120419", "0.0", "1.0"], ["314079", "indie Producers Guild (iPG)", "0.0013089005235602095", "0.0", "1.0"], ["533218", "Passto", "0.014397905759162303", "646.0", "0.1698014629049112"], ["355043", "Three Rabbits Inc.", "0.002617801047120419", "0.0", "1.0"], ["355044", "Moviclips", "0.002617801047120419", "0.0", "1.0"], ["359142", "Koibanx", "0.005235602094240838", "1.0", "1.0"], ["359143", "Clarin Digital", "0.002617801047120419", "0.0", "1.0"], ["31465", "Scoutzie", "0.0013089005235602095", "0.0", "0.5555555555555556"], ["174832", "Nokter ", "0.002617801047120419", "0.0", "0.18005540166204986"], ["201460", "LandModa", "0.04712041884816754", "0.0", "0.1912889935256033"], ["183029", "Orion Labs", "0.09424083769633508", "0.0", "0.9090909090909091"], ["133879", "Space Systems/Loral", "0.0013089005235602095", "0.0", "0.5151515151515151"], ["371448", "Biomarin Pharmaceutical Inc", "0.02225130890052356", "109.0", "1.0"], ["70393", "Puerto Finanzas", "0.009162303664921465", "8.0", "0.7333333333333334"], ["533243", "Trocafone", "0.007853403141361256", "0.0", "0.5194805194805194"], ["594685", "Fundaci?n Lo Mejor de M?", "0.002617801047120419", "0.0", "0.14167393199651263"], ["183044", "Booking.com", "0.002617801047120419", "0.0", "0.4375"], ["37637", "Oracle Corporation", "0.002617801047120419", "0.0", "0.6666666666666666"], ["305281", "Mall4G", "0.005235602094240838", "0.0", "0.16472377090724785"], ["181001", "ICBC", "0.002617801047120419", "0.0", "1.0"], ["445210", "Praxair Inc.", "0.003926701570680628", "0.0", "0.5217391304347826"], ["235653", "Ocito", "0.002617801047120419", "0.0", "1.0"], ["37665", "McKinsey & Company", "0.01832460732984293", "385.1166666666684", "0.24109792284866471"], ["47910", "Genome Compiler", "0.09424083769633508", "0.0", "0.9090909090909091"], ["39719", "Canon", "0.0013089005235602095", "0.0", "0.5714285714285714"], ["445224", "Bab?", "0.002617801047120419", "0.0", "0.18005540166204986"], ["39722", "Meltwater Group", "0.005235602094240838", "0.0", "0.22663877266387727"], ["416557", "eRemarketing", "0.006544502617801047", "1.3333333333333333", "0.16480730223123732"], ["322013", "GearTranslations", "0.003926701570680628", "0.0", "0.5599999999999999"], ["37680", "Novell", "0.017015706806282723", "0.0", "1.0"], ["119602", "myNeeds", "0.0013089005235602095", "0.0", "1.0"], ["37684", "Visa", "0.0013089005235602095", "0.0", "0.6666666666666666"], ["416565", "Timefly", "0.04057591623036649", "0.0", "0.23861967694566813"], ["76599", "TICTAPPS", "0.0013089005235602095", "0.0", "1.0"], ["200500", "EntrenaYa", "0.04712041884816754", "0.0", "0.1912889935256033"], ["74554", "Oony", "0.010471204188481676", "0.0", "0.23705324580598106"], ["39741", "Level 3", "0.005235602094240838", "0.0", "0.16778523489932887"], ["37697", "Johnson Controls", "0.0013089005235602095", "0.0", "0.18851508120649652"], ["459587", "apleno.net", "0.0013089005235602095", "0.0", "1.0"], ["459590", "pymesenlaweb.com", "0.0013089005235602095", "0.0", "1.0"], ["37707", "Genentech", "0.006544502617801047", "0.0", "0.5862068965517242"], ["543569", "Pccounter", "0.005235602094240838", "0.0", "0.5833333333333334"], ["296419", "weetsale", "0.003926701570680628", "0.0", "1.0"], ["41812", "Verizon", "0.002617801047120419", "0.0", "0.21841397849462366"], ["444559", "Unisend Latinamerican Bitcoin Exchange", "0.003926701570680628", "0.0", "0.20236612702366127"], ["148325", "Skykick", "0.09424083769633508", "0.0", "0.9090909090909091"], ["52070", "Gameloft", "0.002617801047120419", "0.0", "1.0"], ["1124", "500 Startups", "0.04712041884816754", "0.0", "0.1912889935256033"], ["252779", "Personi.fi (now part of Collective Media)", "0.09424083769633508", "0.0", "0.9090909090909091"], ["324462", "invap", "0.003926701570680628", "0.0", "1.0"], ["504687", "RealRef", "0.005235602094240838", "0.0", "0.24038461538461536"], ["504693", "RealRef", "0.006544502617801047", "6666.0", "0.2443609022556391"], ["197501", "Compass", "0.09424083769633508", "0.0", "0.9090909090909091"], ["211844", "Cine+", "0.04712041884816754", "0.0", "0.1912889935256033"], ["88974", "Fiat Auto", "0.007853403141361256", "0.0", "1.0"], ["504719", "Siempre Atentos", "0.007853403141361256", "0.0", "1.0"], ["504722", "Picound", "0.007853403141361256", "0.0", "1.0"], ["504723", "Diproach", "0.007853403141361256", "0.0", "1.0"], ["504724", "Mooral", "0.007853403141361256", "0.0", "1.0"], ["504726", "Coasin", "0.007853403141361256", "0.0", "1.0"], ["256919", "Baazee (acquired by eBay)", "0.09424083769633508", "0.0", "0.9090909090909091"], ["51695", "www.Idea.me", "0.04057591623036649", "0.0", "0.23861967694566813"], ["37788", "Mercadolibre", "0.017015706806282723", "26360.828571428538", "0.30747398297067174"], ["400287", "Codealike", "0.010471204188481676", "39.0", "0.7857142857142857"], ["261029", "GoFiesta", "0.002617801047120419", "0.0", "1.0"], ["37798", "Inmac", "0.017015706806282723", "0.0", "1.0"], ["37799", "Serious Development", "0.017015706806282723", "0.0", "1.0"], ["37800", "Bravo! Marketing", "0.017015706806282723", "0.0", "1.0"], ["37801", "Icommerce", "0.017015706806282723", "0.0", "1.0"], ["37802", "Jacent Technologies", "0.017015706806282723", "0.0", "1.0"], ["37803", "Realm Systems", "0.017015706806282723", "0.0", "1.0"], ["598514", "CertiSur", "0.002617801047120419", "0.0", "0.2263231197771588"], ["37806", "Boston Scientific", "0.007853403141361256", "0.0", "0.6071428571428572"], ["218033", "Restorando", "0.10471204188481675", "296.33333333333326", "1.0"], ["215990", "Blue Shield of California", "0.002617801047120419", "0.0", "0.53125"], ["246711", "SpreadShout", "0.009162303664921465", "0.0", "0.2230610844200412"], ["355261", "EmprendING", "0.005235602094240838", "0.0", "0.2066115702479339"], ["136082", "Fligoo", "0.04057591623036649", "0.0", "0.23861967694566813"], ["365045", "InsideLang.com", "0.002617801047120419", "0.0", "1.0"], ["365046", "Tribalo.net", "0.002617801047120419", "0.0", "1.0"], ["531402", "Weesdom", "0.002617801047120419", "0.0", "0.2484709480122324"], ["89036", "Savannah College of Art and Design", "0.010471204188481676", "0.0", "0.16778523489932887"], ["191440", "Shovel apps, Inc.", "0.013089005235602094", "632.0", "0.2004935225169648"], ["240593", "Research Now", "0.005235602094240838", "0.0", "0.2066115702479339"], ["404435", "Vouch Financial", "0.09424083769633508", "0.0", "0.9090909090909091"], ["144198", "Walkmore", "0.09424083769633508", "0.0", "0.9090909090909091"], ["125912", "OKpanda", "0.003926701570680628", "0.0", "1.0"], ["60384", "A9.com", "0.007853403141361256", "0.0", "1.0"]]';
    $scope.json = JSON.parse(jtext);
    $scope.len = $scope.json.length;
    $scope.paginate = function (index) {
        $scope.pag = index;
        $scope.disableLeft = $scope.pag == 1;
        $scope.disableRight = $scope.pag == Math.floor(($scope.len / $scope.rows) + 1);
    };
    $scope.range = function (from, to) {
        var array = [];
        while (from <= to) {
            array.push(from);
            from++;
        }
        return array;
    };
    $scope.csv = function (name) {
        window.location = "http://localhost:63342/test-snap/src/output/" + name;
    };
    $scope.searchStartup = function () {
        $scope.showSearch = $scope.showSearch != true;
    };
    $scope.searchStartupByName = function () {

    }
}]);
