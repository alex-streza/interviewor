export const useOrigin = () => {
  return typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : ''
}
