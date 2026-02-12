import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/studio/',
            },
            {
                userAgent: 'Googlebot-Image',
                allow: ['/favicon*', '/apple-touch-icon.png'],
            },
        ],
        sitemap: 'https://lecrinduvignoble.alsace/sitemap.xml',
    }
}
