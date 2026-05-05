<template>
  <div class="qr-preview">
    <h2 class="preview-title">Vista Previa</h2>
    <div class="qr-container">
      <QRCodeVue3
        :value="qrContent"
        :size="qrSize"
        :margin="qrMargin"
        :qrOptions="qrOptions"
        :dotsOptions="dotsOptions"
        :backgroundOptions="backgroundOptions"
        :cornersSquareOptions="cornersSquareOptions"
        :cornersDotOptions="cornersDotOptions"
      />
    </div>
    <div class="preview-info">
      <p class="info-text">Tamaño: {{ qrSize }}px</p>
      <p class="info-text">Corrección: {{ errorCorrection }}</p>
    </div>
  </div>
</template>

<script setup>
import QRCodeVue3 from 'qrcode-vue3'
import { useQRCode } from '../composables/useQRCode'

const {
  qrContent,
  qrSize,
  qrMargin,
  errorCorrection,
  qrOptions,
  dotsOptions,
  backgroundOptions,
  cornersSquareOptions,
  cornersDotOptions
} = useQRCode()
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
}

.info-text {
  font-size: 0.85rem;
  color: var(--text-secondary, #7f8c8d);
}
</style>
