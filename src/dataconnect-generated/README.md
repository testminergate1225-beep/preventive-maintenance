# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAssets*](#listassets)
  - [*ListMaintenanceTaskDefinitionsForAsset*](#listmaintenancetaskdefinitionsforasset)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*CreateMaintenanceTaskLog*](#createmaintenancetasklog)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAssets
You can execute the `ListAssets` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAssets(): QueryPromise<ListAssetsData, undefined>;

interface ListAssetsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAssetsData, undefined>;
}
export const listAssetsRef: ListAssetsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAssets(dc: DataConnect): QueryPromise<ListAssetsData, undefined>;

interface ListAssetsRef {
  ...
  (dc: DataConnect): QueryRef<ListAssetsData, undefined>;
}
export const listAssetsRef: ListAssetsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAssetsRef:
```typescript
const name = listAssetsRef.operationName;
console.log(name);
```

### Variables
The `ListAssets` query has no variables.
### Return Type
Recall that executing the `ListAssets` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAssetsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAssetsData {
  assets: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & Asset_Key)[];
}
```
### Using `ListAssets`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAssets } from '@dataconnect/generated';


// Call the `listAssets()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAssets();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAssets(dataConnect);

console.log(data.assets);

// Or, you can use the `Promise` API.
listAssets().then((response) => {
  const data = response.data;
  console.log(data.assets);
});
```

### Using `ListAssets`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAssetsRef } from '@dataconnect/generated';


// Call the `listAssetsRef()` function to get a reference to the query.
const ref = listAssetsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAssetsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.assets);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.assets);
});
```

## ListMaintenanceTaskDefinitionsForAsset
You can execute the `ListMaintenanceTaskDefinitionsForAsset` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMaintenanceTaskDefinitionsForAsset(vars: ListMaintenanceTaskDefinitionsForAssetVariables): QueryPromise<ListMaintenanceTaskDefinitionsForAssetData, ListMaintenanceTaskDefinitionsForAssetVariables>;

interface ListMaintenanceTaskDefinitionsForAssetRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMaintenanceTaskDefinitionsForAssetVariables): QueryRef<ListMaintenanceTaskDefinitionsForAssetData, ListMaintenanceTaskDefinitionsForAssetVariables>;
}
export const listMaintenanceTaskDefinitionsForAssetRef: ListMaintenanceTaskDefinitionsForAssetRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMaintenanceTaskDefinitionsForAsset(dc: DataConnect, vars: ListMaintenanceTaskDefinitionsForAssetVariables): QueryPromise<ListMaintenanceTaskDefinitionsForAssetData, ListMaintenanceTaskDefinitionsForAssetVariables>;

interface ListMaintenanceTaskDefinitionsForAssetRef {
  ...
  (dc: DataConnect, vars: ListMaintenanceTaskDefinitionsForAssetVariables): QueryRef<ListMaintenanceTaskDefinitionsForAssetData, ListMaintenanceTaskDefinitionsForAssetVariables>;
}
export const listMaintenanceTaskDefinitionsForAssetRef: ListMaintenanceTaskDefinitionsForAssetRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMaintenanceTaskDefinitionsForAssetRef:
```typescript
const name = listMaintenanceTaskDefinitionsForAssetRef.operationName;
console.log(name);
```

