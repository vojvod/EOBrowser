import React from 'react';
import {
  DATASET_AWSEU_S1GRD,
  DATASET_S2L1C,
  DATASET_S2L2A,
  DATASET_S3SLSTR,
  DATASET_S3OLCI,
  DATASET_S5PL2,
  DATASET_AWS_L8L1C,
  DATASET_MODIS,
  DATASET_AWS_DEM,
  DATASET_AWS_LOTL1,
  DATASET_AWS_LOTL2,
  DATASET_AWS_LTML1,
  DATASET_AWS_LTML2,
} from '@sentinel-hub/sentinelhub-js';
import { t } from 'ttag';
import { connect } from 'react-redux';

import SupplementalDatasets from './SupplementalDatasets';
import DataFusionPrimaryDataset from './DataFusionPrimaryDataset';
import { getDataSourceHandler } from '../../Tools/SearchPanel/dataSourceHandlers/dataSourceHandlers';
import DataFusionAdditionalParametersS1 from './DataFusionAdditionalParametersS1';

import './DataFusion.scss';

class DataFusion extends React.Component {
  toggleDataFusionEnabled = () => {
    const { settings } = this.props;
    const enabled = settings && settings.length > 0;

    if (enabled) {
      this.props.onChange([]);
    } else {
      const primaryDataset = this.getPrimaryDataset();
      this.props.onChange([primaryDataset]);
    }
  };

  getPrimaryDataset = () => {
    const { datasetId } = this.props;
    const dsh = getDataSourceHandler(datasetId);
    const dataset = dsh.getSentinelHubDataset(datasetId);
    const alias = this.constructAlias(dataset, []);

    const primaryDataset = {
      id: dataset.id,
      alias: alias,
    };
    if (dataset === DATASET_AWSEU_S1GRD) {
      const datasetParams = dsh.constructor.getDatasetParams(datasetId);
      primaryDataset['additionalParameters'] = datasetParams;
    }
    return primaryDataset;
  };

  getAvailableDatasets(dataset) {
    return {
      [DATASET_AWSEU_S1GRD.id]: {
        label: 'S-1 GRD',
        dataset: DATASET_AWSEU_S1GRD,
        additionalMosaickingOrders: [],
        additionalParametersComponent: DataFusionAdditionalParametersS1,
      },
      [DATASET_S2L1C.id]: {
        label: 'S-2 L1C',
        dataset: DATASET_S2L1C,
        additionalMosaickingOrders: [{ label: t`Least cloud coverage`, id: 'leastCC' }],
      },
      [DATASET_S2L2A.id]: {
        label: 'S-2 L2A',
        dataset: DATASET_S2L2A,
        additionalMosaickingOrders: [{ label: t`Least cloud coverage`, id: 'leastCC' }],
      },
      [DATASET_S3SLSTR.id]: {
        label: 'S-3 SLSTR',
        dataset: DATASET_S3SLSTR,
        additionalMosaickingOrders: [{ label: t`Least cloud coverage`, id: 'leastCC' }],
      },
      [DATASET_S3OLCI.id]: {
        label: 'S-3 OLCI',
        dataset: DATASET_S3OLCI,
        additionalMosaickingOrders: [],
      },
      [DATASET_S5PL2.id]: {
        label: 'S-5P L2',
        dataset: DATASET_S5PL2,
        additionalMosaickingOrders: [],
      },
      [DATASET_AWS_DEM.id]: {
        label: 'DEM',
        dataset: DATASET_AWS_DEM,
        additionalMosaickingOrders: [],
      },
      [DATASET_AWS_L8L1C.id]: {
        label: 'Landsat 8 L1C',
        dataset: DATASET_AWS_L8L1C,
        additionalMosaickingOrders: [{ label: t`Least cloud coverage`, id: 'leastCC' }],
      },
      [DATASET_AWS_LOTL1.id]: {
        label: 'Landsat 8 L1',
        dataset: DATASET_AWS_LOTL1,
        additionalMosaickingOrders: [{ label: t`Least cloud coverage`, id: 'leastCC' }],
      },
      [DATASET_AWS_LOTL2.id]: {
        label: 'Landsat 8 L2',
        dataset: DATASET_AWS_LOTL2,
        additionalMosaickingOrders: [{ label: t`Least cloud coverage`, id: 'leastCC' }],
      },
      [DATASET_AWS_LTML1.id]: {
        label: 'Landsat 4-5 TM L1',
        dataset: DATASET_AWS_LTML1,
        additionalMosaickingOrders: [{ label: t`Least cloud coverage`, id: 'leastCC' }],
      },
      [DATASET_AWS_LTML2.id]: {
        label: 'Landsat 4-5 TM L2',
        dataset: DATASET_AWS_LTML2,
        additionalMosaickingOrders: [{ label: t`Least cloud coverage`, id: 'leastCC' }],
      },
      [DATASET_MODIS.id]: {
        label: 'MODIS',
        dataset: DATASET_MODIS,
        additionalMosaickingOrders: [],
      },
      [DATASET_AWS_DEM.id]: {
        label: 'DEM',
        dataset: DATASET_AWS_DEM,
        additionalMosaickingOrders: [],
      },
    };
  }

