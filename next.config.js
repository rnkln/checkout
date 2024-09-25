import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const withVanillaExtract = createVanillaExtractPlugin()

export default withVanillaExtract({
	output: 'export',
	swcMinify: true,
	generateEtags: false,
	reactStrictMode: true,
	poweredByHeader: false,
	experimental: {
		instrumentationHook: true
	},
	images: {
		disableStaticImages: true
	},
	eslint: {
		ignoreDuringBuilds: true
	},
	typescript: {
		ignoreBuildErrors: true
	},
	/** @param {import('webpack').Configuration} config */
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: /\.tsx?$/,
			use: [
				{
					loader: '@svgr/webpack',
					options: { ext: 'tsx', ref: true, typescript: true }
				}
			]
		})

		return config
	}
})
