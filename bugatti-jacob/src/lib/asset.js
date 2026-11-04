/** Resolves a /public asset path against Vite's base URL. */
export const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`
