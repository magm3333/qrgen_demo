<template>
  <div class="qr-generator">
    <h2 class="section-title">Configuración</h2>
    
    <div class="form-group">
      <label for="qr-content">Contenido (URL o texto)</label>
      <textarea 
        id="qr-content" 
        v-model="qrContent" 
        placeholder="https://ejemplo.com"
        rows="3"
        class="input-field"
      ></textarea>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="qr-size">Tamaño (px)</label>
        <input 
          id="qr-size" 
          type="number" 
          v-model.number="qrSize" 
          min="100" 
          max="500"
          class="input-field"
        />
      </div>
      
      <div class="form-group">
        <label for="qr-margin">Margen</label>
        <input 
          id="qr-margin" 
          type="number" 
          v-model.number="qrMargin" 
          min="0" 
          max="10"
          class="input-field"
        />
      </div>
    </div>

    <div class="form-group">
      <label for="error-level">Corrección de error</label>
      <select id="error-level" v-model="errorCorrection" class="input-field">
        <option value="L">Baja (L)</option>
        <option value="M">Media (M)</option>
        <option value="Q">Alta (Q)</option>
        <option value="H">Máxima (H)</option>
      </select>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="dark-color">Color QR</label>
        <input 
          id="dark-color" 
          type="color" 
          v-model="darkColor"
          class="color-input"
        />
      </div>
      
      <div class="form-group">
        <label for="light-color">Color fondo</label>
        <input 
          id="light-color" 
          type="color" 
          v-model="lightColor"
          class="color-input"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQRCode } from '../composables/useQRCode'
import { watch } from 'vue'

const {
  qrContent,
  qrSize,
  qrMargin,
  errorCorrection,
  darkColor,
  lightColor
} = useQRCode()

// Debug reactivity
watch([qrContent, qrSize, darkColor], (newVal) => {
  console.log('QR values changed:', newVal)
})
</script>

<style scoped>
.qr-generator {
  max-width: 400px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.2rem;
  color: var(--text-primary, #2c3e50);
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  color: var(--text-secondary, #7f8c8d);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.input-field {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 6px;
  font-size: 0.9rem;
  background: var(--input-bg, #fff);
  color: var(--text-primary, #333);
  transition: border-color 0.2s;
}

.input-field:focus {
  outline: none;
  border-color: var(--accent-color, #3498db);
}

textarea.input-field {
  resize: vertical;
  min-height: 80px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.color-input {
  width: 100%;
  height: 40px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
}
</style>
