import { toPng } from 'html-to-image'

/**
 * Copies plain text code to clipboard using the Clipboard API with fallback.
 * @param {string} code 
 * @returns {Promise<boolean>}
 */
export async function copyCodeToClipboard(code) {
  if (!code) throw new Error('No code to copy')

  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(code)
    return true
  }

  // Fallback for non-secure contexts or legacy engines
  const textArea = document.createElement('textarea')
  textArea.value = code
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  try {
    const successful = document.execCommand('copy')
    document.body.removeChild(textArea)
    if (!successful) throw new Error('execCommand copy returned false')
    return true
  } catch (err) {
    if (document.body.contains(textArea)) {
      document.body.removeChild(textArea)
    }
    throw err
  }
}

/**
 * Captures the preview element and copies it to clipboard as PNG,
 * falling back to a direct file download if clipboard image copy is unsupported.
 * @param {React.RefObject<HTMLElement>} elementRef 
 * @param {string} [filename='prismio-code.png']
 * @returns {Promise<{ success: boolean, method: 'clipboard' | 'download' }>}
 */
export async function copyPreviewImageToClipboard(elementRef, filename = 'prismio-code.png') {
  if (!elementRef || !elementRef.current) {
    throw new Error('Preview element not found')
  }

  // Generate PNG dataUrl with 2x pixel ratio for retina crispness
  const dataUrl = await toPng(elementRef.current, { pixelRatio: 2 })

  // Try Clipboard API with image/png blob
  if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
    try {
      const response = await fetch(dataUrl)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ])
      return { success: true, method: 'clipboard' }
    } catch (clipboardError) {
      console.warn('Clipboard write failed, falling back to download:', clipboardError)
      downloadDataUrl(dataUrl, filename)
      return { success: true, method: 'download' }
    }
  } else {
    // Direct fallback download
    downloadDataUrl(dataUrl, filename)
    return { success: true, method: 'download' }
  }
}

function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}
