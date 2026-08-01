export default function MacWindowFrame({ isDark, fileName, languageLabel, children }) {
  return (
    <div className="w-full overflow-hidden rounded-[inherit]">
      <div className={`relative flex items-center px-4 py-3.5 border-b ${
        isDark ? 'bg-black/25 border-white/5' : 'bg-black/[0.04] border-black/[0.06]'
      }`}>
        <div className="flex items-center gap-1.5 z-10">
          <span className="h-3 w-3 rounded-full bg-[#ec6a5e] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]" />
          <span className="h-3 w-3 rounded-full bg-[#f4bf4f] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]" />
          <span className="h-3 w-3 rounded-full bg-[#61c554] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]" />
        </div>
        <span className={`absolute inset-x-0 text-center text-[12px] font-semibold tracking-wide select-none pointer-events-none ${
          isDark ? 'text-gray-200' : 'text-gray-700'
        }`}>
          {fileName}
        </span>
        {languageLabel && (
          <span className={`absolute right-4 z-10 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] select-none ${
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
