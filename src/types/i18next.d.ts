import 'i18next';

import { defaultNS, resources } from '../features/bootstrap/Localization';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['en'];
  }
}
