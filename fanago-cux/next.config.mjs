/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'ec2-18-138-241-145.ap-southeast-1.compute.amazonaws.com',
        port: "8080",
        pathname: '/api/v1/media/get/**',
      },
      {
        protocol: 'https',
        hostname: 'ticket-master-swiftie-media.s3.ap-southeast-1.amazonaws.com',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig