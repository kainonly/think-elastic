import { Mirros } from './mirros';
import { Providers } from './providers';

const App = () => new Promise(async (resolve) => {
  const mirros = await new Mirros().loadPackages();
  const cosMirror = await new Mirros(true).loadPackages();
  const providers = await new Providers(
    mirros.providers,
    cosMirror.providers,
  ).loadProvider();
  resolve();
});

export { App };
