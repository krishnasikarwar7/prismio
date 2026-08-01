import { Minus, Square, X } from 'lucide-react'

export default function WindowsFrame({ isDark, fileName, languageLabel, children }) {
  return (
    <div className="w-full overflow-hidden rounded-[inherit]">
      <div className={`flex items-center justify-between px-3 py-2 border-b ${
        isDark ? 'bg-black/25 border-white/5' : 'bg-black/[0.04] border-black/[0.06]'
      }`}>
        <span className={`pl-1 text-xs font-semibold select-none ${
          isDark ? 'text-gray-200' : 'text-gray-700'
        }`}>
          {fileName}
        </span>
        <div className="flex items-center gap-3">
          {languageLabel && (
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] select-none ${
              isDark ? 'bg-black/40 text-white/85' : 'bg-white border border-black/10 text-black/75 shadow-sm'
            }`}>
              {languageLabel}
            </span>
          )}
          <div className={`flex items-center gap-4 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            <Minus size={13} strokeWidth={2.5} />
            <Square size={11} strokeWidth={2.5} />
            <X size={13} strokeWidth={2.5} />
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
