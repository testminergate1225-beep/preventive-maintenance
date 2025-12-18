# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, listAssets, createMaintenanceTaskLog, listMaintenanceTaskDefinitionsForAsset } from '@dataconnect/generated';


// Operation CreateUser: 
const { data } = await CreateUser(dataConnect);

// Operation ListAssets: 
const { data } = await ListAssets(dataConnect);

// Operation CreateMaintenanceTaskLog:  For variables, look at type CreateMaintenanceTaskLogVars in ../index.d.ts
const { data } = await CreateMaintenanceTaskLog(dataConnect, createMaintenanceTaskLogVars);

// Operation ListMaintenanceTaskDefinitionsForAsset:  For variables, look at type ListMaintenanceTaskDefinitionsForAssetVars in ../index.d.ts
const { data } = await ListMaintenanceTaskDefinitionsForAsset(dataConnect, listMaintenanceTaskDefinitionsForAssetVars);


```