import 'i18next'

import type { defaultNS, resources } from '../features/bootstrap/Localization'

declare module 'i18next' {
	type CustomTypeOptions = {
		returnNull: false
		defaultNS: typeof defaultNS
		resources: (typeof resources)['en']
	}
}
