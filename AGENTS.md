# AGENTS.md

Generador QR estático con Vue 3 + Vite, desplegado en GitHub Pages.

- Responde siempre en español.
- Usar `qrcode-vue3` para generación de QR (basado en QRCodeStyling).
- Para descargas, importar `QRCodeStyling` desde `qr-code-styling` (instalado como dependencia separada).
- Reactividad del QR: usar `:key` dinámico basado en props cambiantes.
- Despliegue automático en GitHub Pages con base relativa `/qrgen_demo/`.
- Comandos: `npm run dev`, `npm run build`, `npm run deploy`.
- Estructura: `src/components/QRGenerator.vue`, `src/components/QRPreview.vue`, `src/App.vue`.
- Tema claro/oscuro gestionado via `src/composables/useTheme.js`.
