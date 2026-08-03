function SliderRow({ label, value, unit = 'px', min, max, step = 1, onChange, isDark }) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span
          className={`text-[13px] font-medium transition-colors ${
            isDark ? 'text-[#A1A1AA]' : 'text-[#374151]'
          }`}
        >
          {label}
        </span>
        {/* Redesigned Theme-Aware Value Badge */}
        <span
          className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[13px] font-medium tabular-nums shadow-sm transition-all duration-200 border ${
            isDark
              ? 'bg-[#1C1C1E] border-[rgba(255,255,255,0.08)] text-[#F5F5F5]'
              : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#374151]'
          }`}
        >
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ '--range-progress': `${percentage}%` }}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}

export default function AppearanceControls({
  isDark,
  padding,
  radius,
  fontSize,
  onPaddingChange,
  onRadiusChange,
  onFontSizeChange,
}) {
  const isDarkMode =
    isDark !== undefined
      ? isDark
      : typeof document !== 'undefined'
      ? !document.documentElement.classList.contains('light-mode')
      : true

  const paddingOptions = [16, 32, 64, 128]

  return (
    <div className="flex flex-col gap-6">
      {/* Padding Selector */}
      <div className="flex flex-col gap-2.5">
        <span
          className={`text-[13px] font-medium transition-colors ${
            isDarkMode ? 'text-[#A1A1AA]' : 'text-[#374151]'
          }`}
        >
          Padding
        </span>
        <div
          className={`flex w-full gap-1 p-1 rounded-xl border transition-colors ${
            isDarkMode
              ? 'bg-[#1C1C1E] border-[rgba(255,255,255,0.08)]'
              : 'bg-[#FFFFFF] border-[#E5E7EB]'
          }`}
        >
          {paddingOptions.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPaddingChange(p)}
              className={`flex-1 rounded-lg min-h-[44px] py-1.5 text-[12px] font-medium transition-all duration-200 ease-out active:scale-[0.97] border cursor-pointer ${
                padding === p
                  ? 'bg-[#A35E47] border-[#A35E47] text-[#FFFFFF] shadow-sm font-semibold'
                  : isDarkMode
                  ? 'bg-transparent border-transparent text-[#A1A1AA] hover:bg-[#242426] hover:text-[#F5F5F5]'
                  : 'bg-transparent border-transparent text-[#6B7280] hover:bg-[#F8F8F8] hover:text-[#111827]'
              }`}
            >
              {p}px
            </button>
          ))}
        </div>
      </div>

      <SliderRow
        label="Border Radius"
        value={radius}
        min={0}
        max={32}
        onChange={onRadiusChange}
        isDark={isDarkMode}
      />
      <SliderRow
        label="Font Size"
        value={fontSize}
        min={10}
        max={24}
        onChange={onFontSizeChange}
        isDark={isDarkMode}
      />
    </div>
  )
}
