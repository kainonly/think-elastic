import { cosDelete, cosHead, cosPut, httpClient } from './common';

const addPackage = async (packages: any[]) => {
  try {
    while (packages.length !== 0) {
      const key = packages[packages.length - 1];
      const headResponse = await cosHead(key);
      if (headResponse) {
        console.log(key + ' exists.');
        packages.pop();
        continue;
      }
      const response = await httpClient(key);
      const raw = response.body;
      const putResponse = await cosPut(key, raw);
      if (putResponse) {
        console.log(key + ' download finish.');
        packages.pop();
      }
    }
    return true;
  } catch (e) {
    return false;
  }
};

const addProvider = async (providers: any[]) => {
  try {
    while (providers.length !== 0) {
      const key = providers[providers.length - 1];
      const headResponse = await cosHead(key);
      if (headResponse) {
        console.log(key + ' exists.');
        providers.pop();
        continue;
      }
      const response = await httpClient(key);
      const raw = response.body;
      const putResponse = await cosPut(key, raw);
      if (putResponse) {
        console.log(key + ' download finish.');
        providers.pop();
      }
    }
    return true;
  } catch (e) {
    return false;
  }
};

const deletePackage = async (packages: any[]) => {
  if (packages.length === 0) return true;
  const response = await cosDelete(packages);
  return response.statusCode === 200;
};

const deleteProvider = async (providers: any[]) => {
  if (providers.length === 0) return true;
  const response = await cosDelete(providers);
  return response.statusCode === 200;
};

export { addPackage, addProvider, deletePackage, deleteProvider };
