import { ref, onMounted, onUnmounted } from 'vue'

export const useMediaQuery = (query: string) => {
  const matches = ref(false)

  let mediaQueryList: MediaQueryList | null = null
  const updateMatch = () => {
    matches.value = !!mediaQueryList?.matches
  }

  onMounted(() => {
    mediaQueryList = window.matchMedia(query)
    updateMatch()
    mediaQueryList.addEventListener('change', updateMatch)
  })

  onUnmounted(() => {
    mediaQueryList?.removeEventListener('change', updateMatch)
  })

  return matches
}
