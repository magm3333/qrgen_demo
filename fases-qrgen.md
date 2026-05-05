# Plan de Desarrollo: QRGen Demo

**Repositorio:** magm3333/qrgen_demo  
**Tecnologías:** Vue 3 + Vite  
**Despliegue:** GitHub Pages (estático)  
**Referencia visual:** [magm3333.github.io/qrgen](https://magm3333.github.io/qrgen) - Split-View de 2 columnas

---

- [x] **Fase 1: Estructura Base + Auto-deploy**
  - [x] Scaffold con Vite configurado para GitHub Pages
  - [x] Configurar `vite.config.js` con base relativa (`base: '/qrgen_demo/'`)
  - [x] Crear estructura de carpetas (`src/components`, `src/composables`, `src/assets`, `src/utils`)
  - [x] Configurar GitHub Actions para despliegue automático a `gh-pages`
  - [x] Crear README con documentación inicial
  - [x] Commit inicial y push a repositorio remoto
  - [x] Verificar despliegue exitoso en https://magm3333.github.io/qrgen_demo/

---

- [x] **Fase 2: Generación QR MVP (Split-View)**
  - [x] Instalar `qrcode-vue3` (basado en QRCodeStyling para mayor control)
  - [x] Layout de 2 columnas (Split-View) profesional:
    - [x] **Izquierda:** Panel de configuración (input texto/URL, corrección de error, colores)
    - [x] **Derecha:** Vista previa del QR en tiempo real
  - [x] Componente `QRGenerator.vue`:
    - [x] Input reactivo para el contenido
    - [x] Opciones: tamaño, margen, nivel de corrección (`L/M/Q/H`)
    - [x] Vista previa usando `<QRCodeVue3>`
  - [x] Estilos profesionales con diseño limpio y moderno

---

- [x] **Fase 3: Descargas + Temas (Oscuro/Claro)**
  - [x] **Descargas:**
    - [x] Botones de descarga para PNG (nativo)
    - [x] Botones de descarga para JPG (canvas toDataURL)
    - [x] Botón de descarga para SVG
    - [x] Opción de elegir nombre de archivo
  - [x] **Temas:**
    - [x] Composable `useTheme.js` con detección de preferencia del sistema
    - [x] Toggle manual con persistencia en `localStorage`
    - [x] Variables CSS globales para colores de ambos temas
    - [x] Estilos adaptados para tema claro (fondo blanco, texto oscuro)
    - [x] Estilos adaptados para tema oscuro (fondo #1a1a1a, texto claro)

---

### Qué probar en la UI (Fase 2 + 3):
1. **Generación reactiva:** Escribe en el textarea → El QR se actualiza al instante
2. **Cambio de colores:** Selecciona color QR y fondo → Vista previa cambia en tiempo real
3. **Tamaño y margen:** Ajusta los valores numéricos → El QR se redimensiona
4. **Corrección de error:** Cambia L/M/Q/H → Observa cambios en el QR
5. **Descargas:** Click en PNG/JPG/SVG → Se descarga con el nombre especificado
6. **Tema oscuro:** Click en 🌙 → Cambia a tema dark, se persiste en localStorage
7. **Responsive:** Reduce el ancho de ventana → Split-view se apila verticalmente

---

- [x] **Fase 4: Editor de Plantillas (Template Editor)**
  - [x] Componente `TemplateEditor.vue`
  - [x] **Upload de imagen base:** Drag & drop o selector de archivo
  - [x] **Canvas editor:**
    - [x] Renderizar imagen de fondo
    - [x] Superponer QR generado automáticamente
    - [x] Controles interactivos:
      - [x] **Mover:** Drag & drop del QR sobre la imagen
      - [x] **Redimensionar:** Esquinas arrastrables o input numérico
      - [x] **Rotar:** Slider o input de grados (0-360°)
  - [x] **Exportación:**
    - [x] **SVG:** Usar `html-to-image` para renderizar SVG final
    - [x] **PNG:** Renderizar canvas compuesto y exportar
  - [x] Evaluar librerías: `html-to-image` instalado y utilizado

---

- [ ] **Fase 5: Login / Logout)**
  - [ ] Evaluar opciones livianas para sitio estático:
    - [ ] **GitHub OAuth** (vía `next-auth` o similar en serverless)
    - [ ] **Firebase Auth** (email/password + Google)
    - [ ] **Supabase Auth** (gratis y fácil integración)
  - [ ] Flujo:
    - [ ] Botón Login en header
    - [ ] Modal de autenticación
    - [ ] Guardar estado en `localStorage` o `sessionStorage`
    - [ ] Logout limpia el estado
  - [ ] **Nota:** Como es sitio estático, la auth puede ser simulada o usar un BaaS ligero

---

- [ ] **Fase 6: Ajustes y Agregados Finales)**
  - [ ] **Exportación de Plantillas:**
    - [ ] Guardar configuración de plantilla (posición QR, tamaño, rotación, imagen base) como JSON
    - [ ] Cargar plantilla desde archivo JSON
    - [ ] Shareable templates (URL con estado codificado en base64)
  - [ ] **Mejoras adicionales:**
    - [ ] **Historial:** Últimos 10 QR generados (localStorage)
    - [ ] **QR con logo:** Opción de centrar un logo pequeño en el QR
    - [ ] **Estilos de puntos:** Elegir entre square, dots, rounded, classy
    - [ ] **Descargar SVG del QR puro** (sin plantilla)
    - [ ] **PWA:** Agregar manifest y service worker para uso offline
    - [ ] **Analytics:** Agregar Plausible/Umami para estadísticas de uso
    - [ ] **i18n:** Soporte multiidioma (ES/EN mínimamente)

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
