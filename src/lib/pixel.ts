declare global {
  interface Window {
    fbq?: (...args: any[]) => void
  }
}

export const pixelEvent = (name: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', name, params)
  }
}