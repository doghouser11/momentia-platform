
/** @type {import('next').NextConfig} */

const nextConfig = {

serverExternalPackages: ['prisma'],

images: {

remotePatterns: [

{

protocol: 'https',

hostname: 'localhost',

},

{

protocol: 'https',

hostname: 'momentia.online',

},

{

protocol: 'http',

hostname: 'localhost',

}

],

},

}

module.exports = nextConfig

