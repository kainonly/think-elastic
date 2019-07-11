import { Mirros } from './mirros';
import { Providers } from './providers';

const App = () => new Promise(async (resolve) => {
  const mirros = await new Mirros().loadPackages();
  const mirrosSync = mirros.sync();
  if (!mirrosSync) {
    return;
  }
  const providers = new Providers(mirros.providerIncludes);
  const syncResult = await providers.sync();
  if (!syncResult) {
    return;
  }
  const syncPackage = await providers.syncPackage();
  if (!syncResult) {
    return;
  }
  resolve('mirror sync finish!');
});

export { App };
