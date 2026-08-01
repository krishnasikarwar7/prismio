import { useEffect, useState, useRef } from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import CodeEditor from './components/editor/CodeEditor'
import PreviewCard from './components/preview/PreviewCard'
import ExportModal from './components/controls/ExportModal'
import Toast from './components/shared/Toast'
import { toPng } from 'html-to-image'
import {
  LANGUAGES,
  EDITOR_THEMES,
  BACKGROUNDS,
  DEFAULT_CODE,
} from './utils/constants'
import { copyCodeToClipboard, copyPreviewImageToClipboard } from './utils/clipboard'
import {
  FONTS,
  DEFAULT_FONT_ID,
  loadFont,
  preloadDefaultFont,
  getPersistedFontPrefs,
  persistFontPrefs,
} from './utils/fonts'

// Preload the default font as early as possible
preloadDefaultFont()

export default function App() {
  const [isDark, setIsDark] = useState(true)
  const [code, setCode] = useState(DEFAULT_CODE)
  const [languageId, setLanguageId] = useState('cpp')
  const [themeId, setThemeId] = useState('vscode')
  const [backgroundId, setBackgroundId] = useState('clay')
  const [windowFrame, setWindowFrame] = useState('macos')
  const [padding, setPadding] = useState(48)
  const [radius, setRadius] = useState(12)
  const [fontSize, setFontSize] = useState(14)

  // Font state — restored from localStorage
  const [fontId, setFontId] = useState(() => getPersistedFontPrefs().fontId)
  const [ligatures, setLigatures] = useState(() => getPersistedFontPrefs().ligatures)

  // Action states & Toast
  const [showExportModal, setShowExportModal] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [isCopyingImage, setIsCopyingImage] = useState(false)
  const [isCodeCopied, setIsCodeCopied] = useState(false)
  const [toast, setToast] = useState(null)

  const previewCanvasRef = useRef(null)

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', !isDark)
  }, [isDark])

  // Load the persisted font on mount
  useEffect(() => {
    loadFont(fontId).catch(() => {})
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Persist font preferences whenever they change
  useEffect(() => {
    persistFontPrefs(fontId, ligatures)
  }, [fontId, ligatures])

  const language = LANGUAGES.find((l) => l.id === languageId) ?? LANGUAGES[0]
  const baseTheme = EDITOR_THEMES.find((t) => t.id === themeId) ?? EDITOR_THEMES[0]
  const theme = {
    ...baseTheme,
    monacoId: isDark ? baseTheme.monacoId : (baseTheme.lightMonacoId || baseTheme.monacoId),
    swatch: isDark ? baseTheme.swatch : (baseTheme.lightSwatch || baseTheme.swatch),
  }
  const baseBackground =
    BACKGROUNDS.find((b) => b.id === backgroundId) ?? BACKGROUNDS[0]
  const background = {
    ...baseBackground,
    style: isDark ? baseBackground.style : (baseBackground.lightStyle || baseBackground.style),
  }

  // Resolve the selected font's CSS family string
  const selectedFont = FONTS.find((f) => f.id === fontId) || FONTS[0]
  const fontFamily = selectedFont.family

  // Font change handler — load font then update state
  const handleFontChange = async (newFontId) => {
    try {
      await loadFont(newFontId)
    } catch { /* non-critical */ }
    setFontId(newFontId)
  }

  // Copy Code Handler
  const handleCopyCode = async () => {
    try {
      await copyCodeToClipboard(code)
      setIsCodeCopied(true)
      setToast({ message: '✓ Code copied to clipboard', type: 'success' })
      setTimeout(() => setIsCodeCopied(false), 2500)
    } catch (error) {
      console.error('Failed to copy code:', error)
      setToast({ message: 'Unable to copy code.', type: 'error' })
    }
  }

  // Copy Image Handler
  const handleCopyImage = async () => {
    if (!previewCanvasRef.current || isCopyingImage) return
    setIsCopyingImage(true)
    await new Promise((resolve) => setTimeout(resolve, 100))
    try {
      const res = await copyPreviewImageToClipboard(
        previewCanvasRef,
        `${language.id || 'code'}-snippet.png`
      )
      if (res.method === 'clipboard') {
        setToast({ message: '✓ Image copied to clipboard', type: 'success' })
      } else {
        setToast({ message: '✓ Image downloaded', type: 'success' })
      }
    } catch (error) {
      console.error('Failed to copy image:', error)
      setToast({ message: 'Unable to copy image.', type: 'error' })
    } finally {
      setIsCopyingImage(false)
    }
  }

  // Modal Export Handler
  const handleExport = async (settings) => {
    if (!previewCanvasRef.current) return
    setIsExporting(true)
    await new Promise((resolve) => setTimeout(resolve, 150))
    try {
      const { quality, backgroundType, filename } = settings
      const pixelRatio = quality === '1x' ? 1 : quality === '4x' ? 4 : 2
      const options = {
        pixelRatio,
        style: {},
      }
      if (backgroundType === 'transparent') {
        options.style = {
          background: 'transparent',
          backgroundImage: 'none',
          backgroundColor: 'transparent',
        }
      }
      const dataUrl = await toPng(previewCanvasRef.current, options)
      const link = document.createElement('a')
      link.download = filename
      link.href = dataUrl
      link.click()
      setToast({ message: '✓ Exported successfully', type: 'success' })
      setShowExportModal(false)
    } catch (error) {
      console.error('Export failed:', error)
      setToast({ message: 'Unable to export image. Please try again.', type: 'error' })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-bg font-sans selection:bg-accent/30 text-text-primary transition-colors duration-200">
      <Navbar
        isDark={isDark}
        onToggleTheme={() => setIsDark((d) => !d)}
        onCopyCode={handleCopyCode}
        onCopyImage={handleCopyImage}
        isCopyingImage={isCopyingImage}
        isCodeCopied={isCodeCopied}
        onExportClick={() => setShowExportModal(true)}
      />

      <main className="flex h-screen w-full flex-col pt-14 lg:flex-row lg:overflow-hidden bg-base-bg transition-colors duration-200">
        {/* Sidebar */}
        <div className="w-full lg:w-[20%] lg:h-full lg:shrink-0 flex flex-col border-r border-base-border bg-base-surface transition-colors duration-200">
          <Sidebar
            isDark={isDark}
            language={languageId}
            onLanguageChange={setLanguageId}
            fontId={fontId}
            onFontChange={handleFontChange}
            ligatures={ligatures}
            onLigaturesChange={setLigatures}
            theme={themeId}
            onThemeChange={setThemeId}
            background={backgroundId}
            onBackgroundChange={setBackgroundId}
            windowFrame={windowFrame}
            onWindowFrameChange={setWindowFrame}
            padding={padding}
            onPaddingChange={setPadding}
            radius={radius}
            onRadiusChange={setRadius}
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
          />
        </div>

        {/* Editor */}
        <div className="w-full lg:w-[45%] lg:h-full lg:shrink-0 flex flex-col border-r border-base-border bg-base-bg/30 pt-4 lg:pt-5 px-3 lg:px-4 pb-4 lg:pb-5 transition-colors duration-200">
          <div
            className={`flex h-full w-full flex-col overflow-hidden rounded-2xl shadow-elevated transition-all duration-300 hover:shadow-2xl border ${
              isDark
                ? 'border-white/[0.04] shadow-black/40'
                : 'border-black/[0.06] shadow-black/[0.04]'
            }`}
            style={{ backgroundColor: theme.swatch[0] || '#1e1e1e' }}
          >
            <CodeEditor
              isDark={isDark}
              code={code}
              onChange={setCode}
              language={language}
              theme={theme}
              fontSize={fontSize}
              fontFamily={fontFamily}
              ligatures={ligatures}
            />
          </div>
        </div>

        {/* Preview */}
        <div className="w-full lg:w-[35%] lg:h-full lg:shrink-0 flex flex-col bg-base-bg/50 pt-4 lg:pt-5 px-3 lg:px-4 pb-4 lg:pb-5 relative items-center justify-center transition-colors duration-200">
          <PreviewCard
            canvasRef={previewCanvasRef}
            isDark={isDark}
            code={code}
            language={language}
            theme={themeId}
            background={background}
            windowFrame={windowFrame}
            padding={padding}
            radius={radius}
            fontSize={fontSize}
            fontFamily={fontFamily}
            ligatures={ligatures}
          />
        </div>
      </main>

      {/* Overlays & Modals */}
      <ExportModal
        isOpen={showExportModal}
        isDark={isDark}
        isExporting={isExporting}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
