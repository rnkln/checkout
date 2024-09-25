import type { ReactNode } from 'react'
import { Card } from '@matter/card'
import { Flex } from '@matter/flex'

import * as classes from './View.css'

export type ViewProps = {
	children: ReactNode
}

export const View = ({ children }: ViewProps) => (
	<Card as={Flex} padding={0} flexDirection="column" className={classes.root}>
		{children}
	</Card>
)
