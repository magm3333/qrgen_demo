<template>
  <div id="qrgen-app">
    <header class="app-header">
      <h1>QR Generator</h1>
      <p class="subtitle">by Magm</p>
    </header>
    <main class="app-main">
      <p>¡Proyecto inicializado! Comienza a desarrollar.</p>
    </main>
  </div>
</template>

<script setup>
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
  color: #333;
}

#qrgen-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: #fff;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.app-header h1 {
  font-size: 1.8rem;
  color: #2c3e50;
}

.subtitle {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-top: 0.25rem;
}

.app-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
</style>
