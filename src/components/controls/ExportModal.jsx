import { useState } from 'react'
import { X } from 'lucide-react'

export default function ExportModal({ isOpen, isDark, onClose, onExport, isExporting }) {
  const [filename, setFilename] = useState('main.png')
  const [format, setFormat] = useState('png')
  const [quality, setQuality] = useState('2x')
  const [backgroundType, setBackgroundType] = useState('current')

  if (!isOpen) return null

  const handleExportClick = () => {
    // Ensure the filename has a .png extension if exported as PNG
    let finalFilename = filename.trim()
    if (!finalFilename) {
      finalFilename = 'main.png'
    } else if (!finalFilename.toLowerCase().endsWith('.png') && format === 'png') {
      finalFilename += '.png'
    }
    onExport({
      format,
      quality,
      backgroundType,
      filename: finalFilename,
    })
  }

  // Dual-theme styles resolution
  const textColor = isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'
  const secondaryTextColor = isDark ? 'text-[#A1A1AA]' : 'text-[#6B7280]'
  const borderColor = isDark ? 'border-[rgba(255,255,255,0.06)]' : 'border-[#E5E7EB]'
  const bgCardColor = isDark ? 'bg-[#111113]' : 'bg-[#FFFFFF]'
  const bgSurfaceColor = isDark ? 'bg-[#18181B]' : 'bg-[#F8F8FA]'
  const hoverTextColor = isDark ? 'hover:text-[#FAFAFA]' : 'hover:text-[#111827]'

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/35 backdrop-blur-[2px] animate-fadeIn">
      {/* Modal Card */}
      <div className={`w-full max-w-sm overflow-hidden rounded-2xl border shadow-xl transition-all duration-200 ease-out ${bgCardColor} ${borderColor}`}>

        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${borderColor}`}>
          <h3 className={`text-[13px] font-semibold tracking-tight ${textColor}`}>Export</h3>
          <button
            onClick={onClose}
            disabled={isExporting}
            className={`rounded-lg p-1 transition-all duration-200 ease-out disabled:opacity-40 ${isDark
              ? 'text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/5'
              : 'text-[#6B7280] hover:text-[#111827] hover:bg-black/5'
              }`}
          >
            <X size={14} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 flex flex-col gap-6">

          {/* Filename Input */}
          <div className="flex flex-col gap-2">
            <label className={`text-[10px] font-semibold uppercase tracking-[0.12em] select-none ${secondaryTextColor}`}>
              Filename
            </label>
            <input
              type="text"
              disabled={isExporting}
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="main.png"
              className={`w-full h-[40px] px-3.5 rounded-xl border text-[13px] transition-all duration-200 ease-out focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent/40 ${isDark
                ? 'bg-[#18181B] border-[rgba(255,255,255,0.06)] text-[#FAFAFA] placeholder-[#71717A]'
                : 'bg-[#F8F8FA] border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF]'
                }`}
            />
          </div>

          {/* Export Format (Segmented Control) */}
          <div className="flex flex-col gap-2">
            <label className={`text-[10px] font-semibold uppercase tracking-[0.12em] select-none ${secondaryTextColor}`}>
              Format
            </label>
            <div className={`grid grid-cols-3 p-0.5 border rounded-xl ${bgSurfaceColor} ${borderColor}`}>
              <button
                type="button"
                onClick={() => setFormat('png')}
                disabled={isExporting}
                className={`py-1.5 rounded-lg text-xs font-semibold text-center transition-all duration-200 ease-out border ${format === 'png'
                  ? isDark
                    ? 'bg-[#111113] border-[rgba(255,255,255,0.06)] text-[#FAFAFA] shadow-sm'
                    : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827] shadow-sm'
                  : `bg-transparent border-transparent ${secondaryTextColor} ${hoverTextColor}`
                  }`}
              >
                PNG
              </button>

              {/* SVG Disabled Option */}
              <div className="py-1.5 rounded-lg text-xs font-semibold text-center opacity-40 select-none pointer-events-none flex items-center justify-center gap-1">
                <span className={secondaryTextColor}>SVG</span>
                <span className="text-[7px] font-bold text-accent/80 tracking-wider bg-accent/10 px-1 rounded-sm">SOON</span>
              </div>

              {/* PDF Disabled Option */}
              <div className="py-1.5 rounded-lg text-xs font-semibold text-center opacity-40 select-none pointer-events-none flex items-center justify-center gap-1">
                <span className={secondaryTextColor}>PDF</span>
                <span className="text-[7px] font-bold text-accent/80 tracking-wider bg-accent/10 px-1 rounded-sm">SOON</span>
              </div>
            </div>
          </div>

          {/* Quality (Segmented Control) */}
          <div className="flex flex-col gap-2">
            <label className={`text-[10px] font-semibold uppercase tracking-[0.12em] select-none ${secondaryTextColor}`}>
              Quality
            </label>
            <div className={`grid grid-cols-3 p-0.5 border rounded-xl ${bgSurfaceColor} ${borderColor}`}>
              {['1x', '2x', '4x'].map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={isExporting}
                  onClick={() => setQuality(q)}
                  className={`py-1.5 rounded-lg text-xs font-semibold text-center transition-all duration-200 ease-out border ${quality === q
                    ? isDark
                      ? 'bg-[#111113] border-[rgba(255,255,255,0.06)] text-[#FAFAFA] shadow-sm'
                      : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827] shadow-sm'
                    : `bg-transparent border-transparent ${secondaryTextColor} ${hoverTextColor}`
                    }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Background Type (Segmented Control) */}
          <div className="flex flex-col gap-2">
            <label className={`text-[10px] font-semibold uppercase tracking-[0.12em] select-none ${secondaryTextColor}`}>
              Background
            </label>
            <div className={`grid grid-cols-2 p-0.5 border rounded-xl ${bgSurfaceColor} ${borderColor}`}>
              {[
                { id: 'current', label: 'Current' },
                { id: 'transparent', label: 'Transparent' }
              ].map((bgOption) => (
                <button
                  key={bgOption.id}
                  type="button"
                  disabled={isExporting}
                  onClick={() => setBackgroundType(bgOption.id)}
                  className={`py-1.5 rounded-lg text-xs font-semibold text-center transition-all duration-200 ease-out border ${backgroundType === bgOption.id
                    ? isDark
                      ? 'bg-[#111113] border-[rgba(255,255,255,0.06)] text-[#FAFAFA] shadow-sm'
                      : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827] shadow-sm'
                    : `bg-transparent border-transparent ${secondaryTextColor} ${hoverTextColor}`
                    }`}
                >
                  {bgOption.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className={`border-t px-6 py-4 flex items-center justify-end gap-3 ${borderColor}`}>
          <button
            type="button"
            disabled={isExporting}
            onClick={onClose}
            className={`h-9 px-4 rounded-lg text-xs font-semibold transition-all duration-200 ease-out hover:-translate-y-[0.5px] active:translate-y-0 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center ${isDark ? 'text-[#A1A1AA] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'
              }`}
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isExporting}
            onClick={handleExportClick}
            className="h-9 px-4 rounded-lg text-xs font-semibold text-white bg-accent hover:bg-[#8E523F] hover:-translate-y-[0.5px] active:translate-y-0 active:scale-[0.98] shadow-sm transition-all duration-200 ease-out disabled:opacity-60 flex items-center justify-center gap-1.5"
          >
            {isExporting ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Exporting...</span>
              </>
            ) : (
              <span>Export</span>
            )}
          </button>
        </div>

      </div>
    </div>
  )
}
