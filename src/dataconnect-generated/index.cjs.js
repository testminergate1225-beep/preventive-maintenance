const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'preventivemaintenance',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dc) {
  return executeMutation(createUserRef(dc));
};

const listAssetsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAssets');
}
listAssetsRef.operationName = 'ListAssets';
exports.listAssetsRef = listAssetsRef;

exports.listAssets = function listAssets(dc) {
  return executeQuery(listAssetsRef(dc));
};

const createMaintenanceTaskLogRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMaintenanceTaskLog', inputVars);
}
createMaintenanceTaskLogRef.operationName = 'CreateMaintenanceTaskLog';
exports.createMaintenanceTaskLogRef = createMaintenanceTaskLogRef;

exports.createMaintenanceTaskLog = function createMaintenanceTaskLog(dcOrVars, vars) {
  return executeMutation(createMaintenanceTaskLogRef(dcOrVars, vars));
};

const listMaintenanceTaskDefinitionsForAssetRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMaintenanceTaskDefinitionsForAsset', inputVars);
}
listMaintenanceTaskDefinitionsForAssetRef.operationName = 'ListMaintenanceTaskDefinitionsForAsset';
exports.listMaintenanceTaskDefinitionsForAssetRef = listMaintenanceTaskDefinitionsForAssetRef;

exports.listMaintenanceTaskDefinitionsForAsset = function listMaintenanceTaskDefinitionsForAsset(dcOrVars, vars) {
  return executeQuery(listMaintenanceTaskDefinitionsForAssetRef(dcOrVars, vars));
};
