import type { ReactNode } from 'react'
import { Flex } from '@matter/flex'

import * as classes from './ViewContent.css'

export type ViewContentProps = {
	children: ReactNode
}

export const ViewContent = ({ children }: ViewContentProps) => (
	<Flex gap={2} flexDirection="column" className={classes.root}>
		{children}
	</Flex>
)
