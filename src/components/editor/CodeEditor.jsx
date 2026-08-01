import Editor from '@monaco-editor/react'
import { registerMonacoThemes } from '../../utils/monacoThemes'
import { FileCode } from 'lucide-react'
import { getFileName } from '../../utils/constants'

export default function CodeEditor({ isDark, code, onChange, language, theme, fontSize, fontFamily, ligatures }) {
  const fileName = getFileName(language.id)
  const editorBg = theme.swatch[0] || '#1e1e1e'
  const resolvedFont = fontFamily || '"JetBrains Mono", ui-monospace, monospace'

  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden transition-all duration-300 rounded-2xl"
      style={{ backgroundColor: editorBg }}
    >
      {/* Premium Tab Bar Header */}
      <div className={`flex h-12 items-center justify-between border-b px-4 select-none ${
        isDark 
          ? 'border-white/5 bg-black/10' 
          : 'border-black/[0.06] bg-black/[0.02]'
      }`}>
        <div className="flex items-center gap-2">
          {/* Active Tab Piling */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
              isDark 
                ? 'bg-white/5 border-white/10 text-white/90 shadow-sm' 
                : 'bg-white border-black/5 text-black/80 shadow-soft'
            }`}
          >
            <FileCode size={13} className="text-accent" />
            <span>{fileName}</span>
          </div>
        </div>
        
        {/* Subtle decorative window controls on the right */}
        <div className="flex items-center gap-1.5 opacity-45">
          <span className="h-2.5 w-2.5 rounded-full bg-current" />
          <span className="h-2.5 w-2.5 rounded-full bg-current" />
          <span className="h-2.5 w-2.5 rounded-full bg-current" />
        </div>
      </div>

      {/* Editor Spacing Container */}
      <div className="flex-1 p-3 overflow-hidden relative rounded-b-2xl">
        <Editor
          height="100%"
          language={language.monacoId}
          theme={theme.monacoId}
          value={code}
          onChange={(value) => onChange(value ?? '')}
          beforeMount={(monaco) => registerMonacoThemes(monaco)}
          options={{
            fontSize,
            fontFamily: resolvedFont,
            fontLigatures: ligatures !== false,
            lineNumbers: 'on',
            wordWrap: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 12, bottom: 12 },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            renderLineHighlight: 'gutter',
            automaticLayout: true,
            backgroundColor: 'transparent',
          }}
        />
      </div>
    </div>
  )
}
