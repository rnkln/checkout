export const toUrlParams = (
	value: Record<string, string | boolean | undefined | null>
) => {
	const sanitised = Object.fromEntries(
		Object.entries(value)
			.filter(
				(entry): entry is [string, string | boolean] =>
					entry[1] !== null && entry[1] !== undefined
			)
			.map((entry) => [entry[0], entry[1].toString()])
	) as Record<string, string>

	return new URLSearchParams(sanitised).toString()
}
