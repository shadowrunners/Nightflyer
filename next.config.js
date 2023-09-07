/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	async redirects() {
		return [
			{ source: '/auth', destination: '/auth/signin', permanent: false },
			{ source: '/user', destination: '/dash/user/home', permanent: false },
			{ source: '/', destination: '/landing', permanent: true },
		];
	},
	images: {
		domains: ['i.imgur.com', 'cdn.discordapp.com', 'res.cloudinary.com'],
	},
	i18n: {
		locales: ['en', 'cn'],
		defaultLocale: 'en',
	},
	eslint: {
		// Temporary change for preview builds so they can be previewed devices outside of my dev environment. :)
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
