import { ref } from 'vue'

// Estado compartido para el QR
const qrContent = ref('https://magm3333.github.io/qrgen_demo/')
const qrSize = ref(250)
const qrMargin = ref(2)
const errorCorrection = ref('M')
const darkColor = ref('#000000')
const lightColor = ref('#ffffff')

export function useQRCode() {
  const qrOptions = computed(() => ({
    errorCorrectionLevel: errorCorrection.value
  }))
  
  const dotsOptions = computed(() => ({
    type: 'square',
    color: darkColor.value
  }))
  
  const backgroundOptions = computed(() => ({
    color: lightColor.value
  }))
  
  const cornersSquareOptions = computed(() => ({
    type: 'square',
    color: darkColor.value
  }))
  
  const cornersDotOptions = computed(() => ({
    color: darkColor.value
  }))
  
  return {
    qrContent,
    qrSize,
    qrMargin,
    errorCorrection,
    darkColor,
    lightColor,
    qrOptions,
    dotsOptions,
    backgroundOptions,
    cornersSquareOptions,
    cornersDotOptions
  }
}

// Función auxiliar para crear canvas del QR
function createQRCanvas(content, size, darkColor, lightColor, errorLevel) {
  // Importar dinámicamente qrcode-generator
  const qrcode = require('qrcode-generator')
  const qr = qrcode(0, errorLevel)
  qr.addData(content)
  qr.make()
  
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  
  // Configurar colores
  ctx.fillStyle = lightColor
  ctx.fillRect(0, 0, size, size)
  
  const moduleCount = qr.getModuleCount()
  const moduleSize = size / moduleCount
  
  ctx.fillStyle = darkColor
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (qr.isDark(row, col)) {
        ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize)
      }
    }
  }
  
  return canvas
}

export function downloadQRAsPNG(content, size, filename = 'qrcode') {
  const canvas = createQRCanvas(content, size, '#000000', '#ffffff', 'M')
  const link = document.createElement('a')
  link.download = `${filename}.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}

export function downloadQRAsJPG(content, size, filename = 'qrcode') {
  const canvas = createQRCanvas(content, size, '#000000', '#ffffff', 'M')
  const link = document.createElement('a')
  link.download = `${filename}.jpg`
  link.href = canvas.toDataURL('image/jpeg', 0.9)
  link.click()
}

export function downloadQRAsSVG(content, size, filename = 'qrcode') {
  const qrcode = require('qrcode-generator')
  const qr = qrcode(0, 'M')
  qr.addData(content)
  qr.make()
  
  const svg = qr.createSvgTag({ cellSize: size / 33, margin: 2 })
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const link = document.createElement('a')
  link.download = `${filename}.svg`
  link.href = URL.createObjectURL(blob)
  link.click()
  URL.revokeObjectURL(link.href)
}
