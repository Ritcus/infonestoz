import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Info Nest Oz',
    short_name: 'InfoNest',
    description: "Know What's Next",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    "icons": [
      {
        "src": "/icons/icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png",
      },
      {
        "src": "/icons/icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
      }
    ],
      "screenshots": [
        {
          "src": "/screenshots/desktop.png",
          "sizes": "1280x800",
          "type": "image/png",
          "form_factor": "wide"
        },
        {
          "src": "/screenshots/mobile.png",
          "sizes": "375x812",
          "type": "image/png",
          "form_factor": "narrow"
        }
      ]
  }
}