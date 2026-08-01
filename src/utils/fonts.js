/**
 * Curated programming font collection for Prismio.
 *
 * Each entry defines:
 *  - id:             Unique identifier (used in state + localStorage)
 *  - label:          Human-readable display name
 *  - family:         CSS font-family value
 *  - googleUrl:      Google Fonts stylesheet URL (null = already available / self-hosted)
 *  - hasLigatures:   Whether the font ships with programming ligatures
 *  - preview:        Short string rendered in the font inside the picker
 */

export const FONTS = [
  {
    id: 'jetbrains-mono',
    label: 'JetBrains Mono',
    family: '"JetBrains Mono", ui-monospace, monospace',
    googleUrl:
      'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap',
    hasLigatures: true,
    preview: 'AaBbCc 123 => (){}',
  },
  {
    id: 'geist-mono',
    label: 'Geist Mono',
    family: '"Geist Mono", ui-monospace, monospace',
    googleUrl:
      'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap',
    hasLigatures: false,
    preview: 'AaBbCc 123 => (){}',
  },
  {
    id: 'fira-code',
    label: 'Fira Code',
    family: '"Fira Code", ui-monospace, monospace',
    googleUrl:
      'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap',
    hasLigatures: true,
    preview: 'AaBbCc 123 => (){}',
  },
  {
    id: 'cascadia-code',
    label: 'Cascadia Code',
    family: '"Cascadia Code", ui-monospace, monospace',
    googleUrl:
      'https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&display=swap',
    hasLigatures: true,
    preview: 'AaBbCc 123 => (){}',
  },
  {
    id: 'ibm-plex-mono',
    label: 'IBM Plex Mono',
    family: '"IBM Plex Mono", ui-monospace, monospace',
    googleUrl:
      'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap',
    hasLigatures: false,
    preview: 'AaBbCc 123 => (){}',
  },
  {
    id: 'source-code-pro',
    label: 'Source Code Pro',
    family: '"Source Code Pro", ui-monospace, monospace',
    googleUrl:
      'https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap',
    hasLigatures: false,
    preview: 'AaBbCc 123 => (){}',
  },
  {
    id: 'hack',
    label: 'Hack',
    family: '"Hack", ui-monospace, monospace',
    googleUrl:
      'https://fonts.googleapis.com/css2?family=Hack:ital,wght@0,400;0,700;1,400;1,700&display=swap',
    hasLigatures: false,
    preview: 'AaBbCc 123 => (){}',
  },
  {
    id: 'inconsolata',
    label: 'Inconsolata',
    family: '"Inconsolata", ui-monospace, monospace',
    googleUrl:
      'https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&display=swap',
    hasLigatures: false,
    preview: 'AaBbCc 123 => (){}',
  },
]

export const DEFAULT_FONT_ID = 'jetbrains-mono'

// Track which fonts have been loaded so we never inject the same <link> twice
const loadedFonts = new Set()

/**
 * Lazily load a Google Font by injecting a <link> into <head>.
 * Returns a promise that resolves once the stylesheet has loaded.
 * Subsequent calls for the same font are instant no-ops.
 */
export function loadFont(fontId) {
  const font = FONTS.find((f) => f.id === fontId)
  if (!font || !font.googleUrl) return Promise.resolve()
  if (loadedFonts.has(fontId)) return Promise.resolve()

  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = font.googleUrl
    link.crossOrigin = 'anonymous'
    link.onload = () => {
      loadedFonts.add(fontId)
      resolve()
    }
    link.onerror = reject
    document.head.appendChild(link)
  })
}

/**
 * Preload the default font eagerly so the editor renders with it immediately.
 */
export function preloadDefaultFont() {
  loadFont(DEFAULT_FONT_ID)
}

/**
 * Read persisted font + ligature preferences from localStorage.
 */
export function getPersistedFontPrefs() {
  try {
    const fontId = localStorage.getItem('prismio-font') || DEFAULT_FONT_ID
    const ligatures = localStorage.getItem('prismio-ligatures') !== 'false' // default true
    return { fontId, ligatures }
  } catch {
    return { fontId: DEFAULT_FONT_ID, ligatures: true }
  }
}

/**
 * Persist font + ligature preferences to localStorage.
 */
export function persistFontPrefs(fontId, ligatures) {
  try {
    localStorage.setItem('prismio-font', fontId)
    localStorage.setItem('prismio-ligatures', String(ligatures))
  } catch {
    // silent — localStorage may be unavailable in some contexts
  }
}
