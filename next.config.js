/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/auth', destination: '/dash/auth/login', permanent: false },
      { source: '/user', destination: '/dash/user/home', permanent: false },
      // This controls the redirect.
      { source: '/', destination: '/landing', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/pahJQQm.png'
      }
    ]
  },
  i18n: {
    locales: ['en', 'cn'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
