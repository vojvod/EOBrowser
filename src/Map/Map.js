import React from 'react';
import { Map as LeafletMap, Pane, LayersControl, GeoJSON, Marker, FeatureGroup } from 'react-leaflet';
import inside from 'turf-inside';
import { connect } from 'react-redux';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import store, { mainMapSlice, visualizationSlice } from '../store';
import 'leaflet/dist/leaflet.css';
import './Map.scss';
import L from 'leaflet';
import moment from 'moment';

import Controls from '../Controls/Controls';
import SearchBox from '../SearchBox/SearchBox';
import Tutorial from '../Tutorial/Tutorial';
import PreviewLayer from '../Tools/Results/PreviewLayer';
import LeafletControls from './LeafletControls/LeafletControls';
import AboutSHLinks from './AboutSHLinks/AboutSHLinks';
import SentinelHubLayerComponent from './plugins/sentinelhubLeafletLayer';
import GlTileLayer from './plugins/GlTileLayer';
import { baseLayers, overlayTileLayers } from './Layers';
import {
  getDatasetLabel,
  getDataSourceHandler,
} from '../Tools/SearchPanel/dataSourceHandlers/dataSourceHandlers';
import { getAppropriateAuthToken } from '../App';
import { constructErrorMessage } from '../utils';
import TimelapseAreaPreview from '../Controls/Timelapse/TimelapseAreaPreview';

import { DEFAULT_ZOOM_CONFIGURATION } from '../Tools/SearchPanel/dataSourceHandlers/DataSourceHandler';
import MaptilerLogo from './maptiler-logo-adaptive.svg';

const BASE_PANE_ID = 'baseMapPane';
const BASE_PANE_ZINDEX = 5;
const SENTINELHUB_LAYER_PANE_ID = 'sentinelhubPane';
const SENTINELHUB_LAYER_PANE_ZINDEX = 6;
const highlightedTileStyle = {
  weight: 2,
  color: '#57de71',
  opacity: 1,
  fillColor: '#57de71',
  fillOpacity: 0.3,
};
const DEFAULT_COMPARED_LAYERS_MAX_ZOOM = 25;
const DEFAULT_COMPARED_LAYERS_OVERZOOM = 0;

const { BaseLayer, Overlay } = LayersControl;
class Map extends React.Component {
  mapRef = undefined;
  progress = NProgress.configure({
    showSpinner: false,
    parent: `#map`,
  });

  updateViewport = viewport => {
    viewport.center = Object.values(L.latLng(...viewport.center).wrap());
    store.dispatch(mainMapSlice.actions.setViewport(viewport));
  };

  setBounds = ev => {
    store.dispatch(
      mainMapSlice.actions.setBounds({
        bounds: ev.target.getBounds(),
        pixelBounds: ev.target.getPixelBounds(),
      }),
    );
  };

