<template>
  <div class="qr-preview">
    <h2 class="preview-title">Vista Previa</h2>
    <div class="qr-container" v-html="qrSvg"></div>
    
    <div class="preview-info">
      <p class="info-text">Tamaño: {{ currentSize }}px</p>
      <p class="info-text">Corrección: {{ currentError }}</p>
    </div>
    
    <div class="download-section">
      <h3 class="download-title">Descargar</h3>
      <div class="download-buttons">
        <button class="btn-download btn-png" @click="downloadPNG">
          Descargar PNG
        </button>
        <button class="btn-download btn-jpg" @click="downloadJPG">
          Descargar JPG
        </button>
        <button class="btn-download btn-svg" @click="downloadSVG">
          Descargar SVG
        </button>
      </div>
      <div class="filename-input">
        <label for="filename">Nombre del archivo:</label>
        <input 
          id="filename" 
          v-model="filename" 
          placeholder="qr_code" 
          class="input-field small"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  content: String,
  size: Number,
  margin: Number,
  errorCorrection: String,
  darkColor: String,
  lightColor: String
})

const filename = ref('qr_code')
const qrSvg = ref('')

const currentSize = computed(() => props.size || 250)
const currentError = computed(() => props.errorCorrection || 'M')

// Generar QR como SVG
const generateQR = () => {
  const qr = new URLSearchParams()
  qr.append('data', props.content || 'https://example.com')
  qr.append('size', String(currentSize.value))
  qr.append('margin', String(props.margin || 2))
  qr.append('color', props.darkColor || '#000000')
  qr.append('bgcolor', props.lightColor || '#ffffff')
  
  // Usar Google Chart API para QR (simple y confiable)
  const url = `https://chart.googleapis.com/chart?cht=qr&chs=${currentSize.value}x${currentSize.value}&chl=${encodeURIComponent(props.content || 'https://example.com')}&chco=${encodeURIComponent((props.darkColor || '#000000').replace('#', ''))}&chf=bg,s,${encodeURIComponent((props.lightColor || '#ffffff').replace('#', ''))}`
  
  qrSvg.value = `<img src="${url}" alt="QR Code" style="max-width:100%; height:auto;" />`
}

watch(() => [props.content, props.size, props.darkColor, props.lightColor, props.margin], () => {
  generateQR()
}, { immediate: true, deep: true })

onMounted(() => {
  generateQR()
})

const downloadPNG = () => {
  const img = qrContainer.value?.querySelector('img')
  if (!img) return
  
  const canvas = document.createElement('canvas')
  canvas.width = currentSize.value
  canvas.height = currentSize.value
  const ctx = canvas.getContext('2d')
  
  const image = new Image()
  image.crossOrigin = 'anonymous'
  image.onload = () => {
    ctx.drawImage(image, 0, 0)
    const link = document.createElement('a')
    link.download = `${filename.value}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }
  image.src = img.src
}

const downloadJPG = () => {
  const img = qrContainer.value?.querySelector('img')
  if (!img) return
  
  const canvas = document.createElement('canvas')
  canvas.width = currentSize.value
  canvas.height = currentSize.value
  const ctx = canvas.getContext('2d')
  
  // Fondo blanco para JPG
  ctx.fillStyle = props.lightColor || '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  const image = new Image()
  image.crossOrigin = 'anonymous'
  image.onload = () => {
    ctx.drawImage(image, 0, 0)
    const link = document.createElement('a')
    link.download = `${filename.value}.jpg`
    link.href = canvas.toDataURL('image/jpeg', 0.9)
    link.click()
  }
  image.src = img.src
}

const downloadSVG = () => {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${currentSize.value}" height="${currentSize.value}">
    <image href="${qrContainer.value?.querySelector('img')?.src || ''}" width="${currentSize.value}" height="${currentSize.value}"/>
  </svg>`
  
  const blob = new Blob([svgContent], { type: 'image/svg+xml' })
  const link = document.createElement('a')
  link.download = `${filename.value}.svg`
  link.href = URL.createObjectURL(blob)
  link.click()
  URL.revokeObjectURL(link.href)
}

const qrContainer = ref(null)
</script>

<style scoped>
.qr-preview {
  text-align: center;
}

.preview-title {
  font-size: 1.2rem;
  color: var(--text-primary, #2c3e50);
  margin-bottom: 2rem;
  font-weight: 600;
}

.qr-container {
  background: var(--qr-bg, #ffffff);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  display: inline-block;
  margin-bottom: 1.5rem;
  min-width: 250px;
  min-height: 250px;
}

.preview-info {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.info-text {
  font-size: 0.85rem;
  color: var(--text-secondary, #7f8c8d);
}

.download-section {
  background: var(--panel-bg, #fff);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  max-width: 400px;
  margin: 0 auto;
}

.download-title {
  font-size: 1rem;
  color: var(--text-primary, #2c3e50);
  margin-bottom: 1rem;
  font-weight: 600;
}

.download-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-download {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-png {
  background: #3498db;
  color: white;
}

.btn-jpg {
  background: #e74c3c;
  color: white;
}

.btn-svg {
  background: #2ecc71;
  color: white;
}

.btn-download:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.filename-input {
  text-align: left;
}

.filename-input label {
  display: block;
  font-size: 0.8rem;
  color: var(--text-secondary, #7f8c8d);
  margin-bottom: 0.3rem;
}

.input-field.small {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 6px;
  font-size: 0.85rem;
  background: var(--input-bg, #fff);
  color: var(--text-primary, #333);
}
</style>