  constructAlias = (dataset, settings) => {
    const existingAliases = settings.filter(d => d.id === dataset.id).map(d => d.alias);
    const newAliasBase = `${dataset.shProcessingApiDatasourceAbbreviation.toUpperCase()}`;
    let serialNumber = existingAliases.length;
    let newAlias = serialNumber ? `${newAliasBase}-${serialNumber}` : newAliasBase;
    while (existingAliases.includes(newAlias)) {
      serialNumber += 1;
      newAlias = `${newAliasBase}-${serialNumber}`;
    }
    return newAlias;
  };

  onAddSupplementalDataset = newDatasetId => {
    const {
      settings: [...settings],
    } = this.props;

    const dataset = this.getAvailableDatasets()[newDatasetId].dataset;
    const newAlias = this.constructAlias(dataset, settings);
    const newDataset = {
      id: newDatasetId,
      alias: newAlias,
    };
    settings.push(newDataset);

    this.props.onChange(settings);
  };

  onRemoveSupplementalDataset = alias => {
    const {
      settings: [...settings],
    } = this.props;
    const newSettings = settings.filter(d => d.alias !== alias);
    this.props.onChange(newSettings);
  };

  updateAlias = (oldAlias, newAlias) => {
    this.setNewSettings(oldAlias, 'alias', newAlias);
  };

  updateMosaickingOrder = (alias, mosaickingOrder) => {
    this.setNewSettings(alias, 'mosaickingOrder', mosaickingOrder);
  };

  updateAdditionalParameters = (alias, additionalParameters) => {
    this.setNewSettings(alias, 'additionalParameters', additionalParameters);
  };

  updateTimespan = (alias, fromTime, toTime) => {
    this.setNewSettings(alias, 'timespan', [fromTime, toTime]);
  };

  setNewSettings = (alias, key, newValue) => {
    let {
      settings: [...newSettings],
    } = this.props;
    const datasetIndex = newSettings.findIndex(d => d.alias === alias);
    const datasetSettings = { ...newSettings[datasetIndex] };
    datasetSettings[key] = newValue;
    newSettings[datasetIndex] = datasetSettings;
    this.props.onChange(newSettings);
  };

  checkAliasValidity = alias => {
    const { settings } = this.props;
    return !!alias && !settings.some(d => d.alias === alias);
  };

  render() {
    const { initialTimespan, datasetId } = this.props;
    let settings = [...this.props.settings];

    const availableDatasets = this.getAvailableDatasets();
    const dataset = getDataSourceHandler(datasetId).getSentinelHubDataset(datasetId);

    if (!dataset || !availableDatasets[dataset.id]) {
      return null;
    }

    const primaryDatasetIndex = settings.findIndex(d => d.id === dataset.id);
    const primaryDataset = settings[primaryDatasetIndex];
    const supplementalDatasets = [
      ...settings.slice(0, primaryDatasetIndex),
      ...settings.slice(primaryDatasetIndex + 1),
    ];

    const enabled = settings && settings.length > 0;

    return (
      <div className="data-fusion">
        <div className="checkbox-holder use-url data-fusion-enabled">
          <input
            type="checkbox"
            id="data-fusion-checkbox"
            onChange={this.toggleDataFusionEnabled}
            checked={enabled}
          />
          <label htmlFor="data-fusion-checkbox">{t`Use additional datasets (advanced)`}</label>
        </div>

        {enabled && (
          <div className="data-fusion-details">
            <DataFusionPrimaryDataset
              alias={primaryDataset.alias}
              label={availableDatasets[dataset.id].label}
              updateAlias={this.updateAlias}
              supplementalDatasets={supplementalDatasets}
              checkAliasValidity={this.checkAliasValidity}
              updateMosaickingOrder={this.updateMosaickingOrder}
              mosaickingOrder={primaryDataset.mosaickingOrder}
              additionalMosaickingOrders={availableDatasets[dataset.id].additionalMosaickingOrders}
            />

            <SupplementalDatasets
              initialTimespan={initialTimespan}
              availableSupplementalDatasets={availableDatasets}
              supplementalDatasets={supplementalDatasets}
              onAddSupplementalDataset={this.onAddSupplementalDataset}
              onRemoveSupplementalDataset={this.onRemoveSupplementalDataset}
              updateAlias={this.updateAlias}
              updateTimespan={this.updateTimespan}
              updateMosaickingOrder={this.updateMosaickingOrder}
              updateAdditionalParameters={this.updateAdditionalParameters}
              checkAliasValidity={this.checkAliasValidity}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStoreToProps = store => ({
  datasetId: store.visualization.datasetId,
});

export default connect(mapStoreToProps, null)(DataFusion);
