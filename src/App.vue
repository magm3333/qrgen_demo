<template>
  <div id="qrgen-app" :class="{ 'dark-mode': isDark }">
    <header class="app-header">
      <div class="header-content">
        <div class="logo-section">
          <h1 class="app-title">QR Generator</h1>
          <span class="app-badge">by Magm</span>
        </div>
        <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Cambiar a claro' : 'Cambiar a oscuro'">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>
    </header>
    
    <main class="app-main">
      <div class="main-tabs">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'generator' }"
          @click="activeTab = 'generator'"
        >
          Generador QR
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'template' }"
          @click="activeTab = 'template'"
        >
          Editor Plantillas
        </button>
      </div>
      
      <div class="tab-content">
        <QRGenerator 
          v-if="activeTab === 'generator'"
          v-model:content="content"
          v-model:size="size"
          v-model:margin="margin"
          v-model:errorCorrection="errorCorrection"
          v-model:darkColor="darkColor"
          v-model:lightColor="lightColor"
        />
        
        <TemplateEditor 
          v-if="activeTab === 'template'"
          :content="content"
          :darkColor="darkColor"
          :lightColor="lightColor"
          :size="size"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from './composables/useTheme'
import QRGenerator from './components/QRGenerator.vue'
import TemplateEditor from './components/TemplateEditor.vue'

const { isDark, toggleTheme } = useTheme()

// Shared state
const content = ref('https://magm3333.github.io/qrgen_demo/')
const size = ref(250)
const margin = ref(2)
const errorCorrection = ref('M')
const darkColor = ref('#000000')
const lightColor = ref('#ffffff')
const activeTab = ref('generator')
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg-primary: #f5f5f5;
  --text-primary: #2c3e50;
  --text-secondary: #7f8c8d;
  --panel-bg: #ffffff;
  --preview-bg: #f8f9fa;
  --border-color: #e0e0e0;
  --input-bg: #ffffff;
  --qr-bg: #ffffff;
  --accent-color: #3498db;
  --shadow: rgba(0,0,0,0.08);
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #ecf0f1;
  --text-secondary: #95a5a6;
  --panel-bg: #2d2d2d;
  --preview-bg: #252525;
  --border-color: #404040;
  --input-bg: #333333;
  --qr-bg: #ffffff;
  --accent-color: #3498db;
  --shadow: rgba(0,0,0,0.3);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background 0.3s, color 0.3s;
}

#qrgen-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: var(--panel-bg);
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.app-badge {
  font-size: 0.8rem;
  color: var(--text-secondary);
  background: var(--preview-bg);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
}

.theme-toggle {
  background: var(--preview-bg);
  border: 1px solid var(--border-color);
  font-size: 1.2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 8px var(--shadow);
}

.app-main {
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 1rem 2rem;
}

.main-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 1rem;
  background: var(--panel-bg, #fff);
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.tab-btn {
  flex: 1;
  padding: 0.8rem 1.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary, #7f8c8d);
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}

.tab-btn:hover {
  background: var(--preview-bg, #f8f9fa);
}

.tab-btn.active {
  color: var(--accent-color, #3498db);
  border-bottom-color: var(--accent-color, #3498db);
  background: var(--panel-bg, #fff);
}

.tab-content {
  background: var(--panel-bg);
  border-radius: 0 0 12px 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  min-height: 500px;
}
</style>
