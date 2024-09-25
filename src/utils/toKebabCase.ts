export type KebabCase<
	T extends string,
	S extends string = ' ' | '.' | '_'
> = T extends `${infer Char}${infer Rest}`
	? Char extends S
		? `-${KebabCase<Rest>}`
		: `${Char extends Capitalize<Char>
				? '-'
				: ''}${Lowercase<Char>}${KebabCase<Rest>}`
	: T

export const toKebabCase = <T extends string>(value: T) =>
	value
		.replace(/(\s|\.|_)/g, '-')
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.toLowerCase() as KebabCase<T>
