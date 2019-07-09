import { Packages } from './packages';

const App = () => new Promise(async (resolve) => {
  const origin = await new Packages(true).loadPackages();
  const originProviders = origin.getProviders();


  resolve();
  //     cos.getObject({
  //         Bucket: env.BUCKET,
  //         Region: env.REGION,
  //         Key: 'packages.json',
  //     }, (err: any, data: any) => {
  //         if (err) return;
  //         const cosPackages = JSON.parse(data.Body.toString());
  //         const cosProviders = cosPackages['provider-includes'];
  //
  //     });
});

export { App };
