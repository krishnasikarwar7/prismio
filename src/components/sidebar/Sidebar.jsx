import CollapsibleCard from './CollapsibleCard'
import LanguageSelector from '../controls/LanguageSelector'
import FontSelector from '../controls/FontSelector'
import ThemeSelector from '../controls/ThemeSelector'
import BackgroundSelector from '../controls/BackgroundSelector'
import WindowFrameSelector from '../controls/WindowFrameSelector'
import AppearanceControls from '../controls/AppearanceControls'

export default function Sidebar({
  isDark,
  language,
  onLanguageChange,
  fontId,
  onFontChange,
  ligatures,
  onLigaturesChange,
  theme,
  onThemeChange,
  background,
  onBackgroundChange,
  windowFrame,
  onWindowFrameChange,
  padding,
  onPaddingChange,
  radius,
  onRadiusChange,
  fontSize,
  onFontSizeChange,
}) {
  const isDarkMode =
    isDark !== undefined
      ? isDark
      : typeof document !== 'undefined'
      ? !document.documentElement.classList.contains('light-mode')
      : true

  return (
    <aside className="flex h-full w-full flex-col overflow-y-auto bg-base-surface pt-4 lg:pt-5 px-3 lg:px-4">
      <div className="flex flex-col gap-0 pb-12">
      <CollapsibleCard title="Language">
        <LanguageSelector value={language} onChange={onLanguageChange} isDark={isDark} />
      </CollapsibleCard>

      <CollapsibleCard title="Font">
        <div className="flex flex-col gap-3">
          <FontSelector value={fontId} onChange={onFontChange} isDark={isDark} />

          {/* Ligatures Toggle */}
          <div className="flex items-center justify-between">
            <span
              className={`text-[13px] font-medium transition-colors ${
                isDarkMode ? 'text-[#A1A1AA]' : 'text-[#374151]'
              }`}
            >
              Ligatures
            </span>
            <button
              type="button"
              onClick={() => onLigaturesChange(!ligatures)}
              className={`relative h-[22px] w-[40px] rounded-full transition-all duration-200 ease-out cursor-pointer ${
                ligatures
                  ? 'bg-[#A35E47]'
                  : isDarkMode
                  ? 'bg-[#3A3A3C]'
                  : 'bg-[#D1D5DB]'
              }`}
              aria-label="Toggle ligatures"
            >
              <span
                className={`absolute top-[2px] h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 ease-out ${
                  ligatures ? 'left-[20px]' : 'left-[2px]'
                }`}
              />
            </button>
          </div>
        </div>
      </CollapsibleCard>

      <CollapsibleCard title="Theme">
        <ThemeSelector value={theme} onChange={onThemeChange} isDark={isDark} />
      </CollapsibleCard>

      <CollapsibleCard title="Background">
        <BackgroundSelector value={background} onChange={onBackgroundChange} isDark={isDark} />
      </CollapsibleCard>

      <CollapsibleCard title="Window Frame">
        <WindowFrameSelector value={windowFrame} onChange={onWindowFrameChange} isDark={isDark} />
      </CollapsibleCard>

      <CollapsibleCard title="Appearance">
        <AppearanceControls
          isDark={isDark}
          padding={padding}
          radius={radius}
          fontSize={fontSize}
          onPaddingChange={onPaddingChange}
          onRadiusChange={onRadiusChange}
          onFontSizeChange={onFontSizeChange}
        />
      </CollapsibleCard>
      </div>
    </aside>
  )
}
