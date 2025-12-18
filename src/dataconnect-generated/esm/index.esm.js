import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'preventivemaintenance',
  location: 'us-east4'
};

export const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';

export function createUser(dc) {
  return executeMutation(createUserRef(dc));
}

export const listAssetsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAssets');
}
listAssetsRef.operationName = 'ListAssets';

export function listAssets(dc) {
  return executeQuery(listAssetsRef(dc));
}

export const createMaintenanceTaskLogRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMaintenanceTaskLog', inputVars);
}
createMaintenanceTaskLogRef.operationName = 'CreateMaintenanceTaskLog';

export function createMaintenanceTaskLog(dcOrVars, vars) {
  return executeMutation(createMaintenanceTaskLogRef(dcOrVars, vars));
}

export const listMaintenanceTaskDefinitionsForAssetRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMaintenanceTaskDefinitionsForAsset', inputVars);
}
listMaintenanceTaskDefinitionsForAssetRef.operationName = 'ListMaintenanceTaskDefinitionsForAsset';

export function listMaintenanceTaskDefinitionsForAsset(dcOrVars, vars) {
  return executeQuery(listMaintenanceTaskDefinitionsForAssetRef(dcOrVars, vars));
}

