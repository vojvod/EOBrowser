import { connect } from 'react-redux';
import cloneDeep from 'lodash.clonedeep';
import dragula from 'react-dragula';
import moment from 'moment';
import React, { Component } from 'react';
import { t, ngettext, msgid } from 'ttag';

import { EOBButton } from '../../junk/EOBCommon/EOBButton/EOBButton';
import { NotificationPanel } from '../../junk/NotificationPanel/NotificationPanel';
import Pin from './Pin';
import PinTools from './PinTools';
import UpdatingStatus from './UpdatingStatus';
import { constructEffectsFromPinOrHighlight } from '../../utils/effectsUtils';

import store, {
  mainMapSlice,
  modalSlice,
  notificationSlice,
  pinsSlice,
  themesSlice,
  visualizationSlice,
  terrainViewerSlice,
} from '../../store';

import { getDataSourceHandler } from '../SearchPanel/dataSourceHandlers/dataSourceHandlers';
import {
  getPinsFromServer,
  getPinsFromSessionStorage,
  removePinsFromServer,
  savePinsToServer,
  savePinsToSessionStorage,
} from './Pin.utils';
import { parsePosition } from '../../utils';

import 'react-dragula/dist/dragula.min.css';
import './Pins.scss';

import {
  DEFAULT_MODE,
  MODES,
  MODE_THEMES_LIST,
  URL_THEMES_LIST,
  USER_INSTANCES_THEMES_LIST,
} from '../../const';
import { ModalId } from '../../Modals/Consts';

const PINS_LC_NAME = 'eob-pins';
const UNSAVED_PINS = 'unsaved-pins';
const SAVED_PINS = 'saved-pins';
const OPERATION_SHARE = 'share';

class PinPanel extends Component {
  state = {
    operation: null, // "preview" operation by default
    selectedPins: [],
    sharePins: false,
    updatingPins: false,
    updatingPinsError: null,
  };

  componentDidMount() {
    if (this.props.user) {
      this.fetchUserPins()
        .then(pins => {
          this.setPinsInArray(pins, SAVED_PINS);
          this.setState({
            operation: null,
            selectedPins: [],
            sharePins: false,
            updatingPins: false,
            updatingPinsError: null,
          });
        })
        .catch(() => {});
    } else {
      let pins = getPinsFromSessionStorage();
      this.setPinsInArray(pins, UNSAVED_PINS);
    }
  }

  deleteUserPins = async pinIds => {
    this.setState({
      updatingPins: true,
      updatingPinsError: null,
    });
    try {
      await removePinsFromServer(pinIds);
    } catch (e) {
      this.setState({
        updatingPinsError: e.message,
      });
      throw e;
    } finally {
      this.setState({
        updatingPins: false,
      });
    }
  };

  fetchUserPins = async () => {
    this.setState({
      updatingPins: true,
      updatingPinsError: null,
    });
    try {
      const pins = await getPinsFromServer();
      return pins;
    } catch (e) {
      this.setState({
        updatingPinsError: e.message,
      });
      throw e;
    } finally {
      this.setState({
        updatingPins: false,
      });
    }
  };

  saveLocalUserPins = async pins => {
    this.setState({
      updatingPins: true,
      updatingPinsError: null,
    });
    try {
      const savedPins = await this.props.saveLocalPinsOnLogin(pins);
      return savedPins;
    } catch (e) {
      this.setState({
        updatingPinsError: e.message,
      });
      throw e;
    } finally {
      this.setState({
        updatingPins: false,
      });
    }
  };

