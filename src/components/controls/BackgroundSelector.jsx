import { Check } from 'lucide-react'
import { BACKGROUNDS } from '../../utils/constants'

export default function BackgroundSelector({ value, onChange, isDark }) {
  const isDarkMode =
    isDark !== undefined
      ? isDark
      : typeof document !== 'undefined'
      ? !document.documentElement.classList.contains('light-mode')
      : true

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {BACKGROUNDS.map((bg) => {
        const active = value === bg.id
        const activeStyle = isDarkMode ? bg.style : bg.lightStyle || bg.style

        let cardStyleClass = ''
        let labelStyleClass = ''

        if (active) {
          cardStyleClass = isDarkMode
            ? 'bg-[#1C1C1E] border-[#A35E47] shadow-md ring-1 ring-[#A35E47]/30'
            : 'bg-[#FFFFFF] border-[#A35E47] shadow-md ring-1 ring-[#A35E47]/20'
          labelStyleClass = isDarkMode
            ? 'text-[#FFFFFF] font-semibold'
            : 'text-[#111827] font-semibold'
        } else {
          cardStyleClass = isDarkMode
            ? 'bg-[#1C1C1E] border-[rgba(255,255,255,0.06)] hover:bg-[#242426] hover:border-white/10'
            : 'bg-[#FFFFFF] border-[#E5E7EB] hover:bg-[#F8F8F8] hover:border-[#D1D5DB]'
          labelStyleClass = isDarkMode
            ? 'text-[#A1A1AA] group-hover:text-[#FFFFFF]'
            : 'text-[#374151] group-hover:text-[#111827]'
        }

        return (
          <button
            key={bg.id}
            onClick={() => onChange(bg.id)}
            className={`group relative flex flex-col items-center w-full rounded-xl p-3 transition-all duration-200 ease-out active:scale-[0.98] border select-none ${cardStyleClass}`}
          >
            {/* Preview Thumbnail (~70% height ratio) */}
            <div
              className="relative w-full h-[62px] rounded-lg border border-black/5 dark:border-white/10 transition-transform duration-200 ease-out group-hover:scale-[1.02] overflow-hidden shrink-0"
              style={activeStyle}
            >
              {/* Terracotta Checkmark Badge */}
              <div
                className={`absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#A35E47] text-white shadow-sm transition-all duration-200 ease-out ${
                  active ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
              >
                <Check size={10} className="text-white" strokeWidth={3} />
              </div>
            </div>

            {/* Label below preview with 10px spacing */}
            <span
              className={`mt-2.5 text-[13px] font-medium text-center truncate whitespace-nowrap w-full transition-colors duration-200 ${labelStyleClass}`}
            >
              {bg.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}


