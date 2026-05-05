# Plan de Desarrollo: QRGen Demo

**Repositorio:** magm3333/qrgen_demo  
**Tecnologías:** Vue 3 + Vite  
**Despliegue:** GitHub Pages (estático)  
**Referencia visual:** [magm3333.github.io/qrgen](https://magm3333.github.io/qrgen) - Split-View de 2 columnas

---

## Fase 1: Estructura Base + Auto-deploy

**Objetivo:** Proyecto funcional con despliegue automático.

- Scaffold con Vite: `npm create vite@latest . -- --template vue`
- Configurar `vite.config.js` para base relativa (`base: '/qrgen_demo/'`)
- Strucutra de carpetas:
  ```
  src/
    components/    # Componentes Vue
    composables/    # Lógica reutilizable
    assets/         # Imágenes y estilos
    utils/          # Funciones auxiliares
  ```
- GitHub Actions para despliegue automático a `gh-pages`:
  - Build con `npm run build`
  - Deploy con `peaceiris/actions-gh-pages@v3`
- README con badges de despliegue

---

## Fase 2: Generación QR MVP (Split-View)

**Objetivo:** Generador básico funcional imitando el diseño de referencia.

- Instalar `qrcode-vue3` (basado en QRCodeStyling para mayor control)
  ```bash
  npm install qrcode-vue3
  ```
- Layout de 2 columnas (Split-View):
  - **Izquierda:** Panel de configuración (input texto/URL, corrección de error, colores)
  - **Derecha:** Vista previa del QR en tiempo real
- Componente `QRGenerator.vue`:
  - Input reactivo para el contenido
  - Opciones: tamaño, margen, nivel de corrección (`L/M/Q/H`)
  - Vista previa usando `<QRCodeVue3>`
- Estilos: Replicar el look minimalista de la referencia

---

## Fase 3: Descargas + Temas (Oscuro/Claro)

**Objetivo:** Exportar QR y soporte completo de temas.

### Descargas:
- Botones de descarga para:
  - **PNG** (usando `qrcode-vue3` download nativo)
  - **JPG** (renderizado a canvas y exportación con `toDataURL('image/jpeg')`)
- Opción de elegir nombre de archivo

### Temas:
- Composable `useTheme.js`:
  - Detectar preferencia del sistema (`prefers-color-scheme`)
  - Toggle manual con persistencia en `localStorage`
- Variables CSS globales para colores de ambos temas
- Estilos del Split-View adaptados para:
  - **Tema claro:** Fondo blanco, texto oscuro
  - **Tema oscuro:** Fondo dark (#1a1a1a), texto claro

---

## Fase 4: Editor de Plantillas (Template Editor)

**Objetivo:** Subir imagen, superponer QR y exportar.

- Componente `TemplateEditor.vue`:
  - **Upload de imagen base:** Drag & drop o selector de archivo
  - **Canvas editor:**
    - Renderizar imagen de fondo
    - Superponer QR generado automáticamente
    - Controles interactivos:
      - **Mover:** Drag & drop del QR sobre la imagen
      - **Redimensionar:** Esquinas arrastrables o input numérico
      - **Rotar:** Slider o input de grados (0-360°)
  - **Exportación:**
    - **SVG:** Usar `<foreignObject>` o librería para renderizar SVG final
    - **PNG:** Renderizar canvas compuesto y exportar
- Librerías sugeridas:
  - `fabric.js` o `konva.js` para manipulación de canvas (opcional, se puede hacer manual)
  - Usar `html-to-image` o `dom-to-image-more` para capturar el resultado

---

## Fase 5: Login / Logout

**Objetivo:** Autenticación para funciones premium o guardado de plantillas.

- Evaluar opciones livianas para sitio estático:
  - **GitHub OAuth** (vía `next-auth` o similar en serverless)
  - **Firebase Auth** (email/password + Google)
  - **Supabase Auth** (gratis y fácil integración)
- Flujo:
  - Botón Login en header
  - Modal de autenticación
  - Guardar estado en `localStorage` o `sessionStorage`
  - Logout limpia el estado
- **Nota:** Como es sitio estático, la auth puede ser simulada o usar un BaaS ligero

---

## Fase 6: Ajustes y Agregados Finales

**Objetivo:** Pulir y agregar funcionalidades avanzadas.

### Exportación de Plantillas:
- Guardar configuración de plantilla (posición QR, tamaño, rotación, imagen base) como JSON
- Cargar plantilla desde archivo JSON
- Shareable templates (URL con estado codificado en base64)

### Mejoras adicionales:
- **Historial:** Últimos 10 QR generados (localStorage)
- **QR con logo:** Opción de centrar un logo pequeño en el QR
- **Estilos de puntos:** Elegir entre square, dots, rounded, classy
- **Descargar SVG del QR puro** (sin plantilla)
- **PWA:** Agregar manifest y service worker para uso offline
- **Analytics:** Agregar Plausible/Umami para estadísticas de uso
- **i18n:** Soporte multiidioma (ES/EN mínimamente)

---

## Dependencias Clave

```json
{
  "dependencies": {
    "vue": "^3.4",
    "qrcode-vue3": "^3.9",
    "html-to-image": "^1.11"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0",
    "vite": "^5.0"
  }
}
```

---

## Notas Técnicas

- **Split-View:** Usar CSS Grid o Flexbox con `min-width` para responsive
- **QR Code:** `qrcode-vue3` permite estilizado avanzado (dots, corners, gradientes)
- **Editor de plantillas:** Priorizar implementación manual ligera sobre librerías pesadas
- **GitHub Pages:** Recuerda configurar la base en Vite para rutas relativas
- **Temas:** Usar `data-theme="dark"` en `<html>` para cambio global