  savePins = async (pins, replace) => {
    this.setState({
      updatingPins: true,
      updatingPinsError: null,
    });
    try {
      await savePinsToServer(pins, replace);
      return pins;
    } catch (e) {
      this.setState({
        updatingPinsError: e.message,
      });
      throw e;
    } finally {
      this.setState({
        updatingPins: false,
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      if (!this.props.user) {
        this.removePinsFromArray(SAVED_PINS);
        this.cancelSharePins();
      } else {
        // user logged in
        if (this.props.pinItems.filter(p => p.type === UNSAVED_PINS).length) {
          let pins = getPinsFromSessionStorage();
          if (!pins.length) {
            return;
          }
          this.saveLocalUserPins(pins)
            .then(pins => {
              sessionStorage.setItem(PINS_LC_NAME, JSON.stringify([]));
              this.removePinsFromArray(UNSAVED_PINS);
              this.setPinsInArray(pins.pins, SAVED_PINS);
            })
            .catch(() => {});
        } else {
          this.fetchUserPins()
            .then(pins => this.setPinsInArray(pins, SAVED_PINS))
            .catch(() => {});
        }
      }
    }

    if (prevProps.lastAddedPin !== this.props.lastAddedPin) {
      if (this.props.user) {
        this.fetchUserPins()
          .then(pins => this.setPinsInArray(pins, SAVED_PINS))
          .catch(() => {});
      } else {
        let pins = getPinsFromSessionStorage();
        this.setPinsInArray(pins, UNSAVED_PINS);
      }
    }
  }

  removePinsFromArray = pinType => {
    store.dispatch(pinsSlice.actions.clearByType(pinType));
  };

  setPinsInArray = (pins, pinType) => {
    store.dispatch(
      pinsSlice.actions.updatePinsByType({
        pins: pins,
        pinType: pinType,
      }),
    );
  };

  dragulaDecorator = componentBackingInstance => {
    if (componentBackingInstance) {
      const drake = dragula([componentBackingInstance], {
        moves: (el, container, handle) => {
          if (handle.classList.contains('pin-drag-handler') || handle.classList.contains('fa-ellipsis-v')) {
            return true;
          }
        },
        accepts: function(el, target, source, sibling) {
          if (!sibling) {
            return false;
          }
          return true;
        },
      });

      drake.on('drop', (el, target, source, sibling) => {
        const droppedLocation = Array.from(el.parentNode.children).indexOf(el);
        drake.cancel(true); // Prevents  DOM manipulation; we change the order by changing the state which rerenders pins
        this.onPinIndexChange(el.id, droppedLocation);
      });
    }
  };

  onPinIndexChange = (oldIndex, newIndex) => {
    const pinItems = [...this.props.pinItems];
    const pinItem = pinItems[oldIndex];
    pinItems.splice(oldIndex, 1); // remove pinItem from the old place
    pinItems.splice(newIndex, 0, pinItem); // add it elsewhere

    const pins = pinItems.filter(p => p.type === pinItem.type).map(p => p.item);
    if (pinItem.type === UNSAVED_PINS) {
      savePinsToSessionStorage(pins, true);
    }
    if (pinItem.type === SAVED_PINS) {
      this.savePins(pins, true)
        .then(() => store.dispatch(pinsSlice.actions.updateItems(pinItems)))
        .catch(() => {});
    }
  };

  onRemovePin = index => {
    const confirmation = window.confirm(t`WARNING: You're about to delete a pin. Do you wish to continue?`);
    if (!confirmation) {
      return;
    }
    const pin = this.props.pinItems[index].item;
    const type = this.props.pinItems[index].type;
    if (type === UNSAVED_PINS) {
      let pins = getPinsFromSessionStorage();
      if (!pins.length) {
        return;
      }
      pins = pins.filter(p => p._id !== pin._id);
      sessionStorage.setItem(PINS_LC_NAME, JSON.stringify(pins));
      store.dispatch(pinsSlice.actions.removeItem(index));
      this.props.setLastAddedPin(null);
    } else if (type === SAVED_PINS) {
      this.deleteUserPins([pin._id])
        .then(() => {
          store.dispatch(pinsSlice.actions.removeItem(index));
          this.props.setLastAddedPin(null);
        })
        .catch(() => {});
    }
  };

  onRemoveAllPins = () => {
    if (this.props.pinItems.length === 0) {
      return;
    }

    const confirmation = window.confirm(
      t`WARNING: You're about to delete all pins. Do you wish to continue?`,
    );
    if (!confirmation) {
      return;
    }

    this.cancelSharePins();

    if (this.props.user) {
      const pinIds = this.props.pinItems
        .filter(p => p.type === SAVED_PINS && !!p.item._id)
        .map(p => p.item._id);

      if (pinIds.length) {
        this.deleteUserPins(pinIds)
          .then(() => {
            store.dispatch(pinsSlice.actions.updateItems([]));
            this.props.setLastAddedPin(null);
          })
          .catch(() => {});
      }
    } else {
      sessionStorage.setItem(PINS_LC_NAME, JSON.stringify([]));
      store.dispatch(pinsSlice.actions.updateItems([]));
    }
  };

  onPinSelect = async (pin, arePinsSelectable) => {
    const {
      zoom,
      lat,
      lng,
      fromTime,
      toTime,
      datasetId,
      visualizationUrl,
      layerId,
      evalscript,
      evalscripturl,
      themeId,
      dataFusion,
      minQa,
      upsampling,
      downsampling,
      terrainViewerSettings,
    } = pin;

    if (arePinsSelectable) {
      return;
    }

    // since we are setting a new theme and changing map state we should reset search results
    this.props.resetSearch();
    store.dispatch(visualizationSlice.actions.reset());
    this.props.setTimeSpanExpanded(false);

    if (!themeId) {
      store.dispatch(notificationSlice.actions.displayError('Pin is invalid: themeId is not defined.'));
      return;
    }

    const modeFromPinThemeId = MODES.find(m => m.themes.find(t => t.id === themeId));
    let selectedModeId = this.props.selectedModeId;
    let selectedThemesListId = this.props.selectedThemesListId;

    if (this.props.urlThemesList.find(t => t.id === themeId) && this.props.selectedModeId !== DEFAULT_MODE) {
      // themeId is one of the url themes, we set the default mode if not set
      selectedModeId = DEFAULT_MODE.id;
      selectedThemesListId = URL_THEMES_LIST;
    } else if (modeFromPinThemeId && modeFromPinThemeId.id !== this.props.selectedModeId) {
      // themeId is in one of the modes themes and we set the mode if it's other than currently selected
      selectedModeId = modeFromPinThemeId.id;
      selectedThemesListId = MODE_THEMES_LIST;
    } else if (this.props.userInstancesThemesList.find(t => t.id === themeId)) {
      // themeId is in a user instance, we keep the current mode.
      selectedThemesListId = USER_INSTANCES_THEMES_LIST;
    } else if (
      selectedThemesListId !== MODE_THEMES_LIST &&
      this.props.modeThemesList.find(t => t.id === themeId)
    ) {
      // Check mode themes when theme is not found in userInstancesThemesList or urlThemesList
      // and change selectedThemesListId accordingly
      selectedThemesListId = MODE_THEMES_LIST;
    }

    store.dispatch(
      themesSlice.actions.setSelectedThemeIdAndModeId({
        selectedThemeId: themeId,
        selectedThemesListId: selectedThemesListId,
        selectedModeId: selectedModeId,
      }),
    );

    const { lat: parsedLat, lng: parsedLng, zoom: parsedZoom } = parsePosition(lat, lng, zoom);

    store.dispatch(
      mainMapSlice.actions.setPosition({
        lat: parsedLat,
        lng: parsedLng,
        zoom: parsedZoom,
      }),
    );

    let pinTimeFrom, pinTimeTo;
    const dataSourceHandler = getDataSourceHandler(datasetId);
    const supportsTimeRange = dataSourceHandler ? dataSourceHandler.supportsTimeRange() : true;
    if (supportsTimeRange) {
      pinTimeFrom = fromTime ? moment.utc(fromTime) : moment.utc(toTime).startOf('day');
      pinTimeTo = fromTime ? moment.utc(toTime) : moment.utc(toTime).endOf('day');
    } else {
      pinTimeTo = moment.utc(toTime);
    }

    let visualizationParams = {
      datasetId: datasetId,
      visualizationUrl: visualizationUrl,
      fromTime: pinTimeFrom,
      toTime: pinTimeTo,
      visibleOnMap: true,
      dataFusion: dataFusion,
    };

    if (evalscript || evalscripturl) {
      visualizationParams.evalscript = evalscript;
      visualizationParams.evalscripturl = evalscripturl;
      visualizationParams.customSelected = true;
    } else {
      visualizationParams.layerId = layerId;
    }

    const effects = constructEffectsFromPinOrHighlight(pin);
    visualizationParams = { ...visualizationParams, ...effects };

    if (minQa !== undefined) {
      visualizationParams.minQa = minQa;
    }
    if (upsampling) {
      visualizationParams.upsampling = upsampling;
    }
    if (downsampling) {
      visualizationParams.downsampling = downsampling;
    }

    store.dispatch(visualizationSlice.actions.setVisualizationParams(visualizationParams));
    this.props.setSelectedPin(this.props.item);
    this.props.setActiveTabIndex(2);

    if (terrainViewerSettings && Object.keys(terrainViewerSettings).length > 0) {
      store.dispatch(terrainViewerSlice.actions.setTerrainViewerSettings(terrainViewerSettings));
      store.dispatch(modalSlice.actions.addModal({ modal: ModalId.TERRAIN_VIEWER }));
    }
  };

  onTogglePinForSelection = pinForSharing => {
    //check if pin is already in list of pins for sharing
    const isPinSelected = this.state.selectedPins.find(pin => pin === pinForSharing);

    //if pin is not already selected, add it to the list. Otherwise remove it from the list
    if (!isPinSelected) {
      this.setState({
        selectedPins: [...this.state.selectedPins, pinForSharing],
      });
    } else {
      this.setState({
        selectedPins: [...this.state.selectedPins.filter(pin => pin !== pinForSharing)],
      });
    }
  };

  savePinProperty = (index, key, value) => {
    const pinItems = cloneDeep(this.props.pinItems);
    pinItems[index].item[key] = value;

    const pinType = pinItems[index].type;
    const pins = pinItems.filter(p => p.type === pinType).map(p => p.item);

    if (pinType === UNSAVED_PINS) {
      savePinsToSessionStorage(pins, true);
      store.dispatch(pinsSlice.actions.updateItems(pinItems));
    }
    if (pinType === SAVED_PINS) {
      this.savePins(pins, true)
        .then(() => store.dispatch(pinsSlice.actions.updateItems(pinItems)))
        .catch(() => {});
    }
  };

  cancelSharePins = () => {
    this.setState(prevState => ({
      operation: prevState.operation === OPERATION_SHARE ? null : prevState.operation,
      selectedPins: [],
    }));
  };

  checkIfUserLoggedInAndPinsPresent() {
    if (!this.props.user) {
      return false;
    }
    if (!this.props.pinItems || this.props.pinItems.length === 0) {
      return false;
    }
    return true;
  }

  toggleSharePins = () => {
    if (!this.checkIfUserLoggedInAndPinsPresent()) {
      return;
    }

    const { pinItems } = this.props;
    this.setState(prevState => ({
      operation: prevState.operation === OPERATION_SHARE ? null : OPERATION_SHARE,
      selectedPins: prevState.operation === OPERATION_SHARE ? [] : pinItems.map(pin => pin.item),
    }));
  };

  openAnimatePanel = () => {
    if (!this.checkIfUserLoggedInAndPinsPresent()) {
      return;
    }

    this.setState({
      operation: null,
      comparingPins: false,
      compareMode: null,
    });

    store.dispatch(
      modalSlice.actions.addModal({
        modal: ModalId.PINS_STORY_BUILDER,
        params: {},
      }),
    );
  };

  resetSelectedPins = () => {
    this.setState({
      selectedPins: [],
      operation: null,
    });
  };

  createSharePinsLink = () => {
    store.dispatch(
      modalSlice.actions.addModal({
        modal: ModalId.SHAREPINSLINK,
        params: { selectedPins: this.state.selectedPins, onClose: this.resetSelectedPins },
      }),
    );
  };

  toggleSelectAllPins = areAllPinsSelected => {
    if (areAllPinsSelected) {
      this.setState({
        selectedPins: [],
      });
    } else {
      const { pinItems } = this.props;
      const allPins = pinItems.map(pin => pin.item);
      this.setState({
        selectedPins: [...allPins],
      });
    }
  };

  render() {
    const { operation, selectedPins, updatingPins, updatingPinsError } = this.state;
    const { pinItems } = this.props;
    const arePinsSelectable = operation === OPERATION_SHARE;
    const areAllPinsSelected = pinItems && selectedPins && selectedPins.length === pinItems.length;

    const loggedIn = this.props.user ? true : false;
    const noPinMsg = t`No pins. Go to the Visualize tab to save a pin or upload a JSON file with saved pins.`;
    const NOT_LOGGED_IN_AND_TEMP_PIN_MSG = t`Note that the pins will be saved only if you log in. Otherwise, the pins will be lost once the application is closed.`;

    return (
      <div className="pin-panel">
        <div className="pins-header">
          <div className="pins-controls">
            <PinTools
              pins={pinItems.map(p => p.item)}
              setLastAddedPin={this.props.setLastAddedPin}
              onDeleteAllPins={this.onRemoveAllPins}
              isUserLoggedIn={loggedIn}
              importEnabled={true}
              onShareClick={this.toggleSharePins}
              cancelSharePins={this.cancelSharePins}
              onAnimateClick={this.openAnimatePanel}
            />
          </div>
          {operation === OPERATION_SHARE && (
            <div className="select-all-share" onClick={() => this.toggleSelectAllPins(areAllPinsSelected)}>
              <i className={`fas fa-${areAllPinsSelected ? 'times-circle' : 'check-circle'}`}></i>
              {areAllPinsSelected ? t`Deselect all` : t`Select all`}
            </div>
          )}
        </div>

        <div className="pins-container" key={this.props.lastAddedPin} ref={this.dragulaDecorator}>
          <UpdatingStatus updatingPins={updatingPins} updatingPinsError={updatingPinsError} />
          {pinItems.map((pin, index) => (
            <Pin
              item={pin.item}
              key={pin.item._id}
              index={index}
              pinType={pin.type}
              allowRemove={true}
              onRemovePin={this.onRemovePin}
              arePinsSelectable={arePinsSelectable}
              savePinProperty={this.savePinProperty}
              setSelectedPin={this.props.setSelectedPin}
              setTimeSpanExpanded={this.props.setTimeSpanExpanded}
              onPinSelect={() =>
                arePinsSelectable
                  ? this.onTogglePinForSelection(pin.item)
                  : this.onPinSelect(pin.item, arePinsSelectable)
              }
              selectedForSharing={!!selectedPins.find(sharedPin => sharedPin === pin.item)}
            />
          ))}
          {/* no pins found and not logged in notification banner */}
          {pinItems.length === 0 && loggedIn && <NotificationPanel type="info" msg={noPinMsg} />}
          {/* not logged in notification banner */}
          {!loggedIn && pinItems.length === 0 && (
            /* the space before the second string is on purpose to have a space between the texts*/
            <NotificationPanel type="info" msg={t`No pins.` + ` ${NOT_LOGGED_IN_AND_TEMP_PIN_MSG}`} />
          )}
          {!loggedIn && pinItems.length > 0 && (
            <NotificationPanel type="info" msg={NOT_LOGGED_IN_AND_TEMP_PIN_MSG} />
          )}
        </div>
        {operation === OPERATION_SHARE && (
          <div className="pins-selection-confirm">
            <EOBButton
              disabled={!selectedPins || selectedPins.length === 0}
              fluid
              text={ngettext(
                msgid`Create link (${selectedPins.length} pin selected)`,
                `Create link (${selectedPins.length} pins selected)`,
                selectedPins.length,
              )}
              onClick={this.createSharePinsLink}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStoreToProps = store => ({
  user: store.auth.user.userdata,
  access_token: store.auth.user.access_token,
  bounds: store.mainMap.bounds,
  selectedModeId: store.themes.selectedModeId,
  selectedThemesListId: store.themes.selectedThemesListId,
  themesLists: store.themes.themesLists,
  selectedThemeId: store.themes.selectedThemeId,
  modeThemesList: store.themes.themesLists[MODE_THEMES_LIST],
  urlThemesList: store.themes.themesLists[URL_THEMES_LIST],
  userInstancesThemesList: store.themes.themesLists[USER_INSTANCES_THEMES_LIST],
  pinItems: store.pins.items,
  selectedLanguage: store.language.selectedLanguage,
});

export default connect(mapStoreToProps, null)(PinPanel);
