import { ref, onMounted } from 'vue'

export function useTheme() {
  const isDark = ref(false)
  
  const initTheme = () => {
    const saved = localStorage.getItem('qrgen-theme')
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }
  
  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('qrgen-theme', isDark.value ? 'dark' : 'light')
    applyTheme()
  }
  
  const applyTheme = () => {
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  }
  
  onMounted(initTheme)
  
  return {
    isDark,
    toggleTheme
  }
}
