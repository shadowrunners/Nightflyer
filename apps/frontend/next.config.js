// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextIntl = require('next-intl/plugin')(
	// This is the default (also the `src` folder is supported out of the box)
	'./src/utils/i18n.ts',
);

/** @type {import('next').NextConfig} */
module.exports = withNextIntl({
	reactStrictMode: true,
	swcMinify: true,
	async redirects() {
		return [
			{ source: '/auth', destination: '/auth/login', permanent: false },
			{ source: '/user', destination: '/dash/user/home', permanent: false },
			// { source: '/', destination: '/landing', permanent: true },
		];
	},
	images: {
		domains: ['i.imgur.com', 'cdn.discordapp.com', 'res.cloudinary.com'],
		unoptimized: true,
	},
	// Disables type validity.
	// Pretty much a fucking necessity now since it spits out errors up the ass that I just can't be bothered to fix.
	typescript: {
		ignoreBuildErrors: false,
	},
	eslint: {
		// Temporary change for preview builds, so they can be previewed on devices outside my dev environment. :)
		ignoreDuringBuilds: true,
	},
});