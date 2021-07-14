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
    pins: [{
      title: 'Πρέβελη',
      lat: 35.1550,
      lng: 24.48848,
      zoom: 15,
      datasetId: 'S2L2A',
      layerId: '2-FALSE-COLOR',
      visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/b21370d0-bae0-4c0a-a4f1-3d587dfc5347',
      toTime: '2021-07-11',
      evalscript: '',
      evalscripturl: '',
      themeId: 'WILDFIRES-NORMAL-MODE',
      description: 'Φωτιά ξέσπασε την Τετάρτη 7 Ιουλίου 2021 στην Πρέβελη, στο Ρέθυμνο της Κρήτης, η οποία απείλησε το φοινικόδασος στην περιοχή.',
    },{
        title: 'Κακοδίκι Χανίων',
        lat: 35.29257,
        lng: 23.70245,
        zoom: 15,
        datasetId: 'S2L2A',
        layerId: '2-FALSE-COLOR',
        visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/b21370d0-bae0-4c0a-a4f1-3d587dfc5347',
        toTime: '2021-07-04',
        evalscript: '',
        evalscripturl: '',
        themeId: 'WILDFIRES-NORMAL-MODE',
        description: 'Φωτιά στο Κακοδίκι του δήμου Καντάνου-Σελίνου στις 1.7.21',
      },
      {
        title: 'Γούρνες Ηρακλείου',
        lat: 35.30676,
        lng: 25.28988,
        zoom: 15,
        datasetId: 'S2L2A',
        layerId: '2-FALSE-COLOR',
        visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/b21370d0-bae0-4c0a-a4f1-3d587dfc5347',
        toTime: '2021-07-01',
        evalscript: '',
        evalscripturl: '',
        themeId: 'WILDFIRES-NORMAL-MODE',
        description: 'Φωτιά στις Γούρνες Ηρακλείου στις 26.6.21',
      },
      {
        title: 'Μαρωνία Σητείας',
        lat: 35.14187,
        lng: 26.0633,
        zoom: 15,
        datasetId: 'S2L2A',
        layerId: '2-FALSE-COLOR',
        visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/b21370d0-bae0-4c0a-a4f1-3d587dfc5347',
        toTime: '2021-07-01',
        evalscript: '',
        evalscripturl: '',
        themeId: 'WILDFIRES-NORMAL-MODE',
        description: 'Φωτιά στη Μαρωνία Σητείας  στις 1.7.21',
      },
      {
        title: 'Γεράκι',
        lat: 35.1267,
        lng: 25.4123,
        zoom: 15,
        datasetId: 'S2L2A',
        layerId: '2-FALSE-COLOR',
        visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/b21370d0-bae0-4c0a-a4f1-3d587dfc5347',
        toTime: '2021-07-01',
        evalscript: '',
        evalscripturl: '',
        themeId: 'WILDFIRES-NORMAL-MODE',
        description: 'Φωτιά στο Γεράκι  στις 1.7.21',
      },
      {
        title: 'Ασίτες Ηρακλείου',
        lat: 35.18578,
        lng: 24.97742,
        zoom: 15,
        datasetId: 'S2L2A',
        layerId: '2-FALSE-COLOR',
        visualizationUrl: 'https://services.sentinel-hub.com/ogc/wms/b21370d0-bae0-4c0a-a4f1-3d587dfc5347',
        toTime: '2021-07-01',
        evalscript: '',
        evalscripturl: '',
        themeId: 'WILDFIRES-NORMAL-MODE',
        description: 'Φωτιά στους Ασίτες  στις 1.7.21',
      },
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
        url: 'https://services.sentinel-hub.com/ogc/wms/86b9d36d-2445-421f-972f-d11e59b4c671',
      },
      // {
      //   name: 'Sentinel-1 AWS EW HH+HV',
      //   service: 'WMS',
      //   url: 'https://services.sentinel-hub.com/ogc/wms/694b409a-e12b-4922-8d51-c28dc12c8474',
      // },
      // {
      //   name: 'Sentinel-1 AWS IW VV',
      //   service: 'WMS',
      //   url: 'https://services.sentinel-hub.com/ogc/wms/11888584-b337-4287-b65e-208b80fd779b',
      // },
      // {
      //   name: 'Sentinel-1 AWS IW VV+VH',
      //   service: 'WMS',
      //   url: 'https://services.sentinel-hub.com/ogc/wms/f2068f4f-3c75-42cf-84a1-42948340a846',
      // },

      {
        name: 'Sentinel-2 L1C',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/348d603d-5ee8-48e5-9931-14cf6e3ddea0',
        layersExclude: '/^B[0-9][0-9A]/i',
      },
      {
        name: 'Sentinel-2 L2A',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/96fbe0b8-a41d-4f4e-8e92-b79ae279ce45',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
      {
        name: 'Sentinel-3 SLSTR',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/b0be9d8e-03a5-4e68-a93a-ca3d256d4bfb',
      },
      {
        name: 'Sentinel-3 OLCI',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/a5041dce-64b5-4b02-80c9-2538a710a1d4',
        preselected: true,
        layersExclude: '/^B[0-9][0-9A]/i',
      },
      {
        name: 'Sentinel-5P',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/5c7795bd-7b58-4dc5-a659-e2d9db32e9b6',
      },
      {
        name: 'Εμπορικά δεδομένα Υψηλής Ανάλυσης',
        service: 'WMS',
        url: 'https://services.sentinel-hub.com/ogc/wms/af788f6d-92c8-4f1d-894f-d828c436a85b',
      },
      // {
      //   name: 'Landsat 8 USGS',
      //   service: 'WMS',
      //   url: 'https://services.sentinel-hub.com/ogc/wms/ca5c8dc4-258e-490c-bf64-ff3498057368',
      //   preselected: true,
      //   layersExclude: '/^B[0-9][0-9A]/i',
      // },
      // {
      //   name: 'MODIS',
      //   service: 'WMS',
      //   url: 'https://services.sentinel-hub.com/ogc/wms/b719a6ad-d135-42df-bf7c-f794b2d99b4c',
      //   layersExclude: '/^B[0-9][0-9A]/i',
      // },
      // {
      //   name: 'DEM MAPZEN_EU',
      //   service: 'WMS',
      //   url: 'https://services.sentinel-hub.com/ogc/wms/7ffc45f2-61f3-4c4d-b7eb-13cce1633d81',
      //   preselected: true,
      // },
      // {
      //   name: 'DEM COPERNICUS_30',
      //   service: 'WMS',
      //   url: 'https://services.sentinel-hub.com/ogc/wms/6448ffd0-56c5-4601-bed7-242bf75d97db',
      // },
      // {
      //   name: 'DEM COPERNICUS_90',
      //   service: 'WMS',
      //   url: 'https://services.sentinel-hub.com/ogc/wms/bdf8d9c4-bebe-4002-8252-bd4b3f06d76a',
      // },
      // {
      //   name: 'CORINE Land Cover',
      //   url: 'https://creodias.sentinel-hub.com/ogc/wms/5da777d3-e322-468c-b7b5-4c90437d9946',
      // },
      // {
      //   name: 'Global Land Cover',
      //   url: 'https://creodias.sentinel-hub.com/ogc/wms/968dcdec-a419-4894-bba2-0b21670b8a22',
      // },
      // {
      //   name: 'Water Bodies',
      //   url: 'https://creodias.sentinel-hub.com/ogc/wms/6630abc2-b00c-46af-b2cd-2fcb8574ff2e',
      // },
    ],
  },

  ...educationThemesDefaultMode,
];
