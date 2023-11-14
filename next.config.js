require('dotenv').config();
const withPWA = require('@ducanh2912/next-pwa').default({
	dest: 'public',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		appDir: true,
	},
};

module.exports = withPWA(nextConfig);
