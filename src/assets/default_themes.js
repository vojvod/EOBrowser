import { t } from 'ttag';

const EDUCATION_THEMES = [
  {
    name: () => t`Agriculture`,
    id: 'AGRICULTURE',
    content: [
      {
        name: 'Agriculture (S2L2A)',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/4bdf28a3-6166-46ca-9fc2-09b2ad1ee622',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
    ],
    pins: [
      {
        title: 'Δείκτης βλάστησης',
        lat: 38.62595,
        lng: 21.33881,
        zoom: 14,
        datasetId: 'S2L2A',
        layerId: '5-NDVI',
        visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/4bdf28a3-6166-46ca-9fc2-09b2ad1ee622',
        toTime: '2021-05-28',
        evalscript: '',
        evalscripturl: '',
        themeId: 'AGRICULTURE',
        description:
          'Ο κανονικοποιημένος δείκτης βλάστησης είναι ένας απλός, αλλά αποτελεσματικός δείκτης για τον ποσοτικό προσδιορισμό της πράσινης βλάστησης. Είναι ένα μέτρο της κατάστασης της βλάστησης που βασίζεται στον τρόπο με τον οποίο τα φυτά αντανακλούν το φως σε ορισμένα μήκη κύματος. Το εύρος τιμών του NDVI είναι -1 έως 1. Οι αρνητικές τιμές του NDVI (τιμές που πλησιάζουν στο -1) αντιστοιχούν στο νερό. Οι τιμές κοντά στο μηδέν (-0,1 έως 0,1) αντιστοιχούν γενικά σε άγονες περιοχές, με στοιχεία βράχων, άμμου ή χιονιού. Οι χαμηλές, θετικές τιμές αντιπροσωπεύουν θάμνους και λιβάδια (περίπου 0,2 έως 0,4), ενώ οι υψηλές τιμές υποδεικνύουν την ύπαρξη εύκρατων και τροπικών δασών (τιμές πλησιάζουν το 1).',
      },
      {
        title: 'Δείκτης υγρασίας',
        lat: 38.62578,
        lng: 21.33617,
        zoom: 14,
        datasetId: 'S2L2A',
        layerId: '2-NDMI',
        visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/4bdf28a3-6166-46ca-9fc2-09b2ad1ee622',
        toTime: '2021-05-28',
        evalscript: '',
        evalscripturl: '',
        themeId: 'AGRICULTURE',
        description:
          'Ο κανονικοποιημένος δείκτης υγρασίας (NDMI) χρησιμοποιείται για τον προσδιορισμό της περιεκτικότητας σε νερό και την παρακολούθηση της ξηρασίας. Το εύρος τιμών του NDMI είναι -1 έως 1. Οι αρνητικές τιμές του NDMI (τιμές που πλησιάζουν στο -1) αντιστοιχούν σε άγονο έδαφος. Οι τιμές γύρω στο μηδέν (-0,2 έως 0,4) αντιστοιχούν γενικά στην έλλειψη νερού. Υψηλές, θετικές τιμές αντιπροσωπεύουν υψηλή κομοστέγη με επάρκεια νερού (περίπου 0,4 έως 1).',
      },
    ],
  },
  {
    name: () => t`Floods`,
    id: 'FLOODING',
    content: [
      {
        name: 'Humidity (S2L2A)',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/c58f0686-bec8-4b0d-abb1-85320a92a224',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
    ],
    pins: [
      {
        title: 'Πλημμυρισμένες εκτάσεις μετά από έντονες βροχοπτώσεις',
        lat: 38.58241,
        lng: 21.30697,
        zoom: 14,
        datasetId: 'S2L2A',
        layerId: '2-COLOR-INFRARED',
        visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/c58f0686-bec8-4b0d-abb1-85320a92a224',
        toTime: '2021-01-28',
        evalscript: '',
        evalscripturl: '',
        themeId: 'FLOODING-NORMAL-MODE',
        description:
          'Το ψευδο-έγχρωμο σύνθετο συνήθως χρησιμοποιείται για την εκτίμηση της πυκνότητας και της υγείας των φυτών, καθώς τα φυτά αντανακλούν κοντά στο υπέρυθρο και πράσινο φως, ενώ απορροφούν το κόκκινο. Οι πόλεις και το έδαφος εμφανίζονται γκρι ή μαύρα και το νερό εμφανίζεται στην περίπτωση αυτή στις 28-1-2021 μπλε μετά από έντονες βροχοπτώσεις, απεικονίζοντας πλημμυρισμένες εκτάσεις.',
      },
    ],
  },
  {
    name: () => t`Water Quality`,
    id: 'OCEAN',
    content: [
      {
        name: 'OCEAN (S2L2A)',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/c58f0686-bec8-4b0d-abb1-85320a92a224',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
    ],
    pins: [
      {
        title: 'Περιεκτικότητα των υδάτινων σωμάτων σε συγκεντρώσεις ιζημάτων',
        lat: 38.58285,
        lng: 21.37967,
        zoom: 11,
        datasetId: 'S2L2A',
        layerId: '99_ULYSSYS-WATER-QUALITY-VIEWER',
        visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/c58f0686-bec8-4b0d-abb1-85320a92a224',
        toTime: '2021-01-28',
        evalscript: '',
        evalscripturl: '',
        themeId: 'OCEAN',
        description:
          'Ο αλγόριθμος απεικονίζει την περιεκτικότητα των υδάτινων σωμάτων σε συγκεντρώσεις ιζημάτων χρώματος καφέ στις 28-1-2021 μετά από έντονες βροχοπτώσεις.',
      },
    ],
  },
  {
    name: () => t`Green urban islands`,
    id: 'URBAN',
    content: [
      {
        name: 'URBAN (S2L2A)',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/31509a64-7d4a-429c-a1fd-222b0a24693fe',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
    ],
    pins: [
      {
        title: 'Απεικόνιση αστικών νησίδων πρασίνου στο Αγρίνιο',
        lat: 38.62545,
        lng: 21.39912,
        zoom: 14,
        datasetId: 'S2L2A',
        layerId: '4-GREEN-CITY',
        visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/31509a64-7d4a-429c-a1fd-222b0a24693fe',
        toTime: '2021-05-28',
        evalscript: '',
        evalscripturl: '',
        themeId: 'URBAN',
        description:
          'Ο αλγόριθμος Green City στοχεύει στην ευαισθητοποίηση σχετικά με τις πράσινες περιοχές σε πόλεις σε όλο τον κόσμο. Συγκεκριμένα, λαμβάνει υπόψη τον κανονικοποιημένο δείκτη βλάστησης (NDVI) και τα πραγματικά μήκη κύματος χρώματος. Διαχωρίζει τις συσσωρευμένες περιοχές από τις βλαστημένες, καθιστώντας το χρήσιμο για τον εντοπισμό αστικών περιοχών. Οι χτισμένες περιοχές εμφανίζονται με γκρι χρώμα και η βλάστηση εμφανίζεται με πράσινο χρώμα.',
      },
    ],
  },
  {
    name: () => t`Wildfires`,
    id: 'WILDFIRES',
    content: [
      {
        name: 'Wildfires (S2L2A)',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/5846bffb-0a47-4ba2-9e13-16d27dcf008c',
        preselected: true,
      },
    ],
    pins: [
      {
        title: 'Φωτιά στα Σκουτερά Αγρινίου',
        lat: 38.69636,
        lng: 21.44617,
        zoom: 13,
        datasetId: 'S2L2A',
        layerId: '2-FALSE-COLOR',
        visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/5846bffb-0a47-4ba2-9e13-16d27dcf008c',
        toTime: '2019-09-16',
        evalscript: '',
        evalscripturl: '',
        themeId: 'WILDFIRES-NORMAL-MODE',
        description:
          'O αλγόριθμος χρησιμοποιείται για τον εντοπισμό περιοχής στα Σκουτερά Αγρινίου που κάηκε στις 6-9-2019. Τα κόκκινα εικονοστοιχεία απεικονίζουν καμένες περιοχές και όλα τα άλλα εικονοστοιχεία απεικονίζονται σε φυσικό χρώμα.',
      },
    ],
  },
];

const educationThemesDefaultMode = EDUCATION_THEMES.map(t => {
  const normalModePostfix = '-NORMAL-MODE';
  const eduThemeNormalMode = { ...t, id: `${t.id}${normalModePostfix}` };
  if (t.pins) {
    eduThemeNormalMode.pins = t.pins.map(p => ({ ...p, themeId: `${p.themeId}${normalModePostfix}` }));
  }
  return eduThemeNormalMode;
});

export const DEFAULT_THEMES = [
  {
    name: () => t`Default`,
    id: 'DEFAULT-THEME',
    content: [
      {
        name: 'Sentinel-1',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/8f4883a1-c43b-4db1-ae4f-f5f5712e7c69',
      },
      {
        name: 'Sentinel-2 L1C',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/6e15791f-fd29-4994-bc3f-9b517e3c3dc7',
        layersExclude: '/^B[0-9][0-9A]/i',
      },
      {
        name: 'Sentinel-2 L2A',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/c58f0686-bec8-4b0d-abb1-85320a92a224',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
      {
        name: 'Sentinel-3 SLSTR',
        service: 'WMS',
        url: 'https://creodias.sentinel-hub.com/ogc/wms/fd060cc9-9c3f-4180-98fa-ebc38805bb5e',
      },
      {
        name: 'Sentinel-3 OLCI',
        service: 'WMS',
        url: 'https://creodias.sentinel-hub.com/ogc/wms/546bb16e-62bd-4a3b-aaaa-96af06e1b85e',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
      {
        name: 'Sentinel-5P',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/62e022d2-0266-4449-bbb9-c346abb48eca',
      },
    ],
  },

  ...educationThemesDefaultMode,
];
