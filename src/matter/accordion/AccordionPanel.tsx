import { useRef, type ReactNode, type ElementType } from 'react'

import { useId } from '../utils/useId'
import { Flex } from '../flex'
import { Text } from '../typography'
import { ButtonBase } from '../button'

import { AccordionChevron } from './AccordionChevron'
import { useAccordionPanelAnimation } from './useAccordionPanelAnimation'
import * as classes from './AccordionPanel.css'

export type AccordionPanelProps = {
	id?: string
	icon?: ElementType<{ expanded: boolean; className?: string }> | false
	title: ReactNode
	children: ReactNode
	expanded?: boolean
	disabled?: boolean
	'data-test-id'?: string
	onChange?: () => void
	onExpanded?: () => void
	onCollapsed?: () => void
}

export const AccordionPanel = ({
	id: idProp,
	icon: Icon = AccordionChevron,
	title,
	children,
	expanded = false,
	disabled,
	'data-test-id': dataTestId,
	onChange,
	onExpanded,
	onCollapsed,
	...otherProps
}: AccordionPanelProps) => {
	const id = useId(idProp)

	const headerId = `${id}-header`

	const contentId = `${id}-content`
	const contentRef = useRef<HTMLDivElement>(null)
	const contentStyle = useAccordionPanelAnimation(contentRef, {
		expanded,
		onExpanded,
		onCollapsed
	})

	return (
		<Flex
			id={id}
			flexDirection="column"
			className={classes.accordionPanelRoot}
			data-test-id={dataTestId}
			{...otherProps}
		>
			<Flex
				id={headerId}
				as={ButtonBase}
				gap={1}
				disabled={disabled}
				alignItems="center"
				className={classes.accordionPanelHeader}
				aria-expanded={expanded}
				aria-controls={contentId}
				onClick={onChange}
			>
				{Icon !== false && (
					<Icon
						expanded={expanded}
						className={classes.accordionPanelIcon}
					/>
				)}

				<Text color="primary" fontSize={3} fontWeight="medium">
					{title}
				</Text>
			</Flex>

			<div
				id={contentId}
				ref={contentRef}
				role="region"
				style={contentStyle}
				aria-hidden={!expanded}
				aria-labelledby={headerId}
				inert={!expanded}
			>
				<div className={classes.accordionPanelInner}>{children}</div>
			</div>
		</Flex>
	)
}
