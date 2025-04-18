/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/homepage',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',        // optional
        pathname: '/**'  // optional glob
      },
      {
        protocol: 'https',
        hostname: '8cwjitzn74nbffam.public.blob.vercel-storage.com',
        port: '',        // optional
        pathname: '/**'  // optional glob
      }
    ]
  }
}

export default nextConfig