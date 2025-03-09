/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack: (config, { dev }) => {
		if (dev) config.optimization.minimize = false; // Ensure proper HMR
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*",
				port: "",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
