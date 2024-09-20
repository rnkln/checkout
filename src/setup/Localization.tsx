import { ReactNode, useEffect, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';

import translationEN from '@public/i18n/en/translations.json';
import translationDA from '@public/i18n/da/translations.json';

export const defaultNS = 'translations';

export const resources = {
  en: {
    [defaultNS]: translationEN,
  },
  da: {
    [defaultNS]: translationDA,
  },
} as const;

export type LocalizationKeys = keyof (typeof resources)['en'][typeof defaultNS];

export type LocalizationProps = {
  children: ReactNode;
};

export const Localization = ({ children }: LocalizationProps) => {
  const locale = useLocaleFromClient();
  const i18n = useMemo(
    () =>
      createInstance(
        {
          lng: locale,
          defaultNS,
          resources,
          returnNull: false,
          returnEmptyString: false,
          keySeparator: false,
          fallbackLng: 'en',
          interpolation: {
            escapeValue: false,
          },
        },
        (err) => {
          if (err) {
            // eslint-disable-next-line no-console
            console.log('Could not create i18next instance', err);
          }
        }
      ),
    [locale]
  );

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n, locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export const useLocales = () => useMemo(() => Object.keys(resources), []);

export const useLocaleFromClient = () =>
  useMemo(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('locale');
    const fromAgent = navigator.language;

    return fromUrl ?? fromAgent ?? 'en';
  }, []);
