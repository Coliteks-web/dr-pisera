/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.drpisera.pro',
  generateRobotsTxt: true, // tworzy też robots.txt
  exclude: ['/start'],      // wykluczony adres URL
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.drpisera.pro/sitemap.xml',
    ],
  },
};
