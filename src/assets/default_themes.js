import { t } from 'ttag';

const EDUCATION_THEMES = [
  {
    name: () => t`Agriculture`,
    id: 'AGRICULTURE',
    content: [
      {
        name: 'Agriculture (S2L2A)',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/443891d9-6744-40f8-a832-56227d581205',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
    ],
    pins: [
      // {
      //   title: 'Δείκτης βλάστησης',
      //   lat: 38.62595,
      //   lng: 21.33881,
      //   zoom: 14,
      //   datasetId: 'S2L2A',
      //   layerId: '5-NDVI',
      //   visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/443891d9-6744-40f8-a832-56227d581205',
      //   toTime: '2021-05-28',
      //   evalscript: '',
      //   evalscripturl: '',
      //   themeId: 'AGRICULTURE',
      //   description:
      //     'Ο κανονικοποιημένος δείκτης βλάστησης είναι ένας απλός, αλλά αποτελεσματικός δείκτης για τον ποσοτικό προσδιορισμό της πράσινης βλάστησης. Είναι ένα μέτρο της κατάστασης της βλάστησης που βασίζεται στον τρόπο με τον οποίο τα φυτά αντανακλούν το φως σε ορισμένα μήκη κύματος. Το εύρος τιμών του NDVI είναι -1 έως 1. Οι αρνητικές τιμές του NDVI (τιμές που πλησιάζουν στο -1) αντιστοιχούν στο νερό. Οι τιμές κοντά στο μηδέν (-0,1 έως 0,1) αντιστοιχούν γενικά σε άγονες περιοχές, με στοιχεία βράχων, άμμου ή χιονιού. Οι χαμηλές, θετικές τιμές αντιπροσωπεύουν θάμνους και λιβάδια (περίπου 0,2 έως 0,4), ενώ οι υψηλές τιμές υποδεικνύουν την ύπαρξη εύκρατων και τροπικών δασών (τιμές πλησιάζουν το 1).',
      // },
      // {
      //   title: 'Δείκτης υγρασίας',
      //   lat: 38.62578,
      //   lng: 21.33617,
      //   zoom: 14,
      //   datasetId: 'S2L2A',
      //   layerId: '2-NDMI',
      //   visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/443891d9-6744-40f8-a832-56227d581205',
      //   toTime: '2021-05-28',
      //   evalscript: '',
      //   evalscripturl: '',
      //   themeId: 'AGRICULTURE',
      //   description:
      //     'Ο κανονικοποιημένος δείκτης υγρασίας (NDMI) χρησιμοποιείται για τον προσδιορισμό της περιεκτικότητας σε νερό και την παρακολούθηση της ξηρασίας. Το εύρος τιμών του NDMI είναι -1 έως 1. Οι αρνητικές τιμές του NDMI (τιμές που πλησιάζουν στο -1) αντιστοιχούν σε άγονο έδαφος. Οι τιμές γύρω στο μηδέν (-0,2 έως 0,4) αντιστοιχούν γενικά στην έλλειψη νερού. Υψηλές, θετικές τιμές αντιπροσωπεύουν υψηλή κομοστέγη με επάρκεια νερού (περίπου 0,4 έως 1).',
      // },
    ],
  },
  {
    name: () => t`Floods`,
    id: 'FLOODING',
    content: [
      {
        name: 'Humidity (S2L2A)',
        service: 'WMS',
        // url: 'https://services.sentinel-hub.com/ogc/wms/e69541cf-65a0-4037-a684-69b857e1b152',
        url: 'https://services.sentinel-hub.com/ogc/wms/9d0a0746-16e4-488c-852f-481f7aa8f6bc',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
    ],
    pins: [
      // {
      //   title: 'Πλημμυρισμένες εκτάσεις μετά από έντονες βροχοπτώσεις',
      //   lat: 38.58241,
      //   lng: 21.30697,
      //   zoom: 14,
      //   datasetId: 'S2L2A',
      //   layerId: '2-COLOR-INFRARED',
      //   visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/e69541cf-65a0-4037-a684-69b857e1b152',
      //   toTime: '2021-01-28',
      //   evalscript: '',
      //   evalscripturl: '',
      //   themeId: 'FLOODING-NORMAL-MODE',
      //   description:
      //     'Το ψευδο-έγχρωμο σύνθετο συνήθως χρησιμοποιείται για την εκτίμηση της πυκνότητας και της υγείας των φυτών, καθώς τα φυτά αντανακλούν κοντά στο υπέρυθρο και πράσινο φως, ενώ απορροφούν το κόκκινο. Οι πόλεις και το έδαφος εμφανίζονται γκρι ή μαύρα και το νερό εμφανίζεται στην περίπτωση αυτή στις 28-1-2021 μπλε μετά από έντονες βροχοπτώσεις, απεικονίζοντας πλημμυρισμένες εκτάσεις.',
      // },
    ],
  },
  {
    name: () => t`Water Quality`,
    id: 'OCEAN',
    content: [
      {
        name: 'OCEAN (S2L2A)',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/443891d9-6744-40f8-a832-56227d581205',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
    ],
    pins: [
      // {
      //   title: 'Περιεκτικότητα των υδάτινων σωμάτων σε συγκεντρώσεις ιζημάτων',
      //   lat: 38.58285,
      //   lng: 21.37967,
      //   zoom: 11,
      //   datasetId: 'S2L2A',
      //   layerId: '99_ULYSSYS-WATER-QUALITY-VIEWER',
      //   visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/443891d9-6744-40f8-a832-56227d581205',
      //   toTime: '2021-01-28',
      //   evalscript: '',
      //   evalscripturl: '',
      //   themeId: 'OCEAN',
      //   description:
      //     'Ο αλγόριθμος απεικονίζει την περιεκτικότητα των υδάτινων σωμάτων σε συγκεντρώσεις ιζημάτων χρώματος καφέ στις 28-1-2021 μετά από έντονες βροχοπτώσεις.',
      // },
    ],
  },
  {
    name: () => t`Green urban islands`,
    id: 'URBAN',
    content: [
      {
        name: 'URBAN (S2L2A)',
        service: 'WMS',
        // url: 'https://services.sentinel-hub.com/ogc/wms/37cd79b1-727b-4122-ba02-acbe7349478f',
        url: 'https://services.sentinel-hub.com/ogc/wms/b13731b5-7ecf-47d9-88f6-eeff3b2de008',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
    ],
    pins: [
      // {
      //   title: 'Απεικόνιση αστικών νησίδων πρασίνου στο Αγρίνιο',
      //   lat: 38.62545,
      //   lng: 21.39912,
      //   zoom: 14,
      //   datasetId: 'S2L2A',
      //   layerId: '4-GREEN-CITY',
      //   visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/37cd79b1-727b-4122-ba02-acbe7349478f',
      //   toTime: '2021-05-28',
      //   evalscript: '',
      //   evalscripturl: '',
      //   themeId: 'URBAN',
      //   description:
      //     'Ο αλγόριθμος Green City στοχεύει στην ευαισθητοποίηση σχετικά με τις πράσινες περιοχές σε πόλεις σε όλο τον κόσμο. Συγκεκριμένα, λαμβάνει υπόψη τον κανονικοποιημένο δείκτη βλάστησης (NDVI) και τα πραγματικά μήκη κύματος χρώματος. Διαχωρίζει τις συσσωρευμένες περιοχές από τις βλαστημένες, καθιστώντας το χρήσιμο για τον εντοπισμό αστικών περιοχών. Οι χτισμένες περιοχές εμφανίζονται με γκρι χρώμα και η βλάστηση εμφανίζεται με πράσινο χρώμα.',
      // },
    ],
  },
  {
    name: () => t`Wildfires`,
    id: 'WILDFIRES',
    content: [
      {
        name: 'Wildfires (S2L2A)',
        service: 'WMS',
        // url: 'https://services.sentinel-hub.com/ogc/wms/ba455c71-5a0e-4124-a0fc-3a981c6cf65f',
        url: 'https://services.sentinel-hub.com/ogc/wms/c1ad7e18-3602-45dc-a291-46936aa85271',
        preselected: true,
      },
    ],
    pins: [
      // {
      //   title: 'Φωτιά στα Σκουτερά Αγρινίου',
      //   lat: 38.69636,
      //   lng: 21.44617,
      //   zoom: 13,
      //   datasetId: 'S2L2A',
      //   layerId: '2-FALSE-COLOR',
      //   visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/ba455c71-5a0e-4124-a0fc-3a981c6cf65f',
      //   toTime: '2019-09-16',
      //   evalscript: '',
      //   evalscripturl: '',
      //   themeId: 'WILDFIRES-NORMAL-MODE',
      //   description:
      //     'O αλγόριθμος χρησιμοποιείται για τον εντοπισμό περιοχής στα Σκουτερά Αγρινίου που κάηκε στις 6-9-2019. Τα κόκκινα εικονοστοιχεία απεικονίζουν καμένες περιοχές και όλα τα άλλα εικονοστοιχεία απεικονίζονται σε φυσικό χρώμα.',
      // },
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
        // url: 'https://services.sentinel-hub.com/ogc/wms/e9ee54a8-9fba-4c4c-9bb5-be7463ee28a0',
        url: 'https://services.sentinel-hub.com/ogc/wms/4cdd0ec5-3437-4515-8805-64cea6f9173e',
      },
      {
        name: 'Sentinel-2 L1C',
        service: 'WMS',
        // url: 'https://services.sentinel-hub.com/ogc/wms/ef181763-3770-4ceb-9755-0a8d25703c96',
        url: 'https://services.sentinel-hub.com/ogc/wms/4601c6d1-0af6-4bd4-be7b-06325918c732',
        layersExclude: '/^B[0-9][0-9A]/i',
      },
      {
        name: 'Sentinel-2 L2A',
        service: 'WMS',
        // url: 'https://services.sentinel-hub.com/ogc/wms/4c0a2195-be2e-4c2e-b39b-84237752c905',
        url: 'https://services.sentinel-hub.com/ogc/wms/443891d9-6744-40f8-a832-56227d581205',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
      {
        name: 'Sentinel-3 SLSTR',
        service: 'WMS',
        // url: 'https://creodias.sentinel-hub.com/ogc/wms/2a72384b-69c5-446d-ad4b-f4bb29cec2ba',
        url: 'https://creodias.sentinel-hub.com/ogc/wms/30b191ab-1ac9-4181-89fe-6fecca5c3750',
      },
      {
        name: 'Sentinel-3 OLCI',
        service: 'WMS',
        // url: 'https://creodias.sentinel-hub.com/ogc/wms/408aa61d-e3c6-4cb2-9c99-f65dd7fe6c6d',
        url: 'https://creodias.sentinel-hub.com/ogc/wms/6c698484-29ee-4541-82c5-82dcfd6e97a4',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
      {
        name: 'Sentinel-5P',
        service: 'WMS',
        // url: 'https://services.sentinel-hub.com/ogc/wms/d72c9d9f-87bb-455d-9dd4-f68eb1f2c5c4',
        url: 'https://services.sentinel-hub.com/ogc/wms/76aca887-14ac-40b3-ba67-478d2096ffea',
      },
    ],
  },

  ...educationThemesDefaultMode,
];
