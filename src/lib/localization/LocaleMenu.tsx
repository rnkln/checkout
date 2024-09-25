import { useTranslation } from 'react-i18next'
import { useLocales } from '@setup/Localization'
import { Flex } from '@matter/flex'
import { ButtonBase } from '@matter/button'

export const LocaleMenu = () => {
	const { i18n } = useTranslation()
	const locales = useLocales()

	const handleChange = async (locale: string) => {
		await i18n.changeLanguage(locale)
	}

	return (
		<Flex>
			{locales.map((locale) => (
				<ButtonBase
					key={locale}
					onClick={() => {
						// eslint-disable-next-line @typescript-eslint/no-floating-promises
						handleChange(locale)
					}}
				>
					{locale}
				</ButtonBase>
			))}
		</Flex>
	)
}
