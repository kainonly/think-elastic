import { App } from './app';

const main_handler = async (event: any, context: any, callback: any) => {
  await App();
  return {};
};

export { main_handler };
