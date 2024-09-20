import { useTranslation } from 'react-i18next';
import { useLocales } from '@setup/Localization';
import { Flex } from '@matter/flex';
import { ButtonBase } from '@matter/button';

export const LocaleMenu = () => {
  const { i18n } = useTranslation();
  const locales = useLocales();

  return (
    <Flex>
      {locales.map((locale) => (
        <ButtonBase key={locale} onClick={() => i18n.changeLanguage(locale)}>
          {locale}
        </ButtonBase>
      ))}
    </Flex>
  );
};
