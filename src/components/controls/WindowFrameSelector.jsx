import { WINDOW_FRAMES } from '../../utils/constants'

export default function WindowFrameSelector({ value, onChange, isDark }) {
  const isDarkMode =
    isDark !== undefined
      ? isDark
      : typeof document !== 'undefined'
      ? !document.documentElement.classList.contains('light-mode')
      : true

  return (
    <div
      className={`grid grid-cols-2 gap-2 p-1.5 rounded-xl border transition-colors duration-200 ${
        isDarkMode
          ? 'bg-[#141416] border-white/[0.06]'
          : 'bg-[#FFFFFF] border-[#E5E7EB]'
      }`}
    >
      {WINDOW_FRAMES.map((frame) => {
        const active = value === frame.id
        const disabled = Boolean(frame.disabled)

        let buttonStyleClass = ''

        if (disabled) {
          buttonStyleClass = isDarkMode
            ? 'bg-[#151516] border-[rgba(255,255,255,0.04)] text-[#9CA3AF] cursor-not-allowed'
            : 'bg-[#F5F5F5] border-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
        } else if (active) {
          buttonStyleClass =
            'bg-[#A35E47] border-[#A35E47] text-[#FFFFFF] shadow-sm font-semibold'
        } else {
          buttonStyleClass = isDarkMode
            ? 'bg-[#1C1C1E] border-[rgba(255,255,255,0.06)] text-[#E5E7EB] hover:bg-[#242426] active:scale-[0.98]'
            : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#374151] hover:bg-[#F8F8F8] hover:border-[#D1D5DB] active:scale-[0.98]'
        }

        return (
          <button
            key={frame.id}
            disabled={disabled}
            onClick={() => !disabled && onChange(frame.id)}
            className={`relative flex items-center justify-center min-h-[44px] w-full rounded-lg px-3 py-2 text-[13px] font-medium text-center transition-all duration-200 ease-out border select-none ${buttonStyleClass}`}
          >
            {frame.label}
          </button>
        )
      })}
    </div>
  )
}

