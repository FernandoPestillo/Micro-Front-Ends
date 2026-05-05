import { initFederation } from '@angular-architects/module-federation-runtime';

initFederation('/assets/mf.manifest.json', true)
  .catch((error) => {
    console.error('Nao foi possivel carregar o manifesto de remotes.', error);
  })
  .then(() => import('./bootstrap'))
  .catch((error) => console.error(error));
