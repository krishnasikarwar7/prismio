import { useRef, useEffect, useCallback } from 'react'
import MacWindowFrame from '../windowFrames/MacWindowFrame'
import WindowsFrame from '../windowFrames/WindowsFrame'
import BrowserFrame from '../windowFrames/BrowserFrame'
import { EDITOR_THEMES, getFileName } from '../../utils/constants'

const FRAME_COMPONENTS = {
  macos: MacWindowFrame,
  windows: WindowsFrame,
  browser: BrowserFrame,
}

export default function PreviewCard({
  canvasRef,
  isDark,
  code,
  language,
  theme,
  background,
  windowFrame,
  padding,
  radius,
  fontSize,
  fontFamily,
  ligatures,
}) {
  const themeData = EDITOR_THEMES.find((t) => t.id === theme) || EDITOR_THEMES[0]
  const activeTheme = {
    ...themeData,
    swatch: isDark ? themeData.swatch : (themeData.lightSwatch || themeData.swatch),
  }
  const editorBg = activeTheme.swatch[0]
  const fileName = getFileName(language.id)
  const resolvedFont = fontFamily || '"JetBrains Mono", ui-monospace, monospace'

  const FrameComponent = FRAME_COMPONENTS[windowFrame]

  const containerRef = useRef(null)
  const scaleWrapperRef = useRef(null)
  const localRef = useRef(null)
  const contentRef = canvasRef || localRef

  const updateScale = useCallback(() => {
    if (!containerRef.current || !contentRef.current || !scaleWrapperRef.current) return
    const container = containerRef.current.getBoundingClientRect()
    const contentW = contentRef.current.scrollWidth
    const contentH = contentRef.current.scrollHeight

    if (contentW === 0 || contentH === 0) return

    const safeMargin = 32
    const scaleX = (container.width - safeMargin) / contentW
    const scaleY = (container.height - safeMargin) / contentH
    const s = Math.min(scaleX, scaleY, 1)

    // Direct DOM mutation — no React re-render, so CSS transitions are never interrupted
    scaleWrapperRef.current.style.transform = `scale(${s})`
  }, [])

  // Run scale computation on mount + whenever the container or content resizes
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(updateScale)
    })

    observer.observe(containerRef.current)
    observer.observe(contentRef.current)

    updateScale()

    return () => observer.disconnect()
  }, [updateScale])

  // Also re-check scale when padding/code/fontSize change
  useEffect(() => {
    // Wait a tick for the DOM to settle after React render
    const id = requestAnimationFrame(updateScale)
    return () => cancelAnimationFrame(id)
  }, [padding, code, fontSize, fontFamily, updateScale])

  const codeBlock = (
    <pre
      className="overflow-auto leading-relaxed text-left"
      style={{
        background: editorBg,
        color: isDark ? '#e4e4e7' : '#24292e',
        fontSize: `${fontSize}px`,
        fontFamily: resolvedFont,
        fontFeatureSettings: ligatures !== false ? '"liga" 1, "calt" 1' : '"liga" 0, "calt" 0',
        padding: '24px 32px 32px',
      }}
    >
      <code>{code}</code>
    </pre>
  )

  return (
    <div ref={containerRef} className="flex h-full w-full items-center justify-center relative overflow-hidden">
      {/* Scale wrapper — updated via direct DOM mutation to avoid re-renders */}
      <div
        ref={scaleWrapperRef}
        className="flex items-center justify-center origin-center scale-transition"
      >
        {/* The exportable canvas (gradient background) */}
        <div
          ref={contentRef}
          className="relative flex items-center justify-center canvas-transition"
          style={{
            ...background.style,
            padding: `${padding}px`,
          }}
        >
          {/* The window frame */}
          <div
            className="relative w-full sm:w-auto max-w-[90vw] lg:max-w-2xl animate-fadeIn"
            style={{
              borderRadius: `${radius}px`,
              boxShadow: isDark
                ? '0 20px 40px -8px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)'
                : '0 20px 40px -8px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.08)',
            }}
          >
            <div className="relative overflow-hidden w-full h-full" style={{ borderRadius: `${radius}px` }}>
              {FrameComponent ? (
                <FrameComponent isDark={isDark} fileName={fileName} languageLabel={language.label}>{codeBlock}</FrameComponent>
              ) : (
                <div>
                  <div className={`flex items-center justify-between px-4 py-3 border-b ${
                    isDark ? 'bg-black/20 border-white/5' : 'bg-black/[0.04] border-black/[0.06]'
                  }`}>
                    <span className={`text-[12px] font-semibold tracking-wide select-none ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {fileName}
                    </span>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] select-none ${
                      isDark ? 'bg-black/40 text-white/80' : 'bg-white border border-black/10 text-black/70 shadow-sm'
                    }`}>
                      {language.label}
                    </span>
                  </div>
                  {codeBlock}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
