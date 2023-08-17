import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify/functions";
import tailwind from "@astrojs/tailwind";
import AstroPWA from "@vite-pwa/astro";

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
  integrations: [tailwind(), AstroPWA({
    mode: "development",
    base: "/",
    scope: "/",
    includeAssets: ["favicon.ico"],
    registerType: "autoUpdate",
    manifest: {
      theme_color: "#fff",
      background_color: "#fff",
      display: "standalone",
      start_url: "/",
      name: "APBN",
      short_name: "APBN",
      description: "A body of bodies",
      icons: [{
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      }, {
        src: "/icon-256x256.png",
        sizes: "256x256",
        type: "image/png"
      }, {
        src: "/icon-384x384.png",
        sizes: "384x384",
        type: "image/png"
      }, {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }]
    },
    workbox: {
      navigateFallback: "/404",
      globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"]
    },
    enabled: true,
    navigateFallbackAllowlist: [/^\/404$/]
  })],
  experimental: { assets: true }
});