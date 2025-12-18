import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Asset_Key {
  id: UUIDString;
  __typename?: 'Asset_Key';
}

export interface CreateMaintenanceTaskLogData {
  maintenanceTaskLog_insert: MaintenanceTaskLog_Key;
}

export interface CreateMaintenanceTaskLogVariables {
  assetId: UUIDString;
  maintenanceTaskDefinitionId: UUIDString;
  completedDate: TimestampString;
  notes: string;
  performedBy: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface ListAssetsData {
  assets: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & Asset_Key)[];
}

export interface ListMaintenanceTaskDefinitionsForAssetData {
  maintenanceTaskDefinitions: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    frequencyInDays: number;
    lastScheduledDate?: TimestampString | null;
  } & MaintenanceTaskDefinition_Key)[];
}

export interface ListMaintenanceTaskDefinitionsForAssetVariables {
  assetId: UUIDString;
}

export interface MaintenanceTaskDefinition_Key {
  id: UUIDString;
  __typename?: 'MaintenanceTaskDefinition_Key';
}

export interface MaintenanceTaskLog_Key {
  id: UUIDString;
  __typename?: 'MaintenanceTaskLog_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface ListAssetsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAssetsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAssetsData, undefined>;
  operationName: string;
}
export const listAssetsRef: ListAssetsRef;

export function listAssets(): QueryPromise<ListAssetsData, undefined>;
export function listAssets(dc: DataConnect): QueryPromise<ListAssetsData, undefined>;

interface CreateMaintenanceTaskLogRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMaintenanceTaskLogVariables): MutationRef<CreateMaintenanceTaskLogData, CreateMaintenanceTaskLogVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMaintenanceTaskLogVariables): MutationRef<CreateMaintenanceTaskLogData, CreateMaintenanceTaskLogVariables>;
  operationName: string;
}
export const createMaintenanceTaskLogRef: CreateMaintenanceTaskLogRef;

export function createMaintenanceTaskLog(vars: CreateMaintenanceTaskLogVariables): MutationPromise<CreateMaintenanceTaskLogData, CreateMaintenanceTaskLogVariables>;
export function createMaintenanceTaskLog(dc: DataConnect, vars: CreateMaintenanceTaskLogVariables): MutationPromise<CreateMaintenanceTaskLogData, CreateMaintenanceTaskLogVariables>;

interface ListMaintenanceTaskDefinitionsForAssetRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMaintenanceTaskDefinitionsForAssetVariables): QueryRef<ListMaintenanceTaskDefinitionsForAssetData, ListMaintenanceTaskDefinitionsForAssetVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListMaintenanceTaskDefinitionsForAssetVariables): QueryRef<ListMaintenanceTaskDefinitionsForAssetData, ListMaintenanceTaskDefinitionsForAssetVariables>;
  operationName: string;
}
export const listMaintenanceTaskDefinitionsForAssetRef: ListMaintenanceTaskDefinitionsForAssetRef;

export function listMaintenanceTaskDefinitionsForAsset(vars: ListMaintenanceTaskDefinitionsForAssetVariables): QueryPromise<ListMaintenanceTaskDefinitionsForAssetData, ListMaintenanceTaskDefinitionsForAssetVariables>;
export function listMaintenanceTaskDefinitionsForAsset(dc: DataConnect, vars: ListMaintenanceTaskDefinitionsForAssetVariables): QueryPromise<ListMaintenanceTaskDefinitionsForAssetData, ListMaintenanceTaskDefinitionsForAssetVariables>;

