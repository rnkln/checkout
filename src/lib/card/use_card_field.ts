import { useController } from 'react-hook-form'
import type { CardFormValues } from './use_card_values'

export const useCardField = <T extends keyof CardFormValues>(name: T) =>
	useController<CardFormValues, T>({
		name: name
	})
