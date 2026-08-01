import { ArrowLeft, ArrowRight, RotateCw, Lock } from 'lucide-react'

export default function BrowserFrame({ isDark, fileName, languageLabel, children }) {
  return (
    <div className="w-full overflow-hidden rounded-[inherit]">
      <div className={`flex items-center gap-3 px-4 py-2.5 border-b ${
        isDark ? 'bg-black/25 border-white/5' : 'bg-black/[0.04] border-black/[0.06]'
      }`}>
        <div className={`flex items-center gap-2 ${isDark ? 'text-white/40' : 'text-black/45'}`}>
          <ArrowLeft size={13} />
          <ArrowRight size={13} />
          <RotateCw size={12} />
        </div>
        <div className={`flex flex-1 items-center gap-2 rounded-md px-3 py-1 text-xs select-none ${
          isDark 
            ? 'bg-white/10 text-gray-200' 
            : 'bg-white border border-black/5 text-gray-700 shadow-sm'
        }`}>
          <Lock size={10} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
          <span className="truncate">prismio.app/{fileName}</span>
        </div>
        {languageLabel && (
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] select-none ${
            isDark ? 'bg-black/40 text-white/85' : 'bg-white border border-black/10 text-black/75 shadow-sm'
          }`}>
            {languageLabel}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
