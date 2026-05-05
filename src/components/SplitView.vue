<template>
  <div class="split-view">
    <div class="panel left-panel">
      <slot name="left"></slot>
    </div>
    <div class="divider"></div>
    <div class="panel right-panel">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.split-view {
  display: flex;
  height: calc(100vh - 80px);
  overflow: hidden;
}

.panel {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.left-panel {
  background: var(--panel-bg, #ffffff);
  border-right: 1px solid var(--border-color, #e0e0e0);
}

.right-panel {
  background: var(--preview-bg, #f8f9fa);
  display: flex;
  align-items: center;
  justify-content: center;
}

.divider {
  width: 1px;
  background: var(--border-color, #e0e0e0);
  cursor: col-resize;
}

@media (max-width: 768px) {
  .split-view {
    flex-direction: column;
    height: auto;
  }
  
  .left-panel {
    border-right: none;
    border-bottom: 1px solid var(--border-color, #e0e0e0);
  }
  
  .divider {
    width: 100%;
    height: 1px;
  }
}
</style>