### Variables
The `ListMaintenanceTaskDefinitionsForAsset` query requires an argument of type `ListMaintenanceTaskDefinitionsForAssetVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMaintenanceTaskDefinitionsForAssetVariables {
  assetId: UUIDString;
}
```
### Return Type
Recall that executing the `ListMaintenanceTaskDefinitionsForAsset` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMaintenanceTaskDefinitionsForAssetData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMaintenanceTaskDefinitionsForAssetData {
  maintenanceTaskDefinitions: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    frequencyInDays: number;
    lastScheduledDate?: TimestampString | null;
  } & MaintenanceTaskDefinition_Key)[];
}
```
### Using `ListMaintenanceTaskDefinitionsForAsset`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMaintenanceTaskDefinitionsForAsset, ListMaintenanceTaskDefinitionsForAssetVariables } from '@dataconnect/generated';

// The `ListMaintenanceTaskDefinitionsForAsset` query requires an argument of type `ListMaintenanceTaskDefinitionsForAssetVariables`:
const listMaintenanceTaskDefinitionsForAssetVars: ListMaintenanceTaskDefinitionsForAssetVariables = {
  assetId: ..., 
};

// Call the `listMaintenanceTaskDefinitionsForAsset()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMaintenanceTaskDefinitionsForAsset(listMaintenanceTaskDefinitionsForAssetVars);
// Variables can be defined inline as well.
const { data } = await listMaintenanceTaskDefinitionsForAsset({ assetId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMaintenanceTaskDefinitionsForAsset(dataConnect, listMaintenanceTaskDefinitionsForAssetVars);

console.log(data.maintenanceTaskDefinitions);

// Or, you can use the `Promise` API.
listMaintenanceTaskDefinitionsForAsset(listMaintenanceTaskDefinitionsForAssetVars).then((response) => {
  const data = response.data;
  console.log(data.maintenanceTaskDefinitions);
});
```

### Using `ListMaintenanceTaskDefinitionsForAsset`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMaintenanceTaskDefinitionsForAssetRef, ListMaintenanceTaskDefinitionsForAssetVariables } from '@dataconnect/generated';

// The `ListMaintenanceTaskDefinitionsForAsset` query requires an argument of type `ListMaintenanceTaskDefinitionsForAssetVariables`:
const listMaintenanceTaskDefinitionsForAssetVars: ListMaintenanceTaskDefinitionsForAssetVariables = {
  assetId: ..., 
};

// Call the `listMaintenanceTaskDefinitionsForAssetRef()` function to get a reference to the query.
const ref = listMaintenanceTaskDefinitionsForAssetRef(listMaintenanceTaskDefinitionsForAssetVars);
// Variables can be defined inline as well.
const ref = listMaintenanceTaskDefinitionsForAssetRef({ assetId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMaintenanceTaskDefinitionsForAssetRef(dataConnect, listMaintenanceTaskDefinitionsForAssetVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.maintenanceTaskDefinitions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.maintenanceTaskDefinitions);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has no variables.
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser } from '@dataconnect/generated';


// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef } from '@dataconnect/generated';


// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## CreateMaintenanceTaskLog
You can execute the `CreateMaintenanceTaskLog` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMaintenanceTaskLog(vars: CreateMaintenanceTaskLogVariables): MutationPromise<CreateMaintenanceTaskLogData, CreateMaintenanceTaskLogVariables>;

interface CreateMaintenanceTaskLogRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMaintenanceTaskLogVariables): MutationRef<CreateMaintenanceTaskLogData, CreateMaintenanceTaskLogVariables>;
}
export const createMaintenanceTaskLogRef: CreateMaintenanceTaskLogRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMaintenanceTaskLog(dc: DataConnect, vars: CreateMaintenanceTaskLogVariables): MutationPromise<CreateMaintenanceTaskLogData, CreateMaintenanceTaskLogVariables>;

interface CreateMaintenanceTaskLogRef {
  ...
  (dc: DataConnect, vars: CreateMaintenanceTaskLogVariables): MutationRef<CreateMaintenanceTaskLogData, CreateMaintenanceTaskLogVariables>;
}
export const createMaintenanceTaskLogRef: CreateMaintenanceTaskLogRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMaintenanceTaskLogRef:
```typescript
const name = createMaintenanceTaskLogRef.operationName;
console.log(name);
```

### Variables
The `CreateMaintenanceTaskLog` mutation requires an argument of type `CreateMaintenanceTaskLogVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMaintenanceTaskLogVariables {
  assetId: UUIDString;
  maintenanceTaskDefinitionId: UUIDString;
  completedDate: TimestampString;
  notes: string;
  performedBy: string;
}
```
### Return Type
Recall that executing the `CreateMaintenanceTaskLog` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMaintenanceTaskLogData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMaintenanceTaskLogData {
  maintenanceTaskLog_insert: MaintenanceTaskLog_Key;
}
```
### Using `CreateMaintenanceTaskLog`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMaintenanceTaskLog, CreateMaintenanceTaskLogVariables } from '@dataconnect/generated';

// The `CreateMaintenanceTaskLog` mutation requires an argument of type `CreateMaintenanceTaskLogVariables`:
const createMaintenanceTaskLogVars: CreateMaintenanceTaskLogVariables = {
  assetId: ..., 
  maintenanceTaskDefinitionId: ..., 
  completedDate: ..., 
  notes: ..., 
  performedBy: ..., 
};

// Call the `createMaintenanceTaskLog()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMaintenanceTaskLog(createMaintenanceTaskLogVars);
// Variables can be defined inline as well.
const { data } = await createMaintenanceTaskLog({ assetId: ..., maintenanceTaskDefinitionId: ..., completedDate: ..., notes: ..., performedBy: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMaintenanceTaskLog(dataConnect, createMaintenanceTaskLogVars);

console.log(data.maintenanceTaskLog_insert);

// Or, you can use the `Promise` API.
createMaintenanceTaskLog(createMaintenanceTaskLogVars).then((response) => {
  const data = response.data;
  console.log(data.maintenanceTaskLog_insert);
});
```

### Using `CreateMaintenanceTaskLog`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMaintenanceTaskLogRef, CreateMaintenanceTaskLogVariables } from '@dataconnect/generated';

// The `CreateMaintenanceTaskLog` mutation requires an argument of type `CreateMaintenanceTaskLogVariables`:
const createMaintenanceTaskLogVars: CreateMaintenanceTaskLogVariables = {
  assetId: ..., 
  maintenanceTaskDefinitionId: ..., 
  completedDate: ..., 
  notes: ..., 
  performedBy: ..., 
};

// Call the `createMaintenanceTaskLogRef()` function to get a reference to the mutation.
const ref = createMaintenanceTaskLogRef(createMaintenanceTaskLogVars);
// Variables can be defined inline as well.
const ref = createMaintenanceTaskLogRef({ assetId: ..., maintenanceTaskDefinitionId: ..., completedDate: ..., notes: ..., performedBy: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMaintenanceTaskLogRef(dataConnect, createMaintenanceTaskLogVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.maintenanceTaskLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.maintenanceTaskLog_insert);
});
```

