import { t } from 'ttag';

const EDUCATION_THEMES = [
  {
    name: () => t`Infrastructure`,
    id: 'INFRASTRUCTURE',
    content: [
      {
        name: 'Infrastructure (S2L2A)',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/96fbe0b8-a41d-4f4e-8e92-b79ae279ce45',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
    ],
    pins: [
      {
        title: 'Φάση εκσκαφών στο Αεροδρόμιο στα Καστέλι',
        lat: 35.17602,
        lng: 25.30258,
        zoom: 13,
        datasetId: 'S2L2A',
        layerId: '1-NATURAL-COLOR',
        visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/96fbe0b8-a41d-4f4e-8e92-b79ae279ce45',
        toTime: '2021-05-12',
        evalscript: '',
        evalscripturl: '',
        themeId: 'INFRASTRUCTURE-NORMAL-MODE',
        description:
          'Στη εικόνα απεικονίζεται η φάση των εκσκαφών στο νέο αεροδρόμιο Καστελίου τον Μάιο του 2021.',
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
        url: 'https://services.sentinel-hub.com/ogc/wms/96fbe0b8-a41d-4f4e-8e92-b79ae279ce45',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
    ],
    pins: [
      {
        title: 'Ιζηματοποίηση νερού και περιεκτικότητα σε χλωροφύλλη, στο φράγμα στη Σφενδύλη',
        lat: 35.24863,
        lng: 25.40614,
        zoom: 14,
        datasetId: 'S2L2A',
        layerId: '99_ULYSSYS-WATER-QUALITY-VIEWER',
        visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/96fbe0b8-a41d-4f4e-8e92-b79ae279ce45',
        toTime: '2021-05-12',
        evalscript: '',
        evalscripturl: '',
        themeId: 'OCEAN',
        description:
          'Ο αλγόριθμος Ulyssys Water Quality Viewer (UWQV) στοχεύει να απεικονίσει δυναμικά την περιεκτικότητα των υδάτινων σωμάτων σε χλωροφύλλη και ιζήματα, η οποία αποτελεί σημαντικό δείκτη της ποιότητας του νερού. Η περιεκτικότητα σε χλωροφύλλη απεικονίζεται με χρώματα από σκούρο μπλε (χαμηλή περιεκτικότητα σε χλωροφύλλη) έως πράσινο και κόκκινο (υψηλή περιεκτικότητα σε χλωροφύλλη). Οι συγκεντρώσεις ιζημάτων είναι χρώματος καφέ. Το σκούρο καφέ δείχνει υψηλή περιεκτικότητα σε ιζήματα.',
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
        url: 'https://services.sentinel-hub.com/ogc/wms/c9696dcf-b7da-4881-9e23-ad070fc3ce34',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
    ],
    pins: [
      {
        title: 'Απεικόνιση αστικών νησίδων πρασίνου στο Ηράκλειο',
        lat: 35.33935,
        lng: 25.13715,
        zoom: 14,
        datasetId: 'S2L2A',
        layerId: '4-GREEN-CITY',
        visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/c9696dcf-b7da-4881-9e23-ad070fc3ce34',
        toTime: '2021-05-12',
        evalscript: '',
        evalscripturl: '',
        themeId: 'URBAN',
        description:
          'Ο αλγόριθμος Green City στοχεύει στην ευαισθητοποίηση σχετικά με τις πράσινες περιοχές σε πόλεις σε όλο τον κόσμο. Συγκεκριμένα, λαμβάνει υπόψη τον κανονικοποιημένο δείκτη βλάστησης (NDVI) και τα πραγματικά μήκη κύματος χρώματος. Διαχωρίζει τις συσσωρευμένες περιοχές από τις βλαστημένες, καθιστώντας το χρήσιμο για τον εντοπισμό αστικών περιοχών. Οι χτισμένες περιοχές εμφανίζονται με γκρι χρώμα και η βλάστηση εμφανίζεται με πράσινο χρώμα.',
      },
      {
        title: 'Απεικόνιση αστικών νησίδων πρασίνου στα Χανιά',
        lat: 35.51204,
        lng: 24.02096,
        zoom: 15,
        datasetId: 'S2L2A',
        layerId: '4-GREEN-CITY',
        visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/c9696dcf-b7da-4881-9e23-ad070fc3ce34',
        toTime: '2021-05-05',
        evalscript: '',
        evalscripturl: '',
        themeId: 'URBAN',
        description:
          'Ο αλγόριθμος Green City στοχεύει στην ευαισθητοποίηση σχετικά με τις πράσινες περιοχές σε πόλεις σε όλο τον κόσμο. Συγκεκριμένα, λαμβάνει υπόψη τον κανονικοποιημένο δείκτη βλάστησης (NDVI) και τα πραγματικά μήκη κύματος χρώματος. Διαχωρίζει τις συσσωρευμένες περιοχές από τις βλαστημένες, καθιστώντας το χρήσιμο για τον εντοπισμό αστικών περιοχών. Οι χτισμένες περιοχές εμφανίζονται με γκρι χρώμα και η βλάστηση εμφανίζεται με πράσινο χρώμα.',
      },
    ],
  },
  {
    name: () => t`Floods and Droughts`,
    id: 'FLOODING',
    content: [
      {
        name: 'Humidity (S2L2A)',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/be9de139-9858-437d-bded-f60a6282b8fb',
        preselected: true,
      },
    ],
    pins: [
      {
        title: 'Στάθμη ύδατος',
        lat: 35.03836,
        lng: 25.6943,
        zoom: 14,
        datasetId: 'S2L2A',
        layerId: '1-TRUE-COLOR',
        visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/be9de139-9858-437d-bded-f60a6282b8fb',
        toTime: '2018-09-20',
        evalscript: '',
        evalscripturl: '',
        themeId: 'FLOODING-NORMAL-MODE',
        description:
          'Η πλέον πρόσφατη χαμηλότερη στάθμη ύδατος στο φράγμα των Μπραμιανών παρατηρήθηκε τον Σεπτέμβριο του 2018.',
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
        url: 'https://services.sentinel-hub.com/ogc/wms/b21370d0-bae0-4c0a-a4f1-3d587dfc5347',
        preselected: true,
      },
    ],
    pins: [
      {
        title: 'Φωτιά',
        lat: 35.29728,
        lng: 23.59949,
        zoom: 13,
        datasetId: 'S2L2A',
        layerId: '8-WILDFIRES',
        visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/b21370d0-bae0-4c0a-a4f1-3d587dfc5347',
        toTime: '2020-08-13',
        evalscript: '',
        evalscripturl: '',
        themeId: 'WILDFIRES-NORMAL-MODE',
        description:
          'Το καλοκαίρι του 2020, [εκδηλώθηκε φωτιά](https://www.iefimerida.gr/ellada/fotia-kriti-dyskoleyei-pyrosbestikis-kedrodasos) στα νοτιοδυτικά του Δήμου Κανδάνου- Σελίνου των Χανίων Κρήτης η φωτιά που ξέσπασε την Τετάρτη, που αναζωπυρώθηκε το πρωί της Πέμπτης.',
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
        url: 'https://services.sentinel-hub.com/ogc/wms/a6e88d37-72b0-408e-b75c-13f9488845d5',
      },
      {
        name: 'Sentinel-2 L1C',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/0f8098c8-44d0-4d8b-8f57-e70409d6f5f3',
        layersExclude: '/^B[0-9][0-9A]/i',
      },
      {
        name: 'Sentinel-2 L2A',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/6bd3b7fd-a398-483d-bd2f-230fea062bc0',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
      {
        name: 'Sentinel-3 SLSTR',
        service: 'WMS',
        url: 'https://creodias.sentinel-hub.com/ogc/wms/49af9d72-c431-4eb7-9b8b-079701bf78ac',
      },
      {
        name: 'Sentinel-3 OLCI',
        service: 'WMS',
        url: 'https://creodias.sentinel-hub.com/ogc/wms/548bb761-b499-4df0-9897-25876d9f69bd',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
      {
        name: 'Sentinel-5P',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/4f177c79-ea7c-4956-a5f9-2de953554e66',
      },
    ],
  },

  ...educationThemesDefaultMode,
];
