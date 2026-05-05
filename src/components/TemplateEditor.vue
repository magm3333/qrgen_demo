<template>
  <div class="template-editor">
    <h2 class="editor-title">Editor de Plantillas</h2>
    
    <div class="editor-layout">
      <div class="editor-controls">
        <div class="upload-section">
          <h3>Imagen de Fondo</h3>
          <div 
            class="upload-area" 
            @dragover.prevent="onDragOver"
            @dragleave.prevent="onDragLeave"
            @drop.prevent="onDrop"
            :class="{ 'drag-over': isDragging }"
            @click="triggerFileInput"
          >
            <input 
              ref="fileInput" 
              type="file" 
              accept="image/*" 
              style="display: none"
              @change="onFileSelected"
            />
            <p v-if="!backgroundImage">Arrastra una imagen aquí o haz clic para seleccionar</p>
            <p v-else class="file-name">{{ backgroundName }}</p>
          </div>
        </div>

        <div class="qr-controls">
          <h3>Controles QR</h3>
          
          <div class="control-group">
            <label>Posición X: {{ qrPosition.x }}px</label>
            <input type="range" v-model.number="qrPosition.x" :min="0" :max="editorWidth - qrSize" />
          </div>
          
          <div class="control-group">
            <label>Posición Y: {{ qrPosition.y }}px</label>
            <input type="range" v-model.number="qrPosition.y" :min="0" :max="editorHeight - qrSize" />
          </div>
          
          <div class="control-group">
            <label>Tamaño: {{ qrSize }}px</label>
            <input type="range" v-model.number="qrSize" :min="50" :max="400" />
          </div>
          
          <div class="control-group">
            <label>Rotación: {{ qrRotation }}°</label>
            <input type="range" v-model.number="qrRotation" :min="0" :max="360" />
          </div>
          
          <div class="control-group">
            <label>Color QR:</label>
            <input type="color" v-model="qrDarkColor" />
          </div>
          
          <div class="control-group">
            <label>Color Fondo QR:</label>
            <input type="color" v-model="qrLightColor" />
          </div>
        </div>

        <div class="export-section">
          <h3>Exportar</h3>
          <div class="export-buttons">
            <button class="btn-export btn-png" @click="exportPNG">Exportar PNG</button>
            <button class="btn-export btn-svg" @click="exportSVG">Exportar SVG</button>
          </div>
        </div>
      </div>

      <div class="editor-preview">
        <div 
          ref="editorArea"
          class="editor-area"
          :style="{ width: editorWidth + 'px', height: editorHeight + 'px' }"
          @mousedown="startDrag"
          @mousemove="onDrag"
          @mouseup="stopDrag"
          @mouseleave="stopDrag"
        >
          <img 
            v-if="backgroundImage" 
            :src="backgroundImage" 
            class="background-image"
            :style="{ width: editorWidth + 'px', height: editorHeight + 'px' }"
            draggable="false"
          />
          
          <div
            ref="qrOverlay"
            class="qr-overlay"
            :style="{
              left: qrPosition.x + 'px',
              top: qrPosition.y + 'px',
              width: qrSize + 'px',
              height: qrSize + 'px',
              transform: 'rotate(' + qrRotation + 'deg)'
            }"
          >
            <QRCodeVue3
              :value="qrContent"
              :width="qrSize"
              :height="qrSize"
              :dotsOptions="{ type: 'square', color: qrDarkColor }"
              :backgroundOptions="{ color: qrLightColor }"
              :cornersSquareOptions="{ type: 'square', color: qrDarkColor }"
              :cornersDotOptions="{ color: qrDarkColor }"
            />
          </div>
        </div>
        <p class="hint">Arrastra el QR para moverlo</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import QRCodeVue3 from 'qrcode-vue3'
import { toPng, toSvg } from 'html-to-image'

const props = defineProps({
  content: { type: String, default: 'https://example.com' },
  darkColor: { type: String, default: '#000000' },
  lightColor: { type: String, default: '#ffffff' },
  size: { type: Number, default: 150 }
})

const qrContent = ref(props.content)

watch(() => props.content, (newVal) => { qrContent.value = newVal })
watch(() => props.darkColor, (newVal) => { qrDarkColor.value = newVal })
watch(() => props.lightColor, (newVal) => { qrLightColor.value = newVal })
watch(() => props.size, (newVal) => { qrSize.value = newVal })

const backgroundImage = ref(null)
const backgroundName = ref('')
const isDragging = ref(false)
const fileInput = ref(null)
const editorArea = ref(null)
const qrOverlay = ref(null)

const editorWidth = ref(500)
const editorHeight = ref(400)

