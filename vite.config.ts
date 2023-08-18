import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  // server: { https: true },
  // base: '/Hughs-Project/',
  plugins: [react(), VitePWA({
    registerType: "prompt",
    includeAssets: ["favicon.ico", "apple-touch-icon.png"],
    manifest: {
      name: "Hughs-Project",
      short_name: "Hughs-Project",
      description: "Hughs-Project using react and typescript",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
          purpose: "apple touch icon",
        },
      ],
      theme_color: "#171717",
      background_color: "#e8ebf2",
      display: "standalone",
      scope: "/",
      start_url: "/",
      orientation: "portrait",
    },
  })],
})

