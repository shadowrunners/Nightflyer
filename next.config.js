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
	},
	eslint: {
		// Temporary change for preview builds so they can be previewed devices outside of my dev environment. :)
		ignoreDuringBuilds: true,
	},
});