  onPreviewClick = e => {
    const clickedPoint = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [e.latlng.lng, e.latlng.lat],
      },
    };
    const selectedTiles = this.props.query.allResults.filter(tile => inside(clickedPoint, tile));
    this.props.setSelectedTiles(selectedTiles);
  };

  getZoomConfiguration = datasetId => {
    try {
      const dataSourceHandler = getDataSourceHandler(datasetId);
      const zoomConfiguration = dataSourceHandler.getLeafletZoomConfig(datasetId);
      return zoomConfiguration ? zoomConfiguration : DEFAULT_ZOOM_CONFIGURATION;
    } catch (e) {
      // this catches a race condition where datasetId is not defined when rendering the component
      return DEFAULT_ZOOM_CONFIGURATION;
    }
  };

  onTileError = async error => {
    const message = await constructErrorMessage(error);
    store.dispatch(visualizationSlice.actions.setError(message));
  };

  onTileLoad = () => {
    const { error } = this.props;
    if (error) {
      store.dispatch(visualizationSlice.actions.setError(null));
    }
  };

  render() {
    const {
      lat,
      lng,
      zoom,
      mapBounds,
      datasetId,
      enabledOverlaysId,
      visibleOnMap,
      visualizationLayerId,
      visualizationUrl,
      authenticated,
      fromTime,
      toTime,
      customSelected,
      evalscript,
      evalscripturl,
      dataFusion,
      dataSourcesInitialized,
      selectedTabIndex,
      displayingTileGeometries,
      comparedLayers,
      comparedOpacity,
      comparedClipping,
      gainEffect,
      gammaEffect,
      redRangeEffect,
      greenRangeEffect,
      blueRangeEffect,
      redCurveEffect,
      greenCurveEffect,
      blueCurveEffect,
      minQa,
      upsampling,
      downsampling,
      selectedLanguage,
      auth,
      displayTimelapseAreaPreview,
    } = this.props;

    const zoomConfig = this.getZoomConfiguration(datasetId);

    const rbbox = process.env.REACT_APP_MAP_BBOX.split(',');

    return (
      <LeafletMap
        ref={el => (this.mapRef = el)}
        minZoom={process.env.REACT_APP_MAP_ZOOM}
        maxBounds={L.latLngBounds([
          [rbbox[1], rbbox[0]],
          [rbbox[3], rbbox[2]],
        ])}
        maxBoundsViscosity={1.0}
        onViewportChanged={this.updateViewport}
        center={process.env.REACT_APP_MAP_CENTER.split(',')}
        zoom={this.props.zoom}
        onMoveEnd={this.setBounds}
        whenReady={this.setBounds}
        zoomControl={false}
        attributionControl={false}
        scaleControl={false}
        fadeAnimation={false}
        id="map"
        onOverlayAdd={ev => {
          store.dispatch(mainMapSlice.actions.addOverlay(ev.layer.options.overlayTileLayerId));
          if (ev.layer.options.pane === SENTINELHUB_LAYER_PANE_ID) {
            store.dispatch(visualizationSlice.actions.setVisibleOnMap(true));
          }
        }}
        onOverlayRemove={ev => {
          store.dispatch(mainMapSlice.actions.removeOverlay(ev.layer.options.overlayTileLayerId));
          if (ev.layer.options.pane === SENTINELHUB_LAYER_PANE_ID) {
            store.dispatch(visualizationSlice.actions.setVisibleOnMap(false));
          }
        }}
      >
        <Pane name={BASE_PANE_ID} style={{ zIndex: BASE_PANE_ZINDEX }} />

        <LayersControl
          position="topright"
          sortLayers={true}
          sortFunction={(a, b) => {
            if (!this.mapRef) {
              return;
            }
            return (
              this.mapRef.leafletElement.getPane(a.options.pane).style.zIndex -
              this.mapRef.leafletElement.getPane(b.options.pane).style.zIndex
            );
          }}
        >
          {baseLayers.map(baseLayer => (
            <BaseLayer checked={baseLayer.checked} name={baseLayer.name} key={baseLayer.name}>
              <GlTileLayer
                style={baseLayer.url}
                accessToken={process.env.REACT_APP_MAPBOX_KEY}
                attribution={baseLayer.attribution}
                pane={BASE_PANE_ID}
                preserveDrawingBuffer={baseLayer.preserveDrawingBuffer}
              />
              )
            </BaseLayer>
          ))}

          <Pane name={SENTINELHUB_LAYER_PANE_ID} style={{ zIndex: SENTINELHUB_LAYER_PANE_ZINDEX }} />
          {authenticated &&
            dataSourcesInitialized &&
            selectedTabIndex === 2 &&
            (visualizationLayerId || customSelected) &&
            datasetId &&
            visualizationUrl && (
              <Overlay name={`${getDatasetLabel(datasetId)}`} checked={visibleOnMap}>
                <SentinelHubLayerComponent
                  datasetId={datasetId}
                  url={visualizationUrl}
                  layers={visualizationLayerId}
                  format="PNG"
                  fromTime={fromTime ? fromTime.toDate() : null}
                  toTime={toTime.toDate()}
                  customSelected={customSelected}
                  evalscript={evalscript}
                  evalscripturl={evalscripturl}
                  dataFusion={dataFusion}
                  pane={SENTINELHUB_LAYER_PANE_ID}
                  progress={this.progress}
                  minZoom={zoomConfig.min}
                  maxZoom={zoomConfig.max}
                  allowOverZoomBy={zoomConfig.allowOverZoomBy}
                  gainEffect={gainEffect}
                  gammaEffect={gammaEffect}
                  redRangeEffect={redRangeEffect}
                  greenRangeEffect={greenRangeEffect}
                  blueRangeEffect={blueRangeEffect}
                  redCurveEffect={redCurveEffect}
                  greenCurveEffect={greenCurveEffect}
                  blueCurveEffect={blueCurveEffect}
                  minQa={minQa}
                  upsampling={upsampling}
                  downsampling={downsampling}
                  onTileImageError={this.onTileError}
                  onTileImageLoad={this.onTileLoad}
                />
              </Overlay>
            )}

          {comparedLayers.length &&
            selectedTabIndex === 4 &&
            comparedLayers
              .slice()
              .reverse()
              .map((p, i) => {
                const {
                  fromTime,
                  toTime,
                  datasetId,
                  evalscript,
                  evalscripturl,
                  dataFusion,
                  visualizationUrl,
                  layerId,
                  gainEffect,
                  gammaEffect,
                  redRangeEffect,
                  greenRangeEffect,
                  blueRangeEffect,
                  redCurveEffect,
                  greenCurveEffect,
                  blueCurveEffect,
                  minQa,
                  upsampling,
                  downsampling,
                  themeId,
                } = p;
                const dsh = getDataSourceHandler(datasetId);
                const supportsTimeRange = dsh ? dsh.supportsTimeRange() : true; //We can only check if a datasetId is BYOC when the datasource handler for it is instantiated (thus, we are on the user instance which includes that BYOC collection), so we set default to `true` to cover other cases.
                let {
                  min: minZoom,
                  max: maxZoom = DEFAULT_COMPARED_LAYERS_MAX_ZOOM,
                  allowOverZoomBy = DEFAULT_COMPARED_LAYERS_OVERZOOM,
                } = this.getZoomConfiguration(datasetId);

                let pinTimeFrom, pinTimeTo;
                if (supportsTimeRange) {
                  if (fromTime) {
                    pinTimeFrom = moment.utc(fromTime).toDate();
                    pinTimeTo = moment.utc(toTime).toDate();
                  } else {
                    pinTimeFrom = moment
                      .utc(toTime)
                      .startOf('day')
                      .toDate();
                    pinTimeTo = moment
                      .utc(toTime)
                      .endOf('day')
                      .toDate();
                  }
                } else {
                  pinTimeTo = moment
                    .utc(toTime)
                    .endOf('day')
                    .toDate();
                }
                const index = comparedLayers.length - 1 - i;
                return (
                  <SentinelHubLayerComponent
                    key={i}
                    datasetId={datasetId}
                    url={evalscript || evalscripturl ? null : visualizationUrl}
                    layers={layerId}
                    format="PNG"
                    fromTime={pinTimeFrom}
                    toTime={pinTimeTo}
                    customSelected={!!(evalscript || evalscripturl)}
                    evalscript={evalscript}
                    evalscripturl={evalscripturl}
                    dataFusion={dataFusion}
                    minZoom={minZoom}
                    maxZoom={maxZoom}
                    allowOverZoomBy={allowOverZoomBy}
                    opacity={comparedOpacity[index]}
                    clipping={comparedClipping[index]}
                    gainEffect={gainEffect}
                    gammaEffect={gammaEffect}
                    redRangeEffect={redRangeEffect}
                    greenRangeEffect={greenRangeEffect}
                    blueRangeEffect={blueRangeEffect}
                    redCurveEffect={redCurveEffect}
                    greenCurveEffect={greenCurveEffect}
                    blueCurveEffect={blueCurveEffect}
                    minQa={minQa}
                    upsampling={upsampling}
                    downsampling={downsampling}
                    pane={SENTINELHUB_LAYER_PANE_ID}
                    progress={this.progress}
                    accessToken={getAppropriateAuthToken(auth, themeId)}
                    onTileImageError={this.onTileError}
                    onTileImageLoad={this.onTileLoad}
                  />
                );
              })}

          {overlayTileLayers().map(overlayTileLayer => (
            <Overlay
              name={overlayTileLayer.name}
              key={`${overlayTileLayer.id}-${this.props.selectedLanguage}`}
              checked={enabledOverlaysId.includes(overlayTileLayer.id)}
            >
              <Pane name={overlayTileLayer.pane} style={{ zIndex: overlayTileLayer.zIndex }}>
                <GlTileLayer
                  style={overlayTileLayer.url}
                  accessToken={process.env.REACT_APP_MAPBOX_KEY}
                  attribution={overlayTileLayer.attribution}
                  overlayTileLayerId={overlayTileLayer.id}
                  pane={overlayTileLayer.pane}
                  preserveDrawingBuffer={overlayTileLayer.preserveDrawingBuffer}
                />
              </Pane>
            </Overlay>
          ))}
        </LayersControl>

        <GeoJSON
          id="aoi-layer"
          data={this.props.aoiGeometry ? this.props.aoiGeometry : null}
          key={this.props.aoiLastEdited}
        />
        {!this.props.poiPosition ? null : <Marker id="poi-layer" position={this.props.poiPosition} />}

        {this.props.query && selectedTabIndex === 0 && displayingTileGeometries ? (
          <FeatureGroup onClick={this.onPreviewClick}>
            {this.props.query.allResults.map((tile, i) => (
              <PreviewLayer tile={tile} key={`preview-layer-${this.props.query.queryId}-${i}`} />
            ))}
          </FeatureGroup>
        ) : null}

        {this.props.highlightedTile ? (
          <GeoJSON data={this.props.highlightedTile.geometry} style={() => highlightedTileStyle} />
        ) : null}
        {displayTimelapseAreaPreview && selectedTabIndex === 2 && (
          <TimelapseAreaPreview lat={lat} lng={lng} zoom={zoom} mapBounds={mapBounds} />
        )}

        <LeafletControls key={selectedLanguage} />
        <SearchBox />
        <Tutorial selectedLanguage={this.props.selectedLanguage} />
        <Controls selectedLanguage={this.props.selectedLanguage} />

        <AboutSHLinks />
        <a href="https://www.maptiler.com/" target="_blank" rel="noopener noreferrer">
          <img className="maptiler-logo" src={MaptilerLogo} alt="" />
        </a>
      </LeafletMap>
    );
  }
}

