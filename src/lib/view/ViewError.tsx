import { useRef, useState, useLayoutEffect } from 'react'
import { Text } from '@matter/typography'
import { Alert } from '@matter/alert'
import type { PaymentErrorCode } from '@features/payment/client/payment_error'
import {
	usePaymentErrorMessage,
	type UsePaymentErrorMessageOptions
} from '@features/payment/client/use_payment_error_message'

import * as classes from './ViewError.css'

export type ViewErrorProps = {
	code: PaymentErrorCode
	options: UsePaymentErrorMessageOptions
}

export const ViewError = ({ code, options }: ViewErrorProps) => {
	const ref = useRef<HTMLDivElement>(null)
	const message = usePaymentErrorMessage(code, options)
	const [height, setHeight] = useState(0)

	useLayoutEffect(() => {
		setHeight(ref.current?.scrollHeight ?? 0)
	}, [])

	return (
		<div ref={ref} className={classes.root} style={{ height }}>
			<Alert
				severity="error"
				className={classes.alert}
				data-test-id="pay-view-error"
				data-error={code}
			>
				<Text fontSize={3}>{message}</Text>
			</Alert>
		</div>
	)
}
