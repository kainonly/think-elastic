import { cosDelete } from './common';

const deletePackage = async (packages: any[]) => {
  const response = await cosDelete(packages);
  return response.statusCode === 200;
};

const deleteProvider = async (providers: any[]) => {
  console.log(providers);
  const response = await cosDelete(providers);
  console.log(response);
  return response.statusCode === 200;
};

export { deletePackage, deleteProvider };
