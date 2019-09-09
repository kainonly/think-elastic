import { App } from './app';

const main_handler = async (event: any, context: any, callback: any) => {
  return App();
};

export { main_handler };
