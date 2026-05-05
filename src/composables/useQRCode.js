import { ref, computed } from 'vue'

// Estado compartido (singleton)
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
