import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const config: NextConfig = {
    reactStrictMode: true,
};

export default withNextIntl(config);