const mapStoreToProps = store => {
  return {
    lat: store.mainMap.lat,
    lng: store.mainMap.lng,
    zoom: store.mainMap.zoom,
    mapBounds: store.mainMap.bounds,
    enabledOverlaysId: store.mainMap.enabledOverlaysId,
    aoiGeometry: store.aoi.geometry,
    aoiLastEdited: store.aoi.lastEdited,
    displayTimelapseAreaPreview: store.timelapse.displayTimelapseAreaPreview,
    poiPosition: store.poi.position,
    poiLastEdited: store.poi.lastEdited,
    datasetId: store.visualization.datasetId,
    visibleOnMap: store.visualization.visibleOnMap,
    visualizationLayerId: store.visualization.layerId,
    visualizationUrl: store.visualization.visualizationUrl,
    fromTime: store.visualization.fromTime,
    toTime: store.visualization.toTime,
    customSelected: store.visualization.customSelected,
    evalscript: store.visualization.evalscript,
    evalscripturl: store.visualization.evalscripturl,
    dataFusion: store.visualization.dataFusion,
    dataSourcesInitialized: store.themes.dataSourcesInitialized,
    selectedTabIndex: store.tabs.selectedTabIndex,
    selectedLanguage: store.language.selectedLanguage,
    gainEffect: store.visualization.gainEffect,
    gammaEffect: store.visualization.gammaEffect,
    redRangeEffect: store.visualization.redRangeEffect,
    greenRangeEffect: store.visualization.greenRangeEffect,
    blueRangeEffect: store.visualization.blueRangeEffect,
    redCurveEffect: store.visualization.redCurveEffect,
    greenCurveEffect: store.visualization.greenCurveEffect,
    blueCurveEffect: store.visualization.blueCurveEffect,
    minQa: store.visualization.minQa,
    upsampling: store.visualization.upsampling,
    downsampling: store.visualization.downsampling,
    error: store.visualization.error,
    comparedLayers: store.compare.comparedLayers,
    comparedOpacity: store.compare.comparedOpacity,
    comparedClipping: store.compare.comparedClipping,
    auth: store.auth,
  };
};

export default connect(mapStoreToProps, null)(Map);
