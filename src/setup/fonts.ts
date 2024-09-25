import localFont from 'next/font/local'

export const SharpGrotesk = localFont({
	src: [
		{
			path: '../../public/fonts/SharpGroteskBook19.woff2',
			style: 'normal',
			weight: '400'
		},
		{
			path: '../../public/fonts/SharpGroteskMedium19.woff2',
			style: 'normal',
			weight: '500'
		}
	],
	display: 'swap',
	variable: '--font-family-sharp-grotesk',
	adjustFontFallback: 'Arial'
})