const qrPosition = reactive({ x: 150, y: 100 })
const qrSize = ref(props.size || 150)
const qrRotation = ref(0)
const qrDarkColor = ref(props.darkColor || '#000000')
const qrLightColor = ref(props.lightColor || '#ffffff')

let isDraggingQR = false
let dragOffset = { x: 0, y: 0 }

const triggerFileInput = () => {
  fileInput.value.click()
}

const onDragOver = () => { isDragging.value = true }
const onDragLeave = () => { isDragging.value = false }

const onDrop = (e) => {
  isDragging.value = false
  const file = e.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    loadImage(file)
  }
}

const onFileSelected = (e) => {
  const file = e.target.files[0]
  if (file) loadImage(file)
}

const loadImage = (file) => {
  backgroundName.value = file.name
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      editorWidth.value = Math.min(img.width, 800)
      editorHeight.value = Math.min(img.height, 600)
      backgroundImage.value = e.target.result
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
}

const startDrag = (e) => {
  if (e.target.closest('.qr-overlay')) {
    isDraggingQR = true
    const rect = qrOverlay.value.getBoundingClientRect()
    dragOffset.x = e.clientX - rect.left
    dragOffset.y = e.clientY - rect.top
  }
}

const onDrag = (e) => {
  if (!isDraggingQR) return
  const editorRect = editorArea.value.getBoundingClientRect()
  let newX = e.clientX - editorRect.left - dragOffset.x
  let newY = e.clientY - editorRect.top - dragOffset.y
  
  newX = Math.max(0, Math.min(newX, editorWidth.value - qrSize.value))
  newY = Math.max(0, Math.min(newY, editorHeight.value - qrSize.value))
  
  qrPosition.x = Math.round(newX)
  qrPosition.y = Math.round(newY)
}

const stopDrag = () => { isDraggingQR = false }

const exportPNG = () => {
  if (!editorArea.value) return
  toPng(editorArea.value, { backgroundColor: '#ffffff' })
    .then(dataUrl => {
      const link = document.createElement('a')
      link.download = 'template.png'
      link.href = dataUrl
      link.click()
    })
}

const exportSVG = () => {
  if (!editorArea.value) return
  toSvg(editorArea.value, { backgroundColor: '#ffffff' })
    .then(svgDataUrl => {
      const link = document.createElement('a')
      link.download = 'template.svg'
      link.href = svgDataUrl
      link.click()
    })
}

onMounted(() => {
  qrContent.value = props.content
})

onUnmounted(() => {
  stopDrag()
})
</script>

<style scoped>
.template-editor {
  padding: 1rem;
}

.editor-title {
  font-size: 1.2rem;
  color: var(--text-primary, #2c3e50);
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.editor-layout {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.editor-controls {
  flex: 1;
  min-width: 300px;
}

.upload-section, .qr-controls, .export-section {
  background: var(--panel-bg, #fff);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  margin-bottom: 1rem;
}

.upload-section h3, .qr-controls h3, .export-section h3 {
  font-size: 1rem;
  color: var(--text-primary, #2c3e50);
  margin-bottom: 1rem;
  font-weight: 600;
}

.upload-area {
  border: 2px dashed var(--border-color, #ddd);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--preview-bg, #f8f9fa);
}

.upload-area:hover, .upload-area.drag-over {
  border-color: var(--accent-color, #3498db);
  background: rgba(52, 152, 219, 0.05);
}

.upload-area p {
  color: var(--text-secondary, #7f8c8d);
  font-size: 0.9rem;
}

.file-name {
  color: var(--accent-color, #3498db) !important;
  font-weight: 500;
}

.control-group {
  margin-bottom: 1rem;
}

.control-group label {
  display: block;
  font-size: 0.85rem;
  color: var(--text-secondary, #7f8c8d);
  margin-bottom: 0.3rem;
}

.control-group input[type="range"] {
  width: 100%;
}

.control-group input[type="color"] {
  width: 50px;
  height: 30px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 4px;
  cursor: pointer;
}

.export-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-export {
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
.btn-svg { background: #2ecc71; }

.btn-export:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.editor-preview {
  flex: 2;
  min-width: 300px;
}

.editor-area {
  position: relative;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 8px;
  overflow: hidden;
  background: #f0f0f0;
  cursor: default;
  user-select: none;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
}

.qr-overlay {
  position: absolute;
  cursor: move;
  z-index: 10;
}

.hint {
  text-align: center;
  font-size: 0.8rem;
  color: var(--text-secondary, #7f8c8d);
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .editor-layout {
    flex-direction: column;
  }
}
</style>
