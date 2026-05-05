<template>
  <div class="qr-preview">
    <h2 class="preview-title">Vista Previa</h2>
    <div class="qr-container">
      <QRCodeVue3
        :key="qrKey"
        :value="content"
        :width="size"
        :height="size"
        :margin="margin"
        :qrOptions="{ errorCorrectionLevel: errorCorrection }"
        :dotsOptions="{ type: 'square', color: darkColor }"
        :backgroundOptions="{ color: lightColor }"
        :cornersSquareOptions="{ type: 'square', color: darkColor }"
        :cornersDotOptions="{ color: darkColor }"
      />
    </div>
    
    <div class="preview-info">
      <p class="info-text">Tamaño: {{ size }}px</p>
      <p class="info-text">Corrección: {{ errorCorrection }}</p>
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
import { ref, computed } from 'vue'
import QRCodeVue3 from 'qrcode-vue3'
import QRCodeStyling from 'qr-code-styling'

const props = defineProps({
  content: { type: String, default: '' },
  size: { type: Number, default: 250 },
  margin: { type: Number, default: 2 },
  errorCorrection: { type: String, default: 'M' },
  darkColor: { type: String, default: '#000000' },
  lightColor: { type: String, default: '#ffffff' }
})

const filename = ref('qr_code')

const qrKey = computed(() => {
  return `${props.content}-${props.size}-${props.darkColor}-${props.lightColor}-${props.errorCorrection}`
})

const downloadPNG = () => {
  const qrCode = new QRCodeStyling({
    data: props.content || 'https://example.com',
    width: props.size,
    height: props.size,
    margin: props.margin,
    qrOptions: { errorCorrectionLevel: props.errorCorrection },
    dotsOptions: { type: 'square', color: props.darkColor },
    backgroundOptions: { color: props.lightColor },
    cornersSquareOptions: { type: 'square', color: props.darkColor },
    cornersDotOptions: { color: props.darkColor }
  })
  qrCode.download({ name: filename.value, extension: 'png' })
}

const downloadJPG = () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = props.size
  canvas.height = props.size
  
  ctx.fillStyle = props.lightColor
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  const qrCode = new QRCodeStyling({
    data: props.content || 'https://example.com',
    width: props.size,
    height: props.size,
    margin: props.margin,
    qrOptions: { errorCorrectionLevel: props.errorCorrection },
    dotsOptions: { type: 'square', color: props.darkColor },
    backgroundOptions: { color: props.lightColor },
    cornersSquareOptions: { type: 'square', color: props.darkColor },
    cornersDotOptions: { color: props.darkColor }
  })
  
  qrCode.getRawData('png').then(blob => {
    const img = new Image()
    const url = URL.createObjectURL(blob)
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      const link = document.createElement('a')
      link.download = `${filename.value}.jpg`
      link.href = canvas.toDataURL('image/jpeg', 0.9)
      link.click()
      URL.revokeObjectURL(url)
    }
    img.src = url
  })
}

const downloadSVG = () => {
  const qrCode = new QRCodeStyling({
    data: props.content || 'https://example.com',
    width: props.size,
    height: props.size,
    margin: props.margin,
    qrOptions: { errorCorrectionLevel: props.errorCorrection },
    dotsOptions: { type: 'square', color: props.darkColor },
    backgroundOptions: { color: props.lightColor },
    cornersSquareOptions: { type: 'square', color: props.darkColor },
    cornersDotOptions: { color: props.darkColor }
  })
  qrCode.download({ name: filename.value, extension: 'svg' })
}
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
  color: white;
}

.btn-png { background: #3498db; }
.btn-jpg { background: #e74c3c; }
.btn-svg { background: #2ecc71; }

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
