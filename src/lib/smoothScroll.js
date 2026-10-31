// The active Lenis instance (set by SmoothScroll), so other code can pause or follow it.
let instance = null

export const getLenis = () => instance
export const setLenis = (lenis) => {
  instance = lenis
}
