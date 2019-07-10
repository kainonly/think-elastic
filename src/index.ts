import { App } from './app';

const main_handler = async (event: any, context: any, callback: any) => {
  const msg = await App();
  return {
    msg,
  };
};

export { main_handler };